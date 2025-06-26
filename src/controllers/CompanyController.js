import CompanyModel from '../models/CompanyModel.js'
import AdminModel from '../models/AdminModel.js'

import bcrypt from 'bcryptjs'
import { format } from 'date-fns'

import generateRandomPassword from '../utils/generateRandomPassword.js'
import sendEmail from '../utils/sendEmail.js'

const CompanyController = {

    createCompany: async (req, res) => {

        try {

            const {
                name, cnpj, phone, email,
                cep, address, district,city,
                number, state, adminName, adminEmail
            } = req.body

            const requiredFields = [name, cnpj, email, adminName, adminEmail]

            if (requiredFields.some(field => !field)) {

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

            const emailSent = await sendEmail(adminEmail, randomPassword)

            if (!emailSent) {

                return res.status(500).json({ message: "Erro ao enviar e-mail para o administrador" })

            }

            const randomPasswordHash = await bcrypt.hash(randomPassword, 10)

            await AdminModel.create(adminName, adminEmail, randomPasswordHash, 1, today, time, companyId)

            return res.status(201).json({ message: "Empresa cadastrada com sucesso" })

        } catch (error) {

            console.error(error)
            return res.status(500).json({ message: "Erro ao cadastrar empresa" });

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

            return res.status(200).json({ message: "Informações salvas com sucesso" })

        } catch (error) {
            
            return res.status(500).json({ message: "Erro ao salvar informações" })

        }

    },
    deleteCompany: async (req, res) => {

        try {
            
            const companyId = req.params.id

            await CompanyModel.delete(companyId)

            return res.status(200).json({ message: "Empresa deletada com sucesso" })

        } catch (error) {

            return res.status(500).json({ message: "Erro ao deletar empresa" })
            
        }

    },
    getAllCompanys: async (req, res) => {

        try {
            
            const companys = await CompanyModel.findAll()

            return res.status(200).json(companys)

        } catch (error) {

            return res.status(500).json({ message: "Erro ao consultar empresas" })
            
        }

    },
    getCompanyById: async (req, res) => {

        try {
            
            const id = req.params.id

            const company = await CompanyModel.findById(id)

            return res.status(200).json(company)

        } catch (error) {

            return res.status(500).json({ message: "Erro ao buscar informações" })
            
        }

    }

}

export default CompanyController;
