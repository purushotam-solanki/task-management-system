const mongoose = require('mongoose');
const paginate = require("mongoose-paginate-v2");
const aggreatePagiante = require("mongoose-aggregate-paginate-v2")

const { taskPriority, taskStatus } = require('@src/lib/constant');

const taskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
        },
        description: {
            type: String,
            trim: true,
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        taskId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        priority: {
            type: String,
            enum: Object.values(taskPriority),
            default: taskPriority.MEDIUM,
        },
        status: {
            type: String,
            enum: Object.values(taskStatus),
            default: taskStatus.PENDING,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
    },
    {
        timestamps: true,
    }
);

//Plugins
taskSchema.plugin(paginate)
taskSchema.plugin(aggreatePagiante)

const TaskModel = mongoose.model('task', taskSchema);

module.exports = TaskModel;