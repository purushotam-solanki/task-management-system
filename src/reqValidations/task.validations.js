const Joi = require('joi')

const { objectId } = require('@utils/validations');
const { taskPriority, taskStatus } = require('@src/lib/constant');

// Shared validation schema for task properties
const taskBodyBaseSchema = {
    title: Joi.string().required(),
    description: Joi.string().required(),
    dueDate: Joi.date().iso()
        .required()
        .messages({
            'date.format': 'Due date must be in the format YYYY-MM-DD',
            'date.base': 'Due date must be a valid date',
        }),
    priority: Joi.string().valid(...Object.values(taskPriority)),
    status: Joi.string().valid(...Object.values(taskStatus)),
    assignedTo: Joi.string().optional().custom(objectId),
};

const createTask = {
    body: Joi.object(taskBodyBaseSchema),
};

const updateTask = {
    body: Joi.object(taskBodyBaseSchema),
};



const getTask = {
    params: Joi.object().keys({
        taskId: Joi.string().required().custom(objectId)
    })
}

const deleteTask = {
    params: Joi.object().keys({
        taskId: Joi.string().required().custom(objectId)
    })
}

const getAllTasks = {
    query: Joi.object().keys({
        limit: Joi.number(),
        page: Joi.number(),
        search: Joi.string(),
        status: Joi.string().valid(...Object.values(taskStatus)),
        priority: Joi.string().valid(...Object.values(taskPriority)),
        assignedTo: Joi.string().custom(objectId),
        createdBy: Joi.string().custom(objectId),
    })
}

module.exports = {
    createTask,
    getTask,
    deleteTask,
    updateTask,
    getAllTasks
}