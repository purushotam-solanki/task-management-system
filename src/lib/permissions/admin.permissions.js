const permissions = require("./allPermissions");

module.exports = [
    /**
     * NOTE: In general, Admin role will have all the permission
     */
    ...Object.values(permissions)
]