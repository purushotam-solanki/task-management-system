const router = require('express').Router();

const { } = require('@src/lib/permissions');
const controller = require('@controllers/task.controller');
const { auth, validate } = require('@middlewares');
const reqValidationSchema = require('@src/reqValidations/task.validations');
const allPermissions = require('@src/lib/permissions/allPermissions');

router.
    route('/')
    .get(auth(allPermissions.GET_ALL_TASKS), controller.getAllTasks)
    .post(auth(allPermissions.CREATE_TASK), validate(reqValidationSchema.createTask), controller.create)

router.
    route('/:taskId')
    .get(auth(allPermissions.GET_TASK), controller.getTaskWithComments)
    .patch(auth(allPermissions.UPDATE_TASK), controller.updateTask)
    .delete(auth(allPermissions.DELETE_TASK), controller.deleteTask)

module.exports = router