const router = require("express").Router();

const { auth, validate } = require("@src/lib/middlewares");
const allPermissions = require("@src/lib/permissions/allPermissions");
const controller = require("@controllers/comment.controller");
const commentReqValidations = require('@src/reqValidations/comment.validation')

router.
    route('/')
    .get(auth(allPermissions.ALL_COMMENT), controller.getAllComments)
    .post(auth(allPermissions.ADD_COMMENT), validate(commentReqValidations.addComment), controller.addComment)

router.
    route('/:commentId')
    .get(auth(allPermissions.GET_COMMENT), controller.getComment)
    .patch(auth(allPermissions.UPDATE_COMMENT), controller.updateComment)
    .delete(auth(allPermissions.DELETE_COMMENT), controller.deleteComment)
module.exports = router