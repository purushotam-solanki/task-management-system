const Joi = require('joi')

const { phoneNumber, userNamePattern } = require('@utils/validations');

const signUp = {
    body: Joi.object().keys({
        fullName: Joi.string().required(),
        email: Joi.string().email(),
        phoneNumber: Joi.object().optional().keys({
            countryCode: Joi.string().required(),
            number: Joi.string().required()
        }).custom(phoneNumber),
        profilePic: Joi.string().allow(""),
        userName: Joi.string()
            .pattern(userNamePattern)
            .required()
            .messages({
                'string.pattern.base': 'Username must be 6-15 characters long, can include letters, numbers, underscores, dots, but cannot have consecutive dots or start/end with a dot.',
                'string.empty': 'Username is required.',
            }),
    }),
};

const sendOtp = {
    body: Joi.object().keys({
        phoneNumber: Joi.object().optional().keys({
            countryCode: Joi.string().required(),
            number: Joi.string().required()
        }).custom(phoneNumber),
    })
};

const verifyOtp = {
    body: Joi.object().keys({
        phoneNumber: Joi.object().optional().keys({
            countryCode: Joi.string().required(),
            number: Joi.string().required()
        }).custom(phoneNumber),
        otp: Joi.number().required()
    }),

}
module.exports = {
    signUp,
    sendOtp,
    verifyOtp
}