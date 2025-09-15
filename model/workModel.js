const mongoose = require('mongoose');

const WorkExperienceSchema = new mongoose.Schema({
    company :{
        type: String,
        required: [true,'company name is required'],
        trim: true,
        maxlength: [100,'Company Name is too large'],
    },
    position:{
        type: String,
        required: [true,'Position is reqquired'],
        trim: true,
        maxlength: [100,'Position title is too long']
    },
    StartDate:{
        type: Date,
        required: [true,'start Date is required']
    },
    endDate:{
        type:Date,
        validate:{
            validator: function(value){
                return !value || value >= this.StartDate;
            }
        },
        message: 'End date must be after start date'
    },
    current: {
    type: Boolean,
    default: false
  },
  technologies: [{ type: String, trim: true }],
  achievements: [{ type: String, trim: true }]
},
{
    timestamps: true
});

module.exports = mongoose.model('WorkExperience',WorkExperienceSchema)