const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/user.model')


const router = express.Router()
const salt_round = 10;

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // check required fields
    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: 'All credentials are required' });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });  // ✅ use findOne
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, salt_round);

    // create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // create JWT payload
    const payload = { user: { id: newUser.id } };  // ✅ use newUser.id

    // sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // send response
    res.status(201).json({ success: true, data: newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({data:newuser, token:token})
  } catch (err) {
    res.status(500).send('Server error');
  }
});


module.exports = router