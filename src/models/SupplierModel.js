import { create } from 'domain'
import db from '../db/Connection.js'

const SupplierModel = {

    create: async (parameters) => {

        /**
        * Insere um novo fornecedor
        * @param {Array} parameters - Uma lista com os parêmetros na ordem (name, cnpj, email, phone, whatsapp, cep, address, number, city, state, company_id) 
        */

        let query = "INSERT INTO suppliers (name, cnpj, email, phone, whatsapp, cep, address, number, city, state, company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

        const [result] = await db.execute(query, parameters)

        return result.insertId

    },
    update: async (parameters) => {

        /**
        * Edita um fornecedor existente
        * @param {Array} parameters - Uma lista com os parêmetros na ordem (name, cnpj, email, phone, whatsapp, cep, address, number, city, state, company_id) 
        */

        let query = "UPDATE suppliers SET name = ?, cnpj = ?, email = ?, phone = ?, whatsapp = ?, cep = ?, address = ?, number = ?, city = ?, state = ? WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, parameters)

        return result.affectedRows

    },
    delete: async (supplierId, companyId) => {

        let query = "DELETE FROM suppliers WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, [supplierId, companyId])

        return result.affectedRows

    },
    findAll: async (companyId) => {

        let query = "SELECT * FROM suppliers WHERE company_id = ?"

        const [rows] = await db.execute(query, [companyId])

        return rows

    },
    findById: async (companyId, supplierId) => {

        let query = "SELECT * FROM suppliers WHERE company_id = ? AND id = ?"

        const [rows] = await db.execute(query, [companyId, supplierId])

        return rows

    },
    findByName: async (companyId, name) => {

        let query = "SELECT * FROM suppliers WHERE name LIKE ? AND company_id = ?"

        const [rows] = await db.execute(query, [`%${name}%`, companyId])

        return rows

    }

}

export default SupplierModel;