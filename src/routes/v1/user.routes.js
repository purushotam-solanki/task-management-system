const router = require("express").Router();

const controller = require('@controllers/user.controller');
const allPermissions = require("@src/lib/permissions/allPermissions");
const { auth, validate } = require("@src/lib/middlewares");
const { authReqValidations } = require("@src/reqValidations");

router
    .route('/')
    .post(auth(allPermissions.ADD_USER), validate(authReqValidations.signUp), controller.addUser)

module.exports = router