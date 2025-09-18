const express = require('express')
const Post = require('../models/Post.model')
const {auth} = require('../middleWare/auth')

route = express.Router()

route.post('/',auth, async(req,res,next)=>{
    try {
        const payload = { ...req.body, author:req.user._id}
        const post = await Post.create(payload)
         res.status(201).json({ success: true, data: post });
    } catch (error) {
        console.error(error)
        next(error)
    }
})

route.get('/', async(req,res,next)=>{
    try {
        const {page = 1, limit = 10, tags,categories, published} = req.body;
        const filter= {}
        if(tags) filter.tags = tags;
        if (categories) filter.categories = categories;
        if (typeof published !== 'undefined') filter.published = published === 'true';

        const post = await Post.find(filter)
        .sort({createdAt: -1})
        .skip((page-1)*limit)
        .limit(parseInt(limit))
        .populate('author', 'name email');

        const count = await Post.countDocuments(filter);
        res.json({ success: true, count, data: post });
    } catch (error) {
        console.error(error);
        next(error)
    }
})

route.get("/:idOrSlug", async(req,res,next)=>{
    try {
        const {idOrSlug} = req.params;
        let post;
        if(idOrSlug.match(/^[0-9a-fA-F]{24}$/)){
            post = await Post.findById(idOrSlug).populate('author', 'name email');
        } else{
            post = await Post.findOne({ slug: idOrSlug }).populate('author', 'name email');
        }
        if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
         await Post.findByIdAndUpdate(post._id, { $inc: { views: 1 } }).catch(console.error);
         
        return res.json({ success: true, data: post })
    } catch (error) {
        console.error(error);
        next(error);
    }
})

route.put("/:id",auth, async(req,res,next)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post) return res.status(404).json({success:false, message:"Post not found"});
        console.log(req.user)
        if(post.author.toString() !== req.user._id.toString() && req.user.role != 'admin'){
            return res.status(403).json({success: false, message:'Forbidden'})
        }

        const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true});
        res.json({ success: true, data: updated });

    } catch (error) {
        console.error(error)
        next(error);
    }
})

route.delete('/:id',auth, async(req,res,next)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post) return res.status(404).json({ success: false, message: 'Post not found' });
        if(post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin' ){
            return res.status(403).json({ success: false, message: 'Forbidden' });
        }
        const deleted = await Post.findByIdAndDelete(req.params.id);
         res.json({ success: true, message: 'Post deleted' });
    } catch (error) {
        console.error(error)
        next(error);
    }
})


module.exports = route;