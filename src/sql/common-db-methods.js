const { default: mongoose, Schema } = require("mongoose");

const createBaseInfoSchema = new Schema({
    key: {
        type: Number,
        required: true,
        unique: true
    },
    headlineInfoCtrl: {
        type: String,
        required: true
    },
    userFirstName: {
        type: String,
        required: true
    },
    userLastName: {
        type: String,
        required: true
    },
    userDOBCtrl: Date,
    addressCityInfo: String,
    addressStateInfo: String,
    addressCountryInfo: String,
    userEmailInfo: {
        type: String,
        required: true
    },
    linkedinInfoCtrl: {
        type: String,
        required: true
    },
    twitterInfoCtrl: String,
    baseProfileCtrl: String
},
    { timestamps: true }
)

const createExpInfoSchema = new Schema({
    key: {
        type: Number,
        required: true,
        unique: true
    },
    companyName: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    currentlyWorking: {
        type: Boolean,
        required: true
    },
    description: {
        type: String
    }
},
    { timestamps: true }
)

const createProjectInfoSchema = new Schema({
    key: {
        type: Number,
        required: true,
        unique: true
    },
    projectTitle: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    techUsed: {
        type: Object
    },
    description: {
        type: String
    }
},
    { timestamps: true }
)

    const skillType = new Schema({
        name: {
            type: String,
            required: true
        },
        keywords: {
            type: Object,
            required: true
        }
    })

const createSkillInfoSchema = new Schema({
    key: {
        type: Number,
        required: true,
        unique: true
    },
    technical: [skillType],
    behaivioral: [skillType]
},
    { timestamps: true }
)

const createAchvmntInfoSchama = new Schema({
    key: {
        type: Number,
        required: true,
        unique: true
    },
    achvmntTitle: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    description: {
        type: String
    }
},
    { timestamps: true }
)

const createCrtificationInfoSchema = new Schema({
    key: {
        type: Number,
        required: true,
        unique: true
    },
    certName: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    description: {
        type: String
    }
},
    { timestamps: true }
)

const createKeyInfoSchema = new Schema({
    key: {
        type: Number,
        required: true,
        unique: true
    },
    baseInfoCtrlKey: {
        type: Number,
        required: true
    },
    empId: {
        type: Object,
        required: true
    },
    projectId: {
        type: Object,
        required: true
    },
    skillId: {
        type: Number,
        required: true
    },
    achvmntId: {
        type: Object,
        required: true
    },
    certId: {
        type: Object,
        required: true
    }
},
    { timestamps: true }
)

const BaseInfoModel = mongoose.models['PERSDTLS'] || mongoose.model('PERSDTLS', createBaseInfoSchema);
const ExpInfoModel = mongoose.models['EXPDTLS'] || mongoose.model('EXPDTLS', createExpInfoSchema);
const ProjectInfoModel = mongoose.models['PROJDTLS'] || mongoose.model('PROJDTLS', createProjectInfoSchema);
const SkillInfoModel = mongoose.models['SKLLDTLS'] || mongoose.model('SKLLDTLS', createSkillInfoSchema);
const AchvmntInfoModel = mongoose.models['ACHVMNTDTLS'] || mongoose.model('ACHVMNTDTLS', createAchvmntInfoSchama);
const CrtificationInfoModel = mongoose.models['CRTDTLS'] || mongoose.model('CRTDTLS', createCrtificationInfoSchema);
const KeyInfoModel = mongoose.models['KEYDTLS'] || mongoose.model('KEYDTLS', createKeyInfoSchema);

module.exports = {
    BaseInfoModel,
    ExpInfoModel,
    ProjectInfoModel,
    SkillInfoModel,
    AchvmntInfoModel,
    CrtificationInfoModel,
    KeyInfoModel
}