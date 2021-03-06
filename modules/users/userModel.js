const {Schema, model} = require("mongoose");

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true
        },

        role: {
            type: String,
            default: "user",
            enum: ["user", "admin", "superadmin"],
            required: [true, "Role is required"]
        },
        username: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },
    },
    {timestamps: true}
);

module.exports = model("user", userSchema);