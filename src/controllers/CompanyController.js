import CompanyModel from '../models/CompanyModel.js'
import AdminModel from '../models/AdminModel.js'

import bcrypt from 'bcryptjs'
import { format } from 'date-fns'

import generateRandomPassword from '../utils/generateRandomPassword.js'

const CompanyController = {

    createCompany: async (req, res) => {

        try {

            const {
                name,
                cnpj,
                phone,
                email,
                cep,
                address,
                district,
                city,
                number,
                state,
                adminName,
                adminEmail
            } = req.body

            if (!name || !cnpj || !email || !adminName || !adminEmail) {

                return res.status(400).json({ message: "Campos obrigatórios faltando" })

            }

            const companyId = await CompanyModel.create(name, cnpj, phone, email, cep, address, district, city, number, state)

            const randomPassword = generateRandomPassword()

            const today = format(new Date(), 'yyyy-MM-dd')

            const time = new Intl.DateTimeFormat('pt-BR', {
                timeZone: 'America/Sao_Paulo',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).format()

            const randomPasswordHash = await bcrypt.hash(randomPassword, 10)

            await AdminModel.create(adminName, adminEmail, randomPasswordHash, 1, today, time, companyId)

            res.status(201).json({ message: "Empresa cadastrada com sucesso" })

        } catch (error) {

            res.status(500).json({ message: `Erro ao cadastrar empresa: ${error}` });

        }

    },
    updateCompany: async (req, res) => {

        try {
            
            const id = req.params.id

            const {
                name,
                cnpj,
                phone,
                email,
                cep,
                address,
                district,
                city,
                number,
                state
            } = req.body

            if (!name || !cnpj || !email) {
                return res.status(400).json({ message: "Campos obrigatórios faltando" })
            }

            const companyId = await CompanyModel.update(id, name, cnpj, phone, email, cep, address, district, city, number, state)

            res.status(200).json({ message: "Informações salvas com sucesso" })

        } catch (error) {
            
            res.status(500).json({ message: "Erro ao salvar informações" })

        }

    },
    deleteCompany: async (req, res) => {

        try {
            
            const companyId = req.params.id

            await CompanyModel.delete(companyId)

            res.status(200).json({ message: "Empresa deletada com sucesso" })

        } catch (error) {

            res.status(500).json({ message: "Erro ao deletar empresa" })
            
        }

    },
    getAllCompanys: async (req, res) => {

        try {
            
            const companys = await CompanyModel.findAll()

            res.status(200).json(companys)

        } catch (error) {

            res.status(500).json({ message: "Erro ao consultar empresas" })
            
        }

    },
    getCompanyId: async (req, res) => {

        try {
            
            const id = req.params.id

            const company = await CompanyModel.findById(id)

            res.status(200).json(company)

        } catch (error) {

            res.status(500).json({ message: "Erro ao buscar informações" })
            
        }

    }

}

export default CompanyController;
