const httpStatus = require("http-status");

const { roles } = require("@src/lib/constant");
const { catchAsync, generateId } = require("@src/lib/utils");
const { UserModel } = require("@src/models");

const addUser = catchAsync(async (req, res) => {
    const data = {
        ...req.body,
        userId: generateId("US"),
        role: roles.USER
    };
    if (data?.email && await UserModel.isEmailTaken(data?.email)) {
        throw new Error("Email already taken.")
    }
    if (data?.phoneNumber?.number && await UserModel.isPhoneNumberTaken(data?.phoneNumber?.number)) {
        throw new Error("Phone number already taken.")
    }
    if (data.userName && await UserModel.isUserNameTaken(data?.userName)) {
        throw new Error("Username already taken.")
    }
    const user = await UserModel.create(data)
    /**
     * NOTE: Not setting cookies here, User will need to login through his phone number and otp.
     * this make sure that if user has entered wrong phone number then he will not be able to 
     * perform any action.
     * 
     */
    return res.status(httpStatus.OK).json({
        message: "User added successfully.",
        data: user
    })
});

module.exports = {
    addUser
}