const { CommentModel } = require("@src/models")

const addComment = async (data = {}) => {
    return await CommentModel.create(data)
};

const getCommentById = async (commentId = "") => {

    return await CommentModel.findById(commentId)
}

const deleteCommentById = async (commentId = "") => {
    return await CommentModel.deleteOne({ _id: commentId })
}

const updateComment = async (filter, updatedContent) => {

    return await CommentModel.findOneAndUpdate(
        filter,
        { $set: updatedContent },
        { new: true, runValidators: true }
    )
}

const getAllComments = async (filter = {}, options) => {
    try {
        options.lean = true
        options.collation = { locale: 'en' }
        return await CommentModel.paginate(filter, options)
    } catch (e) {
        throw new Error(e)
    }
}
module.exports = {
    addComment,
    getCommentById,
    deleteCommentById,
    updateComment,
    getAllComments
}