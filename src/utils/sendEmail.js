import nodemailer from 'nodemailer'
import transporter from './transportMailer.js'
import config from '../config/Config.js'

const sendEMail = async (recipient, password) => {

    try {
        
        const info = await transporter.sendMail({

            from: `Suporte Stock API <${config.email.address}>`,
            to: `${recipient}`,
            subject: 'CREDENCIAIS DE ACESSO A PLATAFORMA',
            text: `Seu email de acesso é ${recipient} e sua senha é ${password}. Recomendamos que altere sua senha após o primeiro login.`,
            html: `<p><strong>Seu email de acesso é ${recipient} e sua senha é ${password}.</strong></p><p>Recomendamos que altere sua senha após o primeiro login.</p>`

        })

        return info.messageId

    } catch (error) {
        
        console.error(error)

        return false

    }

}

export default sendEMail
