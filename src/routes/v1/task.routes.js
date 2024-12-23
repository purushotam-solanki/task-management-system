const router = require('express').Router();

const controller = require('@controllers/task.controller');
const { auth, validate } = require('@middlewares');
const taskReqValidationSchema = require('@src/reqValidations/task.validations');
const allPermissions = require('@src/lib/permissions/allPermissions');

router.
    route('/')
    .get(auth(allPermissions.GET_ALL_TASKS), validate(taskReqValidationSchema.getAllTasks), controller.getAllTasks)
    .post(auth(allPermissions.CREATE_TASK), validate(taskReqValidationSchema.createTask), controller.create)

router.
    route('/:taskId')
    .get(auth(allPermissions.GET_TASK), validate(taskReqValidationSchema.getTask), controller.getTaskWithComments)
    .patch(auth(allPermissions.UPDATE_TASK), validate(taskReqValidationSchema.updateTask), controller.updateTask)
    .delete(auth(allPermissions.DELETE_TASK), validate(taskReqValidationSchema.deleteTask), controller.deleteTask)

module.exports = router