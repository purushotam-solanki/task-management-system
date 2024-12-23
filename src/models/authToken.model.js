const mongoose = require('mongoose');

const { authTokenTypes } = require('@src/lib/constant');

const authTokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(authTokenTypes),
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json

/**
 * @typedef Token
 */
const AuthTokenModel = mongoose.model('auth_tokens', authTokenSchema);

module.exports = AuthTokenModel;
