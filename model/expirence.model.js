const mongoose = require('mongoose')

const experienceSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    company:{
        type: String,
        required: true,
        trim: true,
    },
    position:{
        type: String,
        required: true,
        trim: true,
    },
    startDate:{
        type: Date,
        required: true,
    },
    endDate: Date,
    current: { 
        type: Boolean, 
        default: false 
    }, 
    description: String, 
    technologies: [{ 
        type: String, trim: true 
    }],
    achievements: [{ 
        type: String 
    }],
    location: { 
        city: String, 
        country: String, 
        remote: Boolean 
    }}, { timestamps: true });

module.exports = mongoose.model('Exprience', experienceSchema)