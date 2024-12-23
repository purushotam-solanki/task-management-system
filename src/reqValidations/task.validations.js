const Joi = require('joi')

const { objectId } = require('@utils/validations');
const { taskPriority, taskStatus } = require('@src/lib/constant');

const createTask = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        dueDate: Joi.date().required(),
        priority:Joi.string().valid(...Object.values(taskPriority)),
        status:Joi.string().valid(...Object.values(taskStatus))
    })
};

module.exports = {
    createTask,
}