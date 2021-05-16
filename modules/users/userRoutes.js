const router = require("express").Router();

/** 
 * Bring in user registration function 
 */ 
const { getAllUsers } = require("./userController")

/** 
 * User registration route 
 */
router.get("/", 
    async (req, res) => {
    getAllUsers(req.body, res);
});


module.exports = router;