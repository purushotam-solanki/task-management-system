const httpStatus = require("http-status");
const { isEmpty } = require("lodash");

const { taskService, commentService } = require('@src/services')
const { catchAsync, pick } = require("@src/lib/utils");
const { roles } = require("@src/lib/constant");

const addComment = catchAsync(async (req, res, next) => {
    const user = req.user || {};
    const { taskId } = req.query || {}
    const data = {
        ...req.body,
        createdBy: user?._id,
        task: taskId
    }
    /**
     * First fetching the task to check if it exists or not 
     * because task may have been deleted while user was adding comment
     */
    const task = await taskService.getTaskById(taskId);
    if (isEmpty(task)) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "Task not found.",
            data: null
        })
    }
    const comment = await commentService.addComment(data);
    return res.status(200).json({
        message: "success",
        data: comment
    });
});

const deleteComment = catchAsync(async (req, res, next) => {
    const user = req.user || {}
    const { commentId } = req.params;
    const comment = await commentService.getCommentById(commentId);
    if (isEmpty(comment)) {
        return res.status(httpStatus.NOT_FOUND).json({
            message: "Comment not found.",
            data: null
        })
    };
    /**
     * NOTE: Only two persons can delete the comment 
     * 1. Person who added the comment
     * 2. Admin can delete any comment
     */
    if (comment.createdBy?.toString() !== user?.id && user.role !== roles.ADMIN) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "Comment can't be deleted.",
            data: null
        })
    };
    await commentService.deleteCommentById(commentId)
    return res.status(httpStatus.OK).json({
        message: "Comment deleted successfully.",
        data: null
    })
})

const updateComment = catchAsync(async (req, res, next) => {
    const user = req.user || {}
    const { commentId } = req.params;
    const { content } = req.body
    const comment = await commentService.getCommentById(commentId);
    if (isEmpty(comment)) {
        return res.status(httpStatus.NOT_FOUND).json({
            message: "Comment not found.",
            data: null
        })
    };
    /**
     * NOTE: Only two persons can update the comment 
     * 1. Person who added the comment
     * 2. Admin can update any comment
     */
    if (comment.createdBy?.toString() !== user?.id && user.role !== roles.ADMIN) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "Comment can't be updated.",
            data: null
        })
    };
    const updatedComment = await commentService.updateComment({ _id: commentId }, { content })
    return res.status(httpStatus.OK).json({
        message: "Updated successfully.",
        data: updatedComment
    })
});

const getComment = catchAsync(async (req, res, next) => {
    const { commentId } = req.params
    const comment = await commentService.getCommentById(commentId);
    if (isEmpty(comment)) {
        return res.status(httpStatus.NOT_FOUND).json({
            message: "Comment not found.",
            data: null
        })
    };
    return res.status(httpStatus.OK).json({
        message: "success",
        data: comment
    })
})

const getAllComments = catchAsync(async (req, res, next) => {
    const { taskId } = req.query
    const options = pick(req.query, ['limit', 'page']);
    const filter = pick(req.query, ['search', "createdBy"]);
    filter.task = taskId
    if (filter?.search) {
        filter.content = { $regex: filter.search, $options: 'i' };
        delete filter.search
    }
    const comments = await commentService.getAllComments(filter, options);
    return res.status(200).json({
        message: "success",
        data: comments
    })
});

module.exports = {
    addComment,
    deleteComment,
    updateComment,
    getComment,
    getAllComments
}