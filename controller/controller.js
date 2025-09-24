const mongoose = require('mongoose')
const User = require('../model/user.model')
const Profile = require('../model/profile')
const Skill = require('../models/Skill.model');
const Project = require('../models/Project.model');
const Experience = require('../models/Experience.model');
const Technology = require('../models/Technology.model');

exports.getDashboard = async (req, res, next) => {
    try {
        const userId = req.user.id
        const [profile, skills, projects, experiences] = await Promise.all([
            Profile.findOne({ user: userId }).populate('user', 'email  name'),
            Skill.find({ user: userId }),
            Project.find({ user: userId }).populate('technologies skills'),
            Experience.find({ user: userId })
        ]);
        const summary = {
            counts: {
                skills: skills.length,
                projects: projects.length,
                experiences: experiences.length
            }
        };
        res.json({ profile, skills, projects, experiences, summary });

    } catch (err) {
        next(err)
    }
}

exports.getPortfolio = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const project = await Projrct.find({ user: userId })
            .populate('technology skills')
            .sort({ startDate: -1 })
        res.json({ projects });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

exports.search = async (req, res, next) => {
    try {
        const q = req.query.q;
        if (!q) return res.status(400).json({ msg: 'q query param required' });
        const regexp = new RegExp(q, 'i')
        const [projects, skills, technologies, profiles] = await Promise.all([
            Project.find({ $or: [{ title: regexp }, { description: regexp }] }).limit(50).populate('technologies skills'),
            Skill.find({ name: regexp }).limit(50),
            Technology.find({ name: regexp }).limit(50),
            Profile.find({ $or: [{ headline: regexp }, { summary: regexp }] }).limit(10)
        ])
        res.json({ projects, skills, technologies, profiles });
    } catch (error) {
        next(error)
    }
}

exports.analyticsSkill = async (req, res, next) => {
    try {
        const pipeline = [
            { $unwind: '$skills' },
            { $group: { _id: '$skills', projectsCount: { $sum: 1 } } },
            { $lookup: { from: 'skills', localField: '_id', foreignField: '_id', as: 'skill' } },
            { $unwind: '$skill' },
            { $project: { skillId: '$skill._id', name: '$skill.name', projectsCount: 1 } },
            { $sort: { projectsCount: -1 } }
        ];
        const data = await Project.aggregate(pipeline);
        res.json(data);
    } catch (error) {
        next(err)
    }
}

exports.analyticsTechnology = async (req, res) => {
  try {
    const pipeline = [
      { $unwind: '$technologies' },
      { $group: { _id: '$technologies', projectsCount: { $sum: 1 } } },
      { $lookup: { from: 'technologies', localField: '_id', foreignField: '_id', as: 'tech' } },
      { $unwind: '$tech' },
      { $project: { techId: '$tech._id', name: '$tech.name', projectsCount: 1 } },
      { $sort: { projectsCount: -1 } }
    ];
    const data = await Project.aggregate(pipeline);
    res.json(data);
  } catch (error) {
    next(err)
  }
};

exports.analyticsCareer = async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.user.id);
    const pipeline = [
      { $match: { user: userId } },
      { $project: { title: 1, company: 1, startYear: { $year: '$startDate' }, startDate: 1, endDate: 1 } },
      { $group: { _id: '$startYear', roles: { $push: { title: '$title', company: '$company', startDate: '$startDate', endDate: '$endDate' } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ];
    const data = await Experience.aggregate(pipeline);
    res.json(data);
  } catch (error) {
    next(err)
  }
};