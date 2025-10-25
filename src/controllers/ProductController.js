
import CategoryModel from '../models/CategoryModel.js'
import ProductModel from '../models/ProductModel.js';


const ProductController = {

    createCategory: async (req, res) => {

        try {

            const categoryName = req.body.categoryName;
            const companyId = req.user.companyId;

            const categoryId = await CategoryModel.create(categoryName, companyId);

            return res.status(201).json({ message: "Categoria criada com sucesso" });

        } catch (error) {

            console.error(error);
            return res.status(500).json({ message: "Erro ao criar categoria" });

        }

    },
    updateCategory: async (req, res) => {

        try {

            const categoryId = req.params.id;
            const categoryName = req.body.categoryName;
            const companyId = req.user.companyId;

            await CategoryModel.update(categoryId, categoryName, companyId);

            return res.status(200).json({ message: "Categoria atualizada com sucesso" })

        } catch (error) {

            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar categoria" });

        }

    },
    findAllCategorys: async (req, res) => {

        try {

            const companyId = req.user.companyId;

            const listCategorys = await CategoryModel.findAll(companyId);

            return res.status(200).json(listCategorys);

        } catch (error) {

            console.error(error);
            return res.status(500).json({ message: "Erro ao listar categorias" });

        }

    },
    findCategoryById: async (req, res) => {

        try {

            const companyId = req.user.companyId;
            const categoryId = req.params.id;

            const category = await CategoryModel.findById(categoryId, companyId);

            if (category.length === 0) {

                return res.status(404).json({ message: 'Categoria não encontrada' })

            }

            return res.status(200).json(category[0])

        } catch (error) {

            console.log(error)
            return res.status(500).json({ message: 'Erro ao consultar categoria' })

        }

    },
    deleteCategory: async (req, res) => {

        try {

            const categoryId = req.params.id;
            const companyId = req.user.companyId;

            await CategoryModel.delete(categoryId, companyId);

            return res.status(200).json({ message: "Categoria deletada com sucesso" })

        } catch (error) {

            console.error(error);
            return res.status(500).json({ message: "Erro ao deletar categoria" });

        }

    },
    createProduct: async (req, res) => {

        try {

            const { nameProduct, description, price, stock, 
                    supplier, validity, category } = req.body;
            const companyId = req.user.companyId;

            const requiredFields = [nameProduct, price, stock, supplier, category];

            if (requiredFields.some(field => field === undefined || field === null || field === "")) {
                return res.status(400).json({ message: "Campos obrigatórios faltando" });
            }

            if (typeof nameProduct !== "string") {
                return res.status(400).json({ message: "O campo nome do produto deve ser uma string" });
            }

            if (typeof price !== "number" || isNaN(price) || price <= 0) {
                return res.status(400).json({ message: "O campo preço deve ser um número válido e maior que 0" });
            }

            if (typeof stock !== "number" || !Number.isInteger(stock) || stock < 0) {
                return res.status(400).json({ message: "O campo estoque deve ser um número inteiro e maior ou igual a 0" });
            }

            if (typeof supplier !== "number" || supplier <= 0) {
                return res.status(400).json({ message: "O campo fornecedor deve ser um id válido" });
            }

            if (typeof category !== "number" || category <= 0) {
                return res.status(400).json({ message: "O campo categoria deve ser um id válido" });
            }

            if (validity && typeof validity !== "string") {
                return res.status(400).json({ message: "A validade deve ser uma data" });
            }

            const idNewProduct = await ProductModel.create(
                nameProduct,
                description,
                price,
                stock,
                supplier,
                validity,
                category,
                companyId
            );

            return res.status(201).json({ message: 'Produto criado com sucesso' });

        } catch (error) {

            console.error(error);
            return res.status(500).json({ message: 'Erro ao criar produto' });

        }

    },
    updateProduct: async (req, res) => {

        try {

            const { nameProduct, description, price, stock,
                supplier, validity, category } = req.body;

            const productId = req.params.id;
            const companyId = req.user.companyId;

            const requiredFields = [nameProduct, price, stock, supplier, category]

            if (requiredFields.some(field => !field)) {

                return res.status(400).json({ message: "Campos obrigatórios faltando" })

            }

            const idNewProduct = await ProductModel.update(productId, nameProduct, description, price, stock, supplier, validity, category, companyId);

            return res.status(200).json({ message: 'Produto atualizado com sucesso' });

        } catch (error) {

            console.error(error);
            return res.status(500).json({ message: 'Erro ao criar produto' });

        }

    }

}

export default ProductController;
