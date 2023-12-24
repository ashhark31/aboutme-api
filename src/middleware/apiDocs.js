const express = require("express")
const swaggerUI = require("swagger-ui-express")
const swaggerDocument = require("../config/swagger.json")
const handleAPIDocs = express()

handleAPIDocs.use(
    "/",
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocument, {
        swaggerOptions: { displayRequestDuration: true },
    })
)

module.exports = handleAPIDocs