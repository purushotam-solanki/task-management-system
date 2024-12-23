const router = require('express').Router();

const authRoutes = require("@routes/v1/auth.routes")
const taskRoutes = require("@routes/v1/task.routes")
const commentRoutes = require("@routes/v1/comment.routes")
const userRoutes=require("@routes/v1/user.routes")

const defaultRoutes = [
    {
        path: "/auth",
        route: authRoutes
    },
    {
        path: "/task",
        route: taskRoutes
    },
    {
        path: "/comment",
        route: commentRoutes
    },
    {
        path: "/user",
        route: userRoutes
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router