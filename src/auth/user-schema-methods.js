const { Schema, default: mongoose } = require("mongoose");

const createRegistrationAuthSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
        default: null
    }
},
    { timestamps: true }
)

const RegistrationAuthModel = mongoose.models['REGISAUTHDTLS'] || mongoose.model('REGISAUTHDTLS', createRegistrationAuthSchema);
module.exports = {
    RegistrationAuthModel
}