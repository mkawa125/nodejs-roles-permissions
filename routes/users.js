const router = require("express").Router();

/** Bring in user registration function */ 
const { 
    userRegister,
     userLogin, 
     userAuthentication,
     checkRole, 
     serializeUser } = require("../utils/Auth")

/** User registration route */
router.post(
    "/register-user", 
    async (req, res) => {
    await userRegister(req.body, "user", res);
});

/** Admin registration route */
router.post(
    "/register-admin", 
    async (req, res) => {
    await userRegister(req.body, "admin", res);
});

/** Super admin registration route */
router.post(
    "/register-supper-admin", 
    async (req, res) => {
    await userRegister(req.body, "superadmin", res);
});

/** Users login route */
router.post(
    "/login-user", 
    async (req, res) => {
    await userLogin(req.body, "user", res);
});

/** Admin login route */
router.post(
    "/login-admin", 
    async (req, res) => {});

/** SUper admin login route */
router.post(
    "/login-super-admin", 
    async (req, res) => {});

/** Profile Route */ 
router.get(
    "/profile", 
    userAuthentication,
    async (req, res) => {
    return res.json(serializeUser(req.user))
});

/** Users protected route */
router.get(
    "/user-protected", 
    userAuthentication, 
    checkRole(['user']), 
    async (req, res) => {
        return res.json("Hello User")
    }
);

/** Admin protected route */
router.get(
    "/admin-protected", 
    checkRole(['admin']), 
    async (req, res) => {
        return res.json("Hello Admin")
});

/** SUper admin protected route */
router.get(
    "/super-admin-protected", 
    checkRole(['super-admin']), 
    async (req, res) => {
        return res.json("Hello Supper Admin")
});

module.exports = router;