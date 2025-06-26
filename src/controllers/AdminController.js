import bcrypt from "bcryptjs";

import AdminModel from '../models/AdminModel.js'

const AdminController = {

    login: async (req, res) => {

        try {
            
            const { email, password } = req.body

            if (!email || !password) {

                return res.status(400).json({ message: "Preencha todos os campos para o login" })

            }

            // PRECISA-SE DE UMA VALIDAÇÃO DE SEGURANÇA DAS INFORMAÇÕES VINDAS DO FORMULÁRIO DE LOGIN E FORNECIDAS PELO USUÁRIO

            const adminUser = await AdminModel.findByEmail(email)

            if (adminUser.length === 0) {

                return res.status(404).json({ message: "Credenciais de acesso incorretas, verifique seu email ou senha" })

            }

            const passwordHash = adminUser[0].password

            const passwordIsValid = await bcrypt.compare(password, passwordHash)

            if (!passwordIsValid) {

                return res.status(404).json({ message: "Credenciais de acesso incorretas, verifique seu email ou senha" })

            }

            return res.status(200).json({ message: "Login realizado com sucesso" });

        } catch (error) {

            console.error(error)
            return res.status(500).json({ message: "Erro ao fazer login. Tente novamente mais tarde" })
            
        }

    }

}

export default AdminController;
