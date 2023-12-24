const mongoose = require("mongoose")
const dotenv = require('dotenv')
const ENVPropertyValues = require('../utils/envProperties')
const { logger } = require('../config/logger')

dotenv.config()

const DBInit = async () => {
    try{
        const user = ENVPropertyValues.properties.get("NODE_MONGODB_USER");
        const password = ENVPropertyValues.properties.get("NODE_MONGODB_PASSWORD");
        const connectionString = ENVPropertyValues.properties.get("NODE_MONGODB_CONNECTIONSTRING");
        await mongoose.connect(`mongodb+srv://${user}:${password}@${connectionString}`)
        .then((pool) => {
            logger.info({
                message: 'Database pool created.'
            })
        }).catch((err) => {
            logger.info({
                message: `Database Pool Creation Failed: Bad Config: `,
                extra: err.stack
            })
        })

    } catch (err){
        logger.info({
            message: `Database Pool Exception`,
            extra: err.stack
        })
    }
}

module.exports = DBInit