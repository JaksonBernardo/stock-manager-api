import CompanyModel from '../models/CompanyModel.js'
import jwt from 'jsonwebtoken'

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
                state
            } = req.body

            if (!name || !cnpj || !email) {
                return res.status(400).json({ message: "Campos obrigatórios faltando" })
            }

            const companyId = await CompanyModel.create(name, cnpj, phone, email, cep, address, district, city, number, state)

            res.status(201).json({ message: "Empresa cadastrada com sucesso !" })

        } catch (error) {

            res.status(500).json({ message: "Erro ao cadastrar empresa" })

        }

    }

}

export default CompanyController;
