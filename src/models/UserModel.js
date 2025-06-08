import db from '../db/Connection.js'

const UserModel = {

    create: async (name, email, password, department, role, companyId) => {

        let query = "INSERT INTO users (name, email, password, department, role, company_id) VALUES (?, ?, ?, ?, ?, ?)"

        const [result] = await db.execute(query, [name, email, password, department, role, companyId])

        return result.insertId

    },
    update: async (userId, name, email, password, department, role, companyId) => {

        let query = "UPDATE users SET name = ?, email = ?, password = ?, department = ?, role = ? WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, [name, email, password, department, role, userId, companyId])

        return result.affectedRows

    },
    delete: async (userId, companyId) => {

        let query = "DELETE FROM users WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, [userId, companyId])

        return result.affectedRows

    },
    findById: async (userId, companyId) => {

        let query = "SELECT * FROM users WHERE id = ? AND company_id = ?"

        const [rows] = await db.execute(query, [userId, companyId])

        return rows[0]

    },
    findAll: async (companyId) => {

        let query = "SELECT * FROM users WHERE company_id = ?"

        const [rows] = await db.execute(query, [companyId])

        return rows

    }

}

export default UserModel;
