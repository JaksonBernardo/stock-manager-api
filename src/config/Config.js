import dotenv from 'dotenv';
dotenv.config();

const config = {
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT, 10),
        connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10),
    },
    server: {
        port: parseInt(process.env.SERVER_PORT, 10),
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    }
};

export default config;