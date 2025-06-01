import db from '../db/Connection'

const CategoryModel = {

    create: async (name, companyId) => {

        let query = "INSERT INTO categorys (name, company_id) VALUES (?, ?)"

        const [result] = await db.execute(query, [name, companyId])

        return

    },
    update: async (idCategory, name, companyId) => {

        let query = "UPDATE categorys SET name = ? WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, [name, idCategory, companyId])

        return

    },
    delete: async (idCategory, companyId) => {

        let query = "DELETE FROM categorys WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, [idCategory, companyId])

        return

    },
    findAll: async (companyId) => {

        let query = "SELECT * FROM categorys WHERE company_id = ?"

        const [rows] = await db.execute(query, [companyId])

        return rows[0]

    },
    findById: async (idCategory, companyId) => {

        let query = "SELECT * FROM categorys WHERE id = ? AND company_id = ?"

        const [rows] = await db.execute(query, [idCategory, companyId])

        return rows[0]

    }

}

export default CategoryModel;