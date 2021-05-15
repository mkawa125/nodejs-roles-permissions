const router = require("express").Router();
// Bring in user registration function
const { userRegister, userLogin, userAuthentication } = require("../utils/Auth")

// User registration route
router.post("/register-user", async (req, res) => {
    await userRegister(req.body, "user", res);
});

// Admin registration route
router.post("/register-admin", async (req, res) => {
    await userRegister(req.body, "admin", res);
});

// Super admin registration route
router.post("/register-supper-admin", async (req, res) => {
    await userRegister(req.body, "superadmin", res);
});

// Users login route
router.post("/login-user", async (req, res) => {
    await userLogin(req.body, "user", res);
});

// Admin login route
router.post("/login-admin", async (req, res) => {});

// SUper admin login route
router.post("/login-super-admin", async (req, res) => {});

// Profile Route
router.get("/profile", userAuthentication,async (req, res) => {
    return res.json('Hello')
});

// Users protected route
router.post("/user-protected", async (req, res) => {});

// Admin protected route
router.post("/admin-protected", async (req, res) => {});

// SUper admin protected route
router.post("/super-admin-protected", async (req, res) => {});

module.exports = router;