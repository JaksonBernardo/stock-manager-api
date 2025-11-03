import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { format } from 'date-fns'

import AdminModel from '../models/AdminModel.js';
import CompanyModel from "../models/CompanyModel.js";
import RoleModel from '../models/RoleModel.js'
import UserModel from '../models/UserModel.js'
import RolePermissionModel from '../models/RolePermissionModel.js'

import config from "../config/Config.js";
import generateRandomPassword from '../utils/generateRandomPassword.js'
import sendEMail from "../utils/sendEmail.js";

const AdminController = {

    login: async (req, res) => {

        try {
            
            const { email, password } = req.body;

            if (!email || !password) {

                return res.status(400).json({ message: "Preencha todos os campos para o login" });

            };

            // PRECISA-SE DE UMA VALIDAÇÃO DE SEGURANÇA DAS INFORMAÇÕES VINDAS DO FORMULÁRIO DE LOGIN E FORNECIDAS PELO USUÁRIO

            const adminUser = await AdminModel.findByEmail(email);

            if (adminUser.length === 0) {

                return res.status(404).json({ message: "Credenciais de acesso incorretas, verifique seu email ou senha" });

            };

            const company = await CompanyModel.findByAdminId(adminUser[0].id);

            const passwordHash = adminUser[0].password;

            const passwordIsValid = await bcrypt.compare(password, passwordHash);

            if (!passwordIsValid) {

                return res.status(404).json({ message: "Credenciais de acesso incorretas, verifique seu email ou senha" });

            };

            const jwtToken = jwt.sign({ id: adminUser[0].id, name: adminUser[0].name, role: 'admin', companyId: company[0].id }, config.jwt.secret, { expiresIn: '1d' });

            return res.status(200).json({ message: "Login realizado com sucesso", token: jwtToken });

        } catch (error) {

            console.error(error);
            return res.status(500).json({ message: "Erro ao fazer login. Tente novamente mais tarde" });
            
        }

    },
    createRole: async (req, res) => {

        try {
            
            const companyId = req.user.companyId;

            const roleName = req.body.name;

            const roleId = await RoleModel.create(roleName, companyId)

            return res.status(201).json({ message: "Função criada com sucesso!" })

        } catch (error) {

            console.error(error)

            return res.status(500).json({ message: "Erro ao criar função" })
        }

    },
    createUser: async (req, res) => {

        try {
            
            const { username, email, department, role } = req.body;
            const companyId = req.user.companyId;

            if (!email || !username || !department) {

                return res.status(400).json({ message: "Email, nome de usuário e departamento são campos obrigatórios" });

            }

            const randomPassword = generateRandomPassword();

            const randomPasswordHash = await bcrypt.hash(randomPassword, 10);

            const userId = await UserModel.create(username, email, randomPasswordHash, department, parseInt(role), companyId);

            const emailSent = await sendEMail(email, randomPassword);

            if (!emailSent) {

                return res.status(500).json({ message: "Erro de comunicação com o email o usuário" })

            }

            return res.status(201).json({ message: "Usuário cadastrado com sucesso" })

        } catch (error) {

            console.error(error)
            return res.status(500).json({ message: "Erro ao cadastrar usuário" })
            
        }

    },
    relateRolePermission: async (req, res) => {

        try {
            
            const { roleId, permissionId } = req.body

            await RolePermissionModel.create(roleId, permissionId)

            return res.status(201).json({ message: "Função e permissão relacionadas com sucesso" })

        } catch (error) {

            console.error(error)
            return res.status(500).json({ message: "Erro ao relacionar função e permissão" })
            
        }

    },
    createAdmin : async (req, res) => {

        try {
            
            const { username, email, password } = req.body;

            const requiredFields = [email, password];

            if (requiredFields.some(field => !field)) {

                return res.status(400).json({ message: "Campos obrigatórios faltando" })

            }

            const today = format(new Date(), 'yyyy-MM-dd')

            const time = new Intl.DateTimeFormat('pt-BR', {
                timeZone: 'America/Sao_Paulo',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).format()

            const passwordHash = await bcrypt.hash(password, 10);

            await AdminModel.create(username, email, passwordHash, 1, today, time);

            return res.status(201).json({ message: "Admin criado com sucesso" })

        } catch (error) {
            
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar administrador" });

        }

    }

}

export default AdminController;
