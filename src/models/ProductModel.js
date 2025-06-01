import db from '../db/Connection'

const ProductModel = {

    create: async (name, description, price, stock, supplier, validity, category, companyId) => {

        let query = "INSERT INTO products (name, description, price, stock, supplier, validity, category, company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

        const [result] = await db.execute(query, [name, description, price, stock, supplier, validity, category, companyId])

        return

    },
    update: async (productId, name, description, price, stock, supplier, validity, category, companyId) => {

        let query = "UPDATE products SET name = ?, description = ?, price = ?, stock = ?, supplier = ?, validity = ?, category = ? WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, [name, description, price, stock, supplier, validity, category, productId, companyId])

        return

    },
    delete: async (productId, companyId) => {

        let query = "DELETE FROM products WHERE id = ? AND company_id = ?"

        const [result] = await db.execute(query, [productId, companyId])

        return

    },
    findAll: async (companyId) => {

        let query = "SELECT * FROM products WHERE company_id = ?"

        const [rows] = await db.execute(query, [companyId])

        return rows[0]

    },
    findById: async (companyId, productId) => {

        let query = "SELECT * FROM products WHERE id = ? AND company_id = ?"

        const [rows] = await db.execute(query, [productId, companyId])

        return rows[0]

    }


}

export default ProductModel;