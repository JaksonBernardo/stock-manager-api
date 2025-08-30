
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

            const requiredFields = [nameProduct, price, stock, supplier, category]

            if (requiredFields.some(field => !field)) {

                return res.status(400).json({ message: "Campos obrigatórios faltando" })

            }

            const idNewProduct = await ProductModel.create(nameProduct, description, price, stock, supplier, validity, category, companyId);

            return res.status(201).json({ message: 'Produto criado com sucesso' });


        } catch (error) {

            console.error(error);
            return res.status(500).json({ message: 'Erro ao criar produto' });
            
        }

    }

}

export default ProductController;
