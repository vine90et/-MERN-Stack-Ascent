const mongoose = require('mongoose')

const TechSchema = new mongoose.Schema({
     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
     category: { type: String, enum: ['web', 'mobile', 'desktop', 'api', 'other'] }, 
    }, 
     { timestamps: true });

     module.exports = mongoose.model('Technology', TechSchema);