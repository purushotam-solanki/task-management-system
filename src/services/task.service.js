const httpStatus = require("http-status");
const mongoose = require("mongoose")

const { TaskModel, CommentModel } = require("@src/models");
const aggregatePagination = require("@src/lib/utils/aggregatePagination");

const createTask = async (data = {}) => {
    return await TaskModel.create(data)
};

const getTaskWithComments = async (taskId) => {
    const taskWithComments = await TaskModel.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(taskId) }
        },
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'task',
                as: 'comments'
            }
        }
    ]);
    return taskWithComments[0];
};

const deleteTask = async (taskId) => {
    /**
     * NOTE: In local, Mongodb does not support transaction direclty because transaction 
     * works on replica sets not on standalone instance
     */
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // Delete the task
        const taskDeletion = await TaskModel.deleteOne({ _id: taskId }, { session });
        if (taskDeletion.deletedCount === 0) {
            throw new Error('Task not found');
        }

        // Delete associated comments
        await CommentModel.deleteMany({ task: taskId }, { session });

        // Commit the transaction
        await session.commitTransaction();
        console.log('Task and associated comments deleted successfully');
    } catch (error) {
        // Abort the transaction in case of an error
        await session.abortTransaction();
        console.error('Transaction aborted:', error.message);
    } finally {
        session.endSession();
    }

    // const taskDeletion = await TaskModel.deleteOne({ _id: taskId });
    // if (taskDeletion.deletedCount === 0) {
    //     throw new Error('Task not found');
    // }
    // // Delete associated comments
    // await CommentModel.deleteMany({ task: taskId });
};
const getAllTasks = async (filter = {}, options = {}) => {
    const pipeline = [
        {
            $match: {
                ...filter
            }
        },
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'task',
                as: 'comments'
            }
        }
    ]
    return await aggregatePagination(TaskModel, pipeline, options)
}

const getTaskById = async (taskId = "") => {
    return await TaskModel.findById(taskId)
};

const updateTask = async (filter = {}, updatedDetails = {}) => {
    const updatedTask = await TaskModel.findOneAndUpdate(
        filter,
        { $set: updatedDetails },
        {
            new: true,
            runValidators: true,
            upsert: false,
        }
    );
    return updatedTask
}

module.exports = {
    createTask,
    deleteTask,
    getTaskWithComments,
    getAllTasks,
    getTaskById,
    updateTask,
}