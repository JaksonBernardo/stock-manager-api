import db from '../db/Connection.js'

const AdminModel = {

    create: async (name, email, password, firstLogin, createdDate, createdTime) => {

        let query = "INSERT INTO admins (name, email, password, first_login, created_date, created_time) VALUES (?, ?, ?, ?, ?, ?)"

        const [result] = await db.execute(query, [name, email, password, firstLogin, createdDate, createdTime])

        return result.insertId

    },
    update: async (adminId, name, email, newPassword) => {

        let query = "UPDATE admins SET name = ?, email = ?, password = ? WHERE id = ?"

        const [result] = await db.execute(query, [name, email, newPassword, adminId])

        return result.affectedRows

    },
    updatePassword: async (adminId, newPassword) => {

        let query = "UPDATE admins SET password = ? WHERE id = ?"

        const [result] = await db.execute(query, [newPassword, adminId])

        return result.affectedRows

    },
    updateFirstLogin: async (adminId) => {

        let query = "UPDATE admins SET first_login = 0 WHERE id = ?"

        const [result] = await db.execute(query, [adminId])

        return result.affectedRows

    },
    delete: async (adminId) => {

        let query = "DELETE FROM admins WHERE id = ?"

        const [result] = await db.execute(query, [adminId])

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

    },
    findByEmail: async (adminEmail) => {

        let query = "SELECT * FROM admins WHERE email = ?"

        const [rows] = await db.execute(query, [adminEmail])

        return rows

    }

}

export default AdminModel;