const express = require('express');
const Work = require('../models/work.model');

const router = express.Router();


function buildFilter(query){
    const filter = {};
    if(query.userId) filter.userId = query.userId;
    if(query.company) filter.company = { $regex: query.company, $options: 'i' };
    if(query.role) filter.role = { $regex: query.role, $options: 'i' };
    if(query.technologies) filter.technologies = { $in: [ new RegExp(query.technologies, 'i') ] };
    if(query.current) filter.isCurrent = query.current === 'true';

    if(query.startBefore || query.startAfter){
        filter.startDate = {};
        if(query.startBefore) filter.startDate.$lte = new Date(query.startBefore);
        if(query.startAfter) filter.startDate.$gte = new Date(query.startAfter);
    }

    if(query.endBefore || query.endAfter){
        filter.endDate = {};
        if(query.endBefore) filter.endDate.$lte = new Date(query.endBefore);
        if(query.endAfter) filter.endDate.$gte = new Date(query.endAfter);
    }

    return filter;
}

// GET /api/work?pagination&filters
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 20, sort = '-startDate' } = req.query;
        const filter = buildFilter(req.query);

        const skip = (Number(page) - 1) * Number(limit);
        const [items, total] = await Promise.all([
            Work.find(filter).sort(sort).skip(skip).limit(Number(limit)),
            Work.countDocuments(filter)
        ]);

        res.json({ meta: { total, page: Number(page), limit: Number(limit), data: items } });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// POST /api/work
router.post('/', async (req, res) => {
    try {
        const item = await Work.create(req.body);
        res.status(201).json(item);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Bad request', error: err.message });
    }
});

// GET /api/work/:id
router.get('/:id', async (req, res) => {
    try {
        const item = await Work.findById(req.params.id);
        if(!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Bad request' });
    }
});

// PATCH /api/work/:id
router.patch('/:id', async (req, res) => {
    try {
        const item = await Work.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if(!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Bad request' });
    }
});

// PUT /api/work/:id
router.put('/:id', async (req, res) => {
    try {
        const item = await Work.findOneAndReplace(
            { _id: req.params.id },
            req.body,
            { new: true, upsert: false }
        );
        if(!item) return res.status(404).json({ message: 'Not found' });
        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Bad request' });
    }
});

// DELETE /api/work/:id
router.delete('/:id', async (req, res) => {
    try {
        const item = await Work.findByIdAndDelete(req.params.id);
        if(!item) return res.status(404).json({ message: 'Not found' });
        res.status(204).end();
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Bad request' });
    }
});

module.exports = router;
