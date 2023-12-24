const path = require("path")

module.exports = class ENVPropertyValues {
    static propertiesReader = require("properties-reader")
    static properties = ENVPropertyValues.propertiesReader(path.normalize(__dirname + "../../../.env"))
}