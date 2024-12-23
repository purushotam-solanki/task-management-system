const Joi = require('joi')

const { objectId } = require('@utils/validations');

const addComment = {
    query: Joi.object().keys({
        taskId: Joi.string().required().custom(objectId)
    }),
    body: Joi.object().keys({
        content: Joi.string().required()
    })
};
const updateComment = {
    query: Joi.object().keys({
        taskId: Joi.string().required().custom(objectId)
    }),
    params: Joi.object().keys({
        commentId: Joi.string().required().custom(objectId)
    }),
    body: Joi.object().keys({
        content: Joi.string().required()
    })
}

const getComment = {
    query: Joi.object().keys({
        taskId: Joi.string().required().custom(objectId)
    }),
    params: Joi.object().keys({
        commentId: Joi.string().required().custom(objectId)
    }),
};

const deleteComment = {
    query: Joi.object().keys({
        taskId: Joi.string().required().custom(objectId)
    }),
    params: Joi.object().keys({
        commentId: Joi.string().required().custom(objectId)
    }),
}

const getAllComments = {
    query: Joi.object().keys({
        limit: Joi.number(),
        page: Joi.number(),
        search: Joi.string(),
        createdBy: Joi.string().custom(objectId),
        taskId: Joi.string().required().custom(objectId)
    }),
}

module.exports = {
    addComment,
    updateComment,
    getComment,
    deleteComment,
    getAllComments
}