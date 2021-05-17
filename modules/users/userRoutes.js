const router = require("express").Router();

/** 
 * Bring in user registration function 
 */ 
const { getAllUsers, getUserById } = require("./userController")

/** 
 * User registration route 
 */
router.get("/", async (req, res) => { getAllUsers(req.body, res) });

router.get("/:userId", getUserById);


module.exports = router;