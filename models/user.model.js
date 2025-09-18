const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'name is required'],
        trim: true,
        maxlength: [100,'name must be small']
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        minlength: [6, 'Password must be atLeast 6 char long']
    },
    role:{
        type: String,
        enum: ['user' ,'admin'],
        default: 'user',
    },
},
    {
        timestamps: true
    })

module.exports = mongoose.model('User', UserSchema)