const router = require("express").Router();

/** 
 * Bring in user registration function 
 */ 
const { getAllUsers, getUserById, updateUser, deleteUser } = require("./userController")

/** 
 * User registration route 
 */
router.get("/", async (req, res) => { getAllUsers(req.body, res) });

router.get("/:userId", getUserById);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);


module.exports = router;