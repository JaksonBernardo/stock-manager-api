import RoleModel from '../models/RoleModel.js'
import UserModel from '../models/UserModel.js'

const RoleController = {

    createRole: async (req, res) => {

        try {
            
            const { name, companyId } = req.body

            if (!name) {

                return res.status(400).json({ message: "Nome da função é um campo obrigatório" })

            }

            await RoleModel.create(name, companyId)

            return res.status(201).json({ message: "Função criada com sucesso" })

        } catch (error) {
            
            return res.status(500).json({ message: "Erro ao criar função" })

        }

    },
    updateRole: async (req, res) => {

        try {
            
            const roleId = req.params.id

            const { name, companyId } = req.body

            if (!name) {

                return res.status(400).json({ message: "Nome da função é um campo obrigatório" })

            }

            await RoleModel.update(roleId, name, companyId)

            return res.status(200).json({ message: "Função alterada com successo" })

        } catch (error) {

            return res.status(500).json({ message: "Erro ao alterar função" })
            
        }

    },
    getRoleId: async (req, res) => {
        
        try {
            
            const params = req.params

            const roleId = params.id
            const companyId = params.companyId

            const role = await RoleModel.findById(roleId, companyId)

            if (role.length === 0) {

                return res.status(200).json({ message: "Função não encontrada" })

            }

            return res.status(200).json(role)

        } catch (error) {

            return res.status(500).json({ message: "Erro ao consultar função" })
            
        }

    },
    findUserByRole: async (req, res) => {

        // ESTE CONTROLLER VAI COLETAR OS FUNCIONÁRIOS QUE ESTÃO RELACIONADOS A UMA FUNÇÃO

    },
    deleteRole: async (req, res) => {

        try {
            
            const params = req.params

            const roleId = params.id
            const companyId = params.companyId

            await RoleModel.delete(roleId, companyId)

            return res.status(200).json({ message: "Função deletada com sucesso" })

        } catch (error) {
            
            console.error(error)
            return res.status(500).json({ message: "Erro ao deletar função" })

        }

    }

}


export default RoleController;