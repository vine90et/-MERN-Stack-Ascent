const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20,
        trim: true
    },
    description: [String],
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{ timestamps: true }
)

module.exports = mongoose.model("Team", TeamSchema)