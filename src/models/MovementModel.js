import db from '../db/Connection.js'

const MovementModel = {

    create: async (date, hour, product, quantity, responsible, type, description, companyId) => {

        let query = "INSERT INTO movements (date, hour, product, quantity, responsible, type, description, company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

        const [result] = await db.execute(query, [date, hour, product, quantity, responsible, type, description, companyId])

        return result.insertId

    },
    update: async (movementId, date, hour, product, quantity, responsible, type, description, companyId) => {

        let query = "UPDATE movements SET date = ?, hour = ?, product = ?, quantity = ?, responsible = ?, type = ?, description = ? WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, [date, hour, product, quantity, responsible, type, description, movementId, companyId])

        return result.affectedRows

    },
    delete: async (movementId, companyId) => {

        let query = "DELETE FROM movements WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, [movementId, companyId])

        return result.affectedRows

    },
    findAll: async (companyId) => {

        let query = "SELECT * FROM movements WHERE company_id = ?"

        const [rows] = await db.execute(query, [companyId])

        return rows

    },
    

}

export default MovementModel;
