import db from '../db/Connection.js'

const AdminModel = {

    create: async (name, email, password, firstLogin, createdDate, createdTime, companyId) => {

        let query = "INSERT INTO admins (name, email, password, first_login, created_date, created_time, company_id) VALUES (?, ?, ?, ?, ?, ?, ?)"

        const [result] = await db.execute(query, [name, email, password, firstLogin, createdDate, createdTime, companyId])

        return result.insertId

    },
    update: async (adminId, name, email, newPassword, companyId) => {

        let query = "UPDATE admins SET name = ?, email = ?, password = ? WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, [name, email, newPassword, adminId, companyId])

        return result.affectedRows

    },
    updatePassword: async (adminId, newPassword, companyId) => {

        let query = "UPDATE admins SET password = ? WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, [newPassword, adminId, companyId])

        return result.affectedRows

    },
    updateFirstLogin: async (adminId, companyId) => {

        let query = "UPDATE admins SET first_login = 0 WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, [adminId, companyId])

        return result.affectedRows

    },
    delete: async (adminId, companyId) => {

        let query = "DELETE FROM admins WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, [adminId, companyId])

        return result.affectedRows

    },
    findAll: async () => {

        let query = "SELECT * FROM admins"

        const [rows] = await db.execute(query)

        return rows

    },
    findById: async (adminId) => {

        let query = "SELECT * FROM admins WHERE id = ?"

        const [rows] = await db.execute(query, [adminId])

        return rows

    }

}

export default AdminModel;