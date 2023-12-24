const mongoose = require("mongoose")
const dotenv = require('dotenv')
const { logger } = require('../config/logger')

dotenv.config()

const DBInit = async () => {
    try{
        const user = "ashhark31";
        const password = "aboutmecloudenv001100";
        const connectionString = "aboutme.nguarqs.mongodb.net/?retryWrites=true&w=majority";
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