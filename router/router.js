const express = require('express')
const WorkExperience = require('../model/workModel')
const validateExperience = require('../middleWare/validateExperience')

const router = express.Router();

router.post('/',validateExperience, async(req,res,next)=>{
    try {
        const data = await WorkExperience.create(req.body);
        res.status(201).json({success: true, data: data })
    } catch (error) {
        console.error(error)
        next(error);
    }
})

router.get('/', async(req,res,next)=>{
    try {
        const filter = req.query || {}
        const data = await WorkExperience.find(filter);
        res.json({ success: true, count: data.length, data: data });
    } catch (error) {
        console.error(error)
        next(error)
    }
})

router.get('/:id', async(req,res,next)=>{
    try {
        const data = await WorkExperience.findById(req.params.id);
        if(!data){
            return res.status(404).status({success: false, message: 'Work experience not found'})
        }
        res.json({ success: true, data: data });
    } catch (error) {
        console.error(error)
        next(error)
    }
})

router.put('/:id', validateExperience, async(req,res,next)=>{
    try {
        const data = await WorkExperience.findByIdAndUpdate(
            req.params.id,
            req.body, 
            { new: true, runValidators: true }
        );
        if(!data){
            return res.status(404).status({success: false, message: 'Work experience not found'})
        }
        res.json({ success: true, data: data });
    } catch (error) {
        console.error(error)
        next(error)
    }
})


router.delete('/:id', async(req,res,next)=>{
    try {
        const data = await WorkExperience.findByIdAndDelete(req.params.id)
        if(!data) return res.status(404).json({ success: false, message: 'Work experience not found' });
        res.json({ success: true, message: 'Work experience deleted successfully' });
    } catch (error) {
        console.error(error)
         next(err);
    }
});

module.exports = router;
