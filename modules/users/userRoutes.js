const router = require("express").Router();

/** 
 * Bring in user registration function 
 */ 
const { getAllUsers, getUserById, updateUser, deleteUser } = require("./userController")
const { userAuthentication } = require("../auth/authController")

/** 
 * User registration route 
 */
router.get("/", userAuthentication, async (req, res) => { getAllUsers(req.body, res) });

router.get("/:userId", userAuthentication, getUserById);
router.put("/:userId", userAuthentication,  updateUser);
router.delete("/:userId", userAuthentication, deleteUser);


module.exports = router;