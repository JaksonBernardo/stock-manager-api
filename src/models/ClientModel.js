import db from '../db/Connection.js'

const ClientModel = {

    create: async (name, cnpj, email, phone, address, city, state, companyId) => {

        let query = "INSERT INTO clients (name, cnpj, email, phone, address, city, state, company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

        const [result] = await db.execute(query, [name, cnpj, email, phone, address, city, state, companyId])

        return result.insertId

    },
    update: async (supplierId, name, cnpj, email, phone, address, city, state, companyId) => {

        let query = "UPDATE clients SET name = ?, cnpj = ?, email = ?, phone = ?, address = ?, city = ?, state = ? WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, [name, cnpj, email, phone, address, city, state, supplierId, companyId])

        return result.affectedRows

    },
    delete: async (supplierId, companyId) => {

        let query = "DELETE FROM clients WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, [supplierId, companyId])

        return result.affectedRows

    },
    findAll: async (companyId) => {

        let query = "SELECT * FROM clients WHERE company_id = ?"

        const [rows] = await db.execute(query, [companyId])

        return rows

    },
    findById: async (companyId, supplierId) => {

        let query = "SELECT * FROM clients WHERE company_id = ? AND id = ?"

        const [rows] = await db.execute(query, [companyId, supplierId])

        return rows
 
    },
    findByName: async (companyId, name) => {

        let query = "SELECT * FROM clients WHERE name LIKE ? AND company_id = ?"

        const [rows] = await db.execute(query, [`%${name}%`, companyId])

        return rows

    }

}

export default ClientModel;