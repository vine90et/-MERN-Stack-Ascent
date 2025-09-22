const mongoose =require('mongoose')

const taskSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    description:{
        type: String
    },
    status:{
        type: String,
        enum:['todo','in-progress','review','done'],
        default: 'todo',
    },
    priority:{
        type: String,
        enum: ['low','medium','high'],
        default: 'medium'
    },
    assignees:[{
        type: mongoose.Schema.Types.ObjectId, ref:'User'
    }],
    team:{
        type: mongoose.Schema.Types.ObjectId, ref:'Team'
    },
    
    dueDate: Date,
    tags:[String],
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref:'User'},
    attachment: {__filename: String, url: String},
},{ timestamps: true },
)

module.exports = mongoose.model("Task", taskSchema)