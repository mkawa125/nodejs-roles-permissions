const User = require("../models/user");
const bcrypt = require("bcryptjs")

/**
 * @DESC To register the user (ADMIN, SUPPER_ADMIN, USER)
*/
const userRegister = async (userDets, role, res) => {
    
    try {
        // Validate the username
        let usernameNotTaken = await validateUsername(userDets.username);
        if (!usernameNotTaken) {
            return res.status(400).json({
                message: `Username is already taken.`,
                success: false
            });
        }

        let emailNotRegistered = await validateEmail(userDets.email);
        if (!emailNotRegistered) {
            return res.status(400).json({
                message: `Email is already exist.`,
                success: false
            });
        }

        // Get hashed password
        const password = await bcrypt.hash("userDets.password", 12)

        // create new user
        const newUser = new User({
            ...userDets,
            password,
            role
        });

        await newUser.save();
        return res.status(200).json({
            message: "Congratulations! you are successfully registered",
            success: true
        }); 
    } catch (error) {
        return res.status(500).json({
            message: "Unable to create your account",
            success: false,
            error: error.message
        });
    }
};

const validateUsername = async username => {
    let user = await User.findOne({ username });
    return user ? false : true
}

const validateEmail= async email => {
    let user = await User.findOne({ email });
    return user ? false : true;
};

module.exports = {
    userRegister
}