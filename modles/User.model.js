const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
name: String,
email: { type: String, unique: true },
password: String,
role: {
    type: String,
    enum: ['admin', 'editor', 'viewer'],
    default: 'viewer' 
},
teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],

},{timestamps:true});
module.exports = mongoose.model('User', UserSchema);