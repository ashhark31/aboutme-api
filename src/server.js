const DBInit = require("./database/connectionPool")
const app = require("./app")
const {logger} = require("./config/logger")
const { PORT = 3100 } = process.env

const propertiesReader = require("properties-reader")
const properties = propertiesReader(__dirname + "\\..\\.env")
// const properties = propertiesReader("/app/.env")
Object.assign(process.env, properties.getAllProperties())

app.listen(PORT, () => {
    DBInit()
    logger.info({
        message: `Server is running http://localhost:${PORT}...`
    });
})
 
