const router = require("express").Router();

const { auth, validate } = require("@src/lib/middlewares");
const allPermissions = require("@src/lib/permissions/allPermissions");
const controller = require("@controllers/comment.controller");
const commentReqValidationSchema = require('@src/reqValidations/comment.validation')

router.
    route('/')
    .get(auth(allPermissions.ALL_COMMENT), validate(commentReqValidationSchema.getAllComments), controller.getAllComments)
    .post(auth(allPermissions.ADD_COMMENT), validate(commentReqValidationSchema.addComment), controller.addComment)

router.
    route('/:commentId')
    .get(auth(allPermissions.GET_COMMENT), validate(commentReqValidationSchema.getComment), controller.getComment)
    .patch(auth(allPermissions.UPDATE_COMMENT), validate(commentReqValidationSchema.updateComment), controller.updateComment)
    .delete(auth(allPermissions.DELETE_COMMENT), validate(commentReqValidationSchema.deleteComment), controller.deleteComment)
module.exports = router