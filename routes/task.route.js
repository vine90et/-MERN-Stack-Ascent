const express = require('express')
const Task = require('../modles/task.model')
const Team = require('../modles/team.modle')
const {auth} = require('../middleware/auth.middleware')

const router = express.Router()

router.post('/', auth, async(req,res,next)=>{
    try {
        const payload = {...req.body, createdBy: req.user_id}
        if(payload.team){
            const team = await Team.findById(payload.team)
            if(!team) return res.status(400).json({ success:false, message: 'Invalid team' });
            if(!team.members.map(m => m.toString()).includes(req.user._id.toString() || req.user.role !== 'admin')){
                return res.status(401).json({success: false, message:'Not a team member'})
            }
        }
        const task = await Task.create(payload)
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        next(error)
    }
})

//Get Team 
router.get('/',auth, async(req,res,next)=>{
    try {
        const {team, status, assignees, page=1 ,limit =20} = req.query
        const filter = {}
        if(team) filter.team = team;
        if(status )filter.status = status;
        if(assignees) filter.assignees = assignee;

        const task = await Task.find(filter)
        .sort({createdAt: -1})
        .skip((page-1)*limit)
        .limit(parseInt(limit))
        .populate('assignees', 'name email')
        .populate('createdBy', 'name email')

        const count = await Task.countDocuments(filter)
        res.json({ success: true, count, data: task }); 
    } catch (error) {
        next(error);
    }
})

//get single
router.get('/:id', auth, async(req,res,next)=>{
    try {
        const task = await Task.findById(req.params.id).populate('assignees','name email')
         if (!task) return res.status(404).json({ success:false, message: 'Task not found' });

        res.json( {success:true, data: task} )
    } catch (error) {
        next(error)
    }
})

router.put('/:id',auth,async(req,res,next)=>{
    try {
        const task = await Task.findById(req.params.id)
        const updatedData = req.body;
        if(!task) return res.status(404).json({success:false, message:"Task not Found"});
        if(task.team){
            const team = await Team.findById(task.team)
            if(team && !team.members.map(m => m.toString()).includes(user._id.toString()) && req.user._id != 'admin'){
                return res.status(403).json({ success:false, message: 'Forbidden' });
            }
        }
        const update = await Task.findByIdAndUpdate(req.params.id,updatedData, { new: true, runValidators: true });
         res.json({ success:true, data: updated });
    } catch (error) {
        next(error)
    }
})

router.delete('/:id',auth, async(req,res,next)=>{
    try {
        const task = await Task.findById(req.params.id)
        if(!task) return res.status(404).json({success:false, message:"Task not Found"});

        if(task.team){
            const team = await Team.find(task.team)
            if(team && !team.members.id.map(m=> m.toString()).includes(user._id.toString()) && req.user.id != 'admin'){
                return res.status(403).json({ success:false, message: 'Forbidden' });
            }
        }
        await Task.findByIdAndDelete(req.params.id);
        res.json({ success:true, message: 'Task deleted' });
    } catch (error) {
        next(error);
    }
})




module.exports = router