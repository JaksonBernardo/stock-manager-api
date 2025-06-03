import db from '../db/Connection'

const RoleModel = {

    create: async (name, companyId) => {

        let query = "INSERT INTO roles (name, company_id) VALUES (?, ?)"

        const [result] = await db.execute(query, [name, companyId])

        return

    },
    update: async (roleId, name, companyId) => {

        let query = "UPDATE roles SET name = ? WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, [name, roleId, companyId])

        return

    },
    delete: async (roleId, companyId) => {

        let query = "DELETE FROM roles WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, [roleId, companyId])

        return

    },
    findAll: async (companyId) => {

        let query = "SELECT * FROM roles WHERE company_id = ?"

        const [rows] = await db.execute(query, [companyId])

        return rows[0]

    },
    findById: async (roleId, companyId) => {

        let query = "SELECT * FROM roles WHERE id = ? AND company_id = ?"

        const [rows] = await db.execute(query, [roleId, companyId])

        return rows[0]

    }

}

export default RoleModel;
