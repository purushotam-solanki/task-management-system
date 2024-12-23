const router = require('express').Router();

const controller = require('@controllers/auth.controller');
const { validate } = require('@middlewares');
const authReqValidationSchema = require('@src/reqValidations/auth.validations')

router
    .post('/send-otp', validate(authReqValidationSchema.sendOtp), controller.sendOtp)

router
    .post('/verify-otp', validate(authReqValidationSchema.verifyOtp), controller.verifyOtp)

router.
    post('/log-out', controller.logOut)

router.
    post('/signup', validate(authReqValidationSchema.signUp), controller.signUp)

module.exports = router