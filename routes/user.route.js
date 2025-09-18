const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const route = express.Router();
const saltRound = 12;

route.post('/register', async(req,res,next)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password) return res.status(400).json({success:false,message:'all credentials are required'});

        const exist = await User.findOne({email});
        if(exist) return res.status(400).json({success: false, message:'email already exist'})
        
        const hashedPassword = await bcrypt.hash(password,saltRound)
        
        const user = await User.create({name,email, password:hashedPassword})
        const token = jwt.sign({id: user._id,role: user.role}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

        res.status(201).json({ success: true, data: { user: { id: user._id, name: user.name, email: user.email }, token } });
    } catch (error) {
        console.error(error)
        next(error);
    }
})

route.post('/login', async(req,res,next)=>{
    try {
        const {email,password} = req.body;
        if (!email || !password) return res.status(400).json({ success: false, message: 'Missing fields' });

        const user = await User.findOne({email});
        if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });

        const comparePassword = await bcrypt.compare(password,user.password)
        if (!comparePassword) return res.status(400).json({ success: false, message: 'Invalid credentials' });

        const token = jwt.sign({id: user._id, role: user.role},process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
        res.status(201).json({ success: true, data: { user: { id: user._id, name: user.name, email: user.email }, token } })

    } catch (error) {
        console.error(error)
        next(error);
    }
})

module.exports = route;