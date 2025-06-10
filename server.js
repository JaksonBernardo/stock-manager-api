import config from './src/config/Config.js'
import app from './src/app.js'

const PORT = config.server.port
const HOST = config.db.host

app.listen(PORT, () => {

    console.log(`Servidor rodando em http://${HOST}:${PORT}`)

})
