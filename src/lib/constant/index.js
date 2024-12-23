module.exports = {
    roles: require('./roles'),
    registrationSource: {
        FORM: "form",
        GOOGLE: "google"
    },
    userStatus: {
        ACTIVE: "active",
        INACTIVE: "inactive"
    },
    taskPriority: {
        LOW: "Low",
        MEDIUM: "Medium",
        HIGH: "High"
    },
    taskStatus:{
        PENDING:"Pending",
        IN_PROGRESS:"In Progress",
        COMPLETED:"Completed"
    },
    authTokenCookiesKeys: {
        ACCESS_TOKEN: "acs_tkn_pms",
        REFRESH_TOKEN: "rfh_tkn_pms",
    },
    authTokenTypes: {
        ACCESS: 'access',
        REFRESH: 'refresh',
    }
}