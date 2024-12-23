const httpStatus = require("http-status");
const { isEmpty } = require("lodash");

const { roles } = require("@src/lib/constant");
const { catchAsync, generateId, pick } = require("@src/lib/utils");
const taskService = require('@src/services/task.service');

const create = catchAsync(async (req, res) => {
    const user = req.user || {}
    const data = {
        ...req.body,
        taskId: generateId("TS"),
        createdBy: user?.id

    };
    const task = await taskService.createTask(data);
    return res.status(200).json({
        message: "success",
        data: task
    });
});

const getTaskWithComments = catchAsync(async (req, res, next) => {
    const { taskId } = req.params;
    const task = await taskService.getTaskWithComments(taskId);
    if (isEmpty(task)) {
        return res.status(httpStatus.NOT_FOUND).json({
            message: "Task not found.",
            data: null
        })
    }
    return res.status(httpStatus.OK).json({
        message: "success",
        data: task
    })
})

const deleteTask = catchAsync(async (req, res, next) => {
    const { taskId } = req.params;
    await taskService.deleteTask(taskId);
    return res.status(httpStatus.OK).json({
        message: "success",
        data: null
    })
});

const getAllTasks = catchAsync(async (req, res) => {
    const options = pick(req.query, ['limit', 'page']);
    const filter = pick(req.query, ['search']);
    const tasks = await taskService.getAllTasks(filter, options);
    return res.status(200).json({
        message: "success",
        data: tasks
    })
});

const updateTask = catchAsync(async (req, res) => {
    const user = req.user || {}
    const { taskId } = req.params || {};
    const updatedDtails = req.body;
    const task = await taskService.getTaskById(taskId);
    if (isEmpty(task)) {
        return res.status(httpStatus.NOT_FOUND).json({
            message: "Task not found.",
            data: null
        })
    }
    if (task?.createdBy?.toString() != user?.id && user.role != roles.ADMIN) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "Updation not allowed.",
            data: null
        })
    }
    const updatedTask = await taskService.updateTask({ _id: taskId }, { updatedDtails });
    return res.status(httpStatus.OK).json({
        message: "Task updated successfully.",
        data: updatedTask
    })
});

module.exports = {
    create,
    deleteTask,
    getTaskWithComments,
    getAllTasks,
    updateTask
}