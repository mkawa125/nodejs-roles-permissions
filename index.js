const cors = require("cors");
const exp = require("express");
const bp = require("body-parser");
const {connect} = require("mongoose");
const {success, error} = require("consola");

// Bring in the app constants
const {DB, PORT} = require("./config");

// Initialize the application
const app = exp();

// Middlewares
app.use(cors());
app.use(bp.json());

// User router middleware
app.use('/api/users', require("./routes/users"))

// Connection to database
const startApp = async() => {
   try {
    await connect(DB, {
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    success({
        message: `Successfully connected with the database \n${DB}`, 
        badge: true
    });
    

    app.listen(PORT, () => 
        success({message: `Server started on port ${PORT}`, badge: true})
    );
   } catch (error) {
        error({
            message: `Can not connect with the database \n${error}`, 
            badge: true
    });
    startApp();
   }
};

startApp();