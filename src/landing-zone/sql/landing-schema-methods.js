const { Schema, default: mongoose } = require("mongoose");

const createIntroInfoSchema = new Schema({
    key: {
        type: Number,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

const createTestiInfoSchema = new Schema({
    key: {
        type: Number,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    headline: {
        type: String
    },
    feedback: {
        type: String,
        required: true
    },
    userProfile: String
},
    { timestamps: true }
)

const createBlogInfoSchema = new Schema({
    key: {
        type: Number,
        required: true,
        unique: true
    },
    headline: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: String
},
    { timestamps: true }
)

const IntroInfoModel = mongoose.models['INTRODTLS'] || mongoose.model('INTRODTLS', createIntroInfoSchema);
const TestiInfoModel = mongoose.models['TESTIDTLS'] || mongoose.model('TESTIDTLS', createTestiInfoSchema);
const BlogInfoModel = mongoose.models['BLOGDTLS'] || mongoose.model('BLOGDTLS', createBlogInfoSchema);

module.exports = {
    IntroInfoModel,
    TestiInfoModel,
    BlogInfoModel
}