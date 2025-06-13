import RoleModel from '../models/RoleModel.js'
import UserModel from '../models/UserModel.js'

const RoleController = {

    createRole: async (req, res) => {

        try {
            
            const { name, companyId } = req.body

            if (!name) {

                res.status(400).json({ message: "Nome da função é um campo obrigatório" })

            }

            await RoleModel.create(name, companyId)

            res.status(201).json({ message: "Função criada com sucesso" })

        } catch (error) {
            
            res.status(500).json({ message: "Erro ao criar função" })

        }

    },
    updateRole: async (req, res) => {

        try {
            
            const roleId = req.params.id

            const { name, companyId } = req.body

            if (!name) {

                res.status(400).json({ message: "Nome da função é um campo obrigatório" })

            }

            await RoleModel.update(roleId, name, companyId)

            res.status(200).json({ message: "Função alterada com successo" })

        } catch (error) {

            res.status(500).json({ message: "Erro ao alterar função" })
            
        }

    },
    getRoleId: async (req, res) => {
        
        try {
            
            const params = req.params

            const roleId = params.id
            const companyId = params.companyId

            const role = await RoleModel.findById(roleId, companyId)

            if (role.length === 0) {

                res.status(200).json({ message: "Função não encontrada" })

            }

            res.status(200).json(role)

        } catch (error) {

            res.status(500).json({ message: "Erro ao consultar função" })
            
        }

    }


}


export default RoleController;