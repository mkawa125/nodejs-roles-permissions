const cors = require("cors");
const exp = require("express");
const bp = require("body-parser");
const {connect} = require("mongoose");
const {success} = require("consola");

// Bring in the app constants
const {DB, PORT} = require("./config");

// Initialize the application
const app = exp();

app.listen(PORT, () => 
    success({message: `Server started on port ${PORT}`, badge: true})
)