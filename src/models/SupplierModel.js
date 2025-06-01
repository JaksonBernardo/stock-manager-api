import db from '../db/Connection'

const SupplierModel = {

    create: async (name, cnpj, email, phone, address, city, state, companyId) => {

        let query = "INSERT INTO suppliers (name, cnpj, email, phone, address, city, state, company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

        const [result] = await db.execute(query, [name, cnpj, email, phone, address, city, state, companyId])

        return

    },
    update: async (supplierId, name, cnpj, email, phone, address, city, state, companyId) => {

        let query = "UPDATE suppliers SET name = ?, cnpj = ?, email = ?, phone = ?, address = ?, city = ?, state = ? WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, [name, cnpj, email, phone, address, city, state, supplierId, companyId])

        return

    },
    delete: async (supplierId, companyId) => {

        let query = "DELETE FROM suppliers WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, [supplierId, companyId])

        return

    },
    findAll: async (companyId) => {

        let query = "SELECT * FROM suppliers WHERE company_id = ?"

        const [rows] = await db.execute(query, [companyId])

        return rows[0]

    },
    findById: async (companyId, supplierId) => {

        let query = "SELECT * FROM suppliers WHERE company_id = ? AND id = ?"

        const [rows] = await db.execute(query, [companyId, supplierId])

        return rows[0]

    },
    findByName: async (companyId, name) => {

        let query = "SELECT * FROM suppliers WHERE name LIKE ? AND company_id = ?"

        const [rows] = await db.execute(query, [`%${name}%`, companyId])

        return rows[0]

    }

}