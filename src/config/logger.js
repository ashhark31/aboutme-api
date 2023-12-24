const dotenv = require("dotenv")
const { createLogger, format, transports } = require("winston")

dotenv.config();
const logger = createLogger({
    format: format.combine(
        format.label({ label: "test" }),
        format.timestamp({ format: "YYYY-M-DD HH:mm:aa:SSS" }),
        format.colorize(),
        format.printf((info) => {
            const { timestamp, level, label, message = "", ...args } = info
            return `[${timestamp}] ${level} [${label}] ${ message ? ": " + message : "" } ${Object.keys(args).length ? " : " + JSON.stringify(args) : ""}`
        })
    )
})

module.exports = {logger}

