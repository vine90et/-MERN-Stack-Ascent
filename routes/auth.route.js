const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../modles/User.model')

const router = express.Router()
const saltRound =10

router.post('/register', async(req,res,next)=>{
    try {
        const {name, email, password,role} = req.body;
        if(!name || !email || !password) return res.status(400).json({success: false, message:'All field are required'});
        
        const exist = await User.findOne({email});
        if(exist) return res.status(400).json({success: false, message:'User already Exist'});

        const hashPassword = await bcrypt.hash(password, saltRound);
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            role
        })
        const token = jwt.sign({id: user._id, role: user.role},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN || '7d'})
        res.status(201).json({ success: true, data: { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token } });
    } catch (error) {
        next(error)
    }
})

router.post('/login', async(req,res,next)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password) return res.status(400).json({ success: false, message: 'Missing fields' });

        const user = await User.findOne({email})
        if(!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });

        const ok = await bcrypt.compare(password, user.password)
        if(!ok) return res.status(400).json({ success: false, message: 'Invalid credentials' });

        const token = jwt.sign({id: user._id, role: user._role}, process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN || '7d'})
        res.json({success: true, data: {user:{name:user.name, email: user.email, role: user.role}, token}})
    } catch (error) {
        next(error)
    }
}) 



module.exports = router