const mongoose = require('mongoose')


const workModelSchema = new mongoose.Schema({
    userId:{type: String, required: true, index: true},
    company:{type: String, required: true},
    role:{type:String, required: true},
    startDate:{type: Date, required: true},
    endDate:{type: Date},
    isCurrent:{type: Boolean, default: false},
    location: { type: String },
    technologies: [String],
    description: String,
},{timestamps: true})

module.exports = mongoose.model('Work', workModelSchema)
    