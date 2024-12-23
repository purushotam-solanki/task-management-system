const permissions = require("./allPermissions");

module.exports = [

    //Task related permissions
    permissions.CREATE_TASK,
    permissions.GET_TASK,
    permissions.DELETE_TASK,
    permissions.GET_ALL_TASKS,
    permissions.UPDATE_TASK,

    //Comments related permission
    permissions.ADD_COMMENT,
    permissions.DELETE_COMMENT,
    permissions.UPDATE_COMMENT,
    permissions.GET_COMMENT,
    permissions.ALL_COMMENT,
]