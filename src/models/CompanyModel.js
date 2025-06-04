import db from '../db/Connection';

const CompanyModel = {

    create: async (name, cnpj, phone, email, cep, address, district, city, number, state) => {

        let query = "INSERT INTO companys (name, cnpj, phone, email, cep, address, district, city, number, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

        const [result] = await db.execute(query, [name, cnpj, phone, email, cep, address, district, city, number, state])

        return result.insertId

    },
    update: async (idCompany, name, cnpj, phone, email, cep, address, district, city, number, state) => {

        let query = "UPDATE companys SET name = ?, cnpj = ?, phone = ?, email = ?, cep = ?, address = ?, district = ?, city = ?, number = ?, state = ? WHERE id = ?"

        const [result] = await db.execute(query, [name, cnpj, phone, email, cep, address, district, city, number, state, idCompany])

        return result.affectedRows

    },
    delete: async (idCompany) => {

        let query = "DELETE FROM companys WHERE id = ?"

        const [result] = await db.execute(query, [idCompany])

        return result.affectedRows

    },
    findAll: async () => {

        let query = "SELECT * FROM companys"

        const [rows] = await db.execute(query)

        return rows

    }
}

export default CompanyModel;