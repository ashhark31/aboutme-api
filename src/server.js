const DBInit = require("./database/connectionPool")
const app = require("./app")
const {logger} = require("./config/logger")
const { PORT = 3100 } = process.env

app.listen(PORT, () => {
    DBInit()
    logger.info({
        message: `Server is running ${PORT}...`
    });
})
 
