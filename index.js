require("dotenv").config();
const PORT = process.env.PORT || 4000;
const express = require("express");
// connect mongodb
const database = require("./src/database");
const User = require("./src/models/user");


const app = express();



app.listen(PORT,()=>{
    console.log("Server is running...");
})
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//start session
const session = require("express-session");
app.use(session({
    resave:true,
    saveUninitialized: true,
    secret:"t2203e",
    cookie: {
        maxAge: 3600000, //miliseconds
        // secure: true
    }
}))

const userRouter = require("./src/routes/user.route");
app.use("/users",userRouter);

// const authRouter = require ("./src/routes/auth.route");
// app.use("/auth",authRouter);
