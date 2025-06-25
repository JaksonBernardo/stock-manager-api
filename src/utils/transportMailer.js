import nodemailer from 'nodemailer'
import config from '../config/Config.js'

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',       
    port: 465,                     
    secure: true,                  
    auth: {
        user: config.email.address, 
        pass: config.email.password,             
    },
    tls: {
        rejectUnauthorized: false,
    }
});

export default transporter
