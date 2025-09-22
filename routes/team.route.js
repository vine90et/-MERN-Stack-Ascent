const express = require('express')
const Team = require('../modles/team.modle')
const User = require('../modles/team.modle')
const { auth } = require('../middleware/auth.middleware')

const router = express.Router()

// Create team
router.post('/', auth, async(req,res,next)=>{
    try {
        const {name,description,members = []} = req.body;
        const team = await Team.create({name,description,members,createdBy: req.user._id})
        res.status(201).json({success: true, message:"team ceated succcessfully", data: team})
    } catch (error) {
        next(error)
    }
})

//Get team 
router.get('/', async(req,res,next)=>{
    try {
        const members = req.body;
        const filter = {}
        if(members) filter.members = members;
        const teams = await Team.find(filter).populate('members', 'name email')
        res.json({ success: true, count: teams.length, data: teams });
    } catch (error) {
     next(error)   
    }
})

//Add member

router.post('/:id/members',auth, async(req,res,next)=>{
    try {
        const team = await Team.findById(req.params.id)
        if(!team) return res.status(404).json({ success: false, message: 'Team not found' });
        // only creater or admin can add member
        if(req.user._id.toString() !== team.createdBy.toString() && req.user.role !== 'admin'){
             return res.status(403).json({ success: false, message: 'Forbidden' });
        }

        const {userId} = req.body;
        if(team.members.includes(userId)) return res.status(400).json({success: 'false', message:'already a member'});

        team.members.push(userId)
        await team.save()
        const populated = await Team.findById(team._id).populate('members','name email');
         res.json({ success: true, data: populated });

    } catch (error) {
        next(error)
    }
})

//Remove Member
router.delete('/:id/members/:userId',auth,async(req,res,next)=>{
    try {
        const team = await Team.findById(req.params.id)
        if(!team) return res.status(404).json({ success: false, message: 'Team not found' });

        if(team.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin'){
            return res.status(403).json({ success: false, message: 'Forbidden' });
        }

        team.members = team.members.filter(m => m.toString() !== req.params.userId)
        await team.save();
        res.json({ success: true, data: team });
    } catch (error) {
        next(error);
    }
})

module.exports = router;