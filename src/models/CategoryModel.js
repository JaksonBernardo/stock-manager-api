import db from '../db/Connection'

const CategoryModel = {

    create: async (name, companyId) => {

        let query = "INSERT INTO categorys (name, company_id) VALUES (?, ?)"

        const [result] = await db.execute(query, [name, companyId])

        return result.insertId

    },
    update: async (idCategory, name, companyId) => {

        let query = "UPDATE categorys SET name = ? WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, [name, idCategory, companyId])

        return result.affectedRows

    },
    delete: async (idCategory, companyId) => {

        let query = "DELETE FROM categorys WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, [idCategory, companyId])

        return result.affectedRows

    },
    findAll: async (companyId) => {

        let query = "SELECT * FROM categorys WHERE company_id = ?"

        const [rows] = await db.execute(query, [companyId])

        return rows

    },
    findById: async (idCategory, companyId) => {

        let query = "SELECT * FROM categorys WHERE id = ? AND company_id = ?"

        const [rows] = await db.execute(query, [idCategory, companyId])

        return rows[0]

    },
    findByName: async(companyId, name) => {

        let query = "SELECT * FROM categorys WHERE name LIKE ? AND company_id = ?"

        const [rows] = await db.execute(query, [`%${name}%`, companyId])

        return rows

    }

}

export default CategoryModel;