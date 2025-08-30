import db from '../db/Connection.js'

const ProductModel = {

    create: async (name, description, price, stock, supplier, validity, category, companyId) => {

        let query = "INSERT INTO products (name, description, price, stock, supplier, validity, category, company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

        const [result] = await db.execute(query, [name, description, price, stock, supplier, validity, category, companyId])

        return result.insertId

    },
    update: async (productId, name, description, price, stock, supplier, validity, category, companyId) => {

        let query = "UPDATE products SET name = ?, description = ?, price = ?, stock = ?, supplier = ?, validity = ?, category = ? WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, [name, description, price, stock, supplier, validity, category, productId, companyId])

        return result.affectedRows

    },
    delete: async (productId, companyId) => {

        let query = "DELETE FROM products WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, [productId, companyId])

        return result.affectedRows

    },
    findAll: async (companyId) => {

        let query = "SELECT * FROM products WHERE company_id = ?"

        const [rows] = await db.execute(query, [companyId])

        return rows

    },
    findById: async (companyId, productId) => {

        let query = "SELECT * FROM products WHERE id = ? AND company_id = ?"

        const [rows] = await db.execute(query, [productId, companyId])

        return rows

    },
    findBySupplier: async (companyId, supplierId) => {

        let query = "SELECT * FROM products WHERE supplier = ? AND company_id = ?"

        const [rows] = await db.execute(query, [supplierId, companyId])

        return rows

    }

}

export default ProductModel;