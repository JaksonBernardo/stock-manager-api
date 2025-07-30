import SupplierModel from '../models/SupplierModel.js'


const SupplierController = {

    create: async (req, res) => {

        try {
            
            const companyId = req.user.companyId;

            const { 
                name, cnpj, email, phone,
                address, city, state
            } = req.body;

            const requiredFields = [name, cnpj]

            if (requiredFields.some(field => !field)) {

                return res.status(400).json({ message: 'Razão social e CNPJ são obrigatórios' })

            }

            const newSupplierId = await SupplierModel.create(name, cnpj, email, phone, address, city, state, companyId);

            return res.status(201).json({ message: 'Fornecedor criado com sucesso' })

        } catch (error) {

            console.error(error)
            return res.status(500).json({ message: 'Erro ao criar fornecedor' })
            
        }

    },
    update: async (req, res) => {

        try {
            
            const companyId = req.user.companyId;
            const supplierId = req.params.id;

            const { 
                name, cnpj, email, phone,
                address, city, state
            } = req.body;

            const requiredFields = [name, cnpj];

            if (requiredFields.some(field => !field)) {

                return res.status(400).json({ message: 'Razão social e CNPJ são obrigatórios' });

            }

            const rows = await SupplierModel.findById(companyId, supplierId);

            if (rows.length === 0) {

                return res.status(404).json({ message: 'Fornecedor não encontrado' });

            }

            const newSupplier = await SupplierModel.update(supplierId, name, cnpj, email, phone, address, city, state, companyId);

            return res.status(200).json({ message: 'Fornecedor atualizado com sucesso' })

        } catch (error) {

            console.error(error)
            return res.status(500).json({ message: 'Erro ao atualizar informações' })
            
        }

    }

}

export default SupplierController;
