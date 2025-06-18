import config from '../config/Config.js'
import jwt from 'jsonwebtoken'

const verifyJwtToken = (req, res, next) => {

    try {

        const auth = req.headers.authorization

        if (!auth || !auth.startsWith('Bearer ')) {

            res.status(401).json({ message: "Token não fornecido ou mal formado" })

        }

        if (auth) {

            const token = auth.split(" ")[1];
    
            const decoded = jwt.verify(token, config.jwt.secret)
    
            req.user = decoded
    
            next()

        }

    } catch (error) {
        
        console.error(error)
        res.status(401).json({ message: "Token inválido" })

    }

}

export default verifyJwtToken