const mongoose = require('mongoose');
const paginate = require("mongoose-paginate-v2")

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    task:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'task',
      required: true,
    }
  },
  {
    timestamps: true,
  }
);
commentSchema.plugin(paginate)
// add plugin that converts mongoose to json

/**
 * @typedef Token
 */
const CommentModel = mongoose.model('comment', commentSchema);

module.exports = CommentModel;
