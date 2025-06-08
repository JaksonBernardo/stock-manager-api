import config from './src/config/Config.js'
import app from './src/app.js'

const PORT = config.server.port

app.listen(PORT, () => {

    console.log(`🚀 Servidor rodando em http://${config.db.host}:${PORT}`)

})
