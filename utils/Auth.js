const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {SECRET} = require("../config");

/**
 * @DESC To register the user (ADMIN, SUPPER_ADMIN, USER)
*/
async function userRegister (userDets, role, res){
    
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
        const password = await bcrypt.hash(userDets.password, 10)

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

async function userLogin(userDetails, role, res) {

    try {
        const user = await User.findOne({ "username": userDetails.username });
        const userInputPassword = userDetails.password;
        const isMatch = bcrypt.compareSync(userInputPassword, user.password);

        if (!user) {
            return res.status(404).json({
                message: "User not found. Invalid login credentials",
                success: false
            })
        }

        if (user.role != role) {
            return res.status(404).json({
                message: "Your role does not allow you to access this resource",
                success: false
            })
        }

        /** Check if user exist and passwords match or not*/
        if (user && isMatch) {
            
            const token = jwt.sign({
                user_id: user._id,
                username: user.modelName,
                role: user.role,
                email: user.email,
            }, SECRET, { expiresIn: "7 days"});

            return res.status(200).json({
                message: "You have successfully logged in",
                user: user,
                token: token,
                expiresIn: 168,
            });

        } else {
            return res.status(401).json({
                message: "Invalid username or password",
                success: false,
        
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            message: "Error occured during login",
            success: false,
            error: error.message
        });
    }
}


const validateUsername = async username => {
    let user = await User.findOne({ username });
    return user ? false : true
}

const validateEmail= async email => {
    let user = await User.findOne({ email });
    return user ? false : true;
};

module.exports = {
    userRegister, userLogin
}