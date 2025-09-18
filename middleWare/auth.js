const jwt  = require('jsonwebtoken')
const User = require('../models/user.model')

const auth = async(req,res,next)=>{
    try {
        const headers = req.headers.authorization;
        if(!headers || !headers.startsWith('Bearer ')){
            return res.status(401).json({success:false, message:'No token provided'})
        }
        const token = headers.split(' ')[1];
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(payload.id).select('-password')
        if(!user){
            return res.status(401).json({success:false,  message: 'User not found' })
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error)
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

module.exports = {auth};