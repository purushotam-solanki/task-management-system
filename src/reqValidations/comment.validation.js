const Joi = require('joi')

const { objectId } = require('@utils/validations');
const { taskPriority, taskStatus } = require('@src/lib/constant');

const addComment = {
    query: Joi.object().keys({
        taskId: Joi.string().required().custom(objectId)
    }),
    body: Joi.object().keys({
        content: Joi.string().required()
    })
};

module.exports = {
    addComment,
}