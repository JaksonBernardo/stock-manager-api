import mysql from 'mysql2/promise';
import config from '../config/Config.js'

const db = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    port: config.db.port,
    connectionLimit: config.db.connectionLimit
})

export default db;