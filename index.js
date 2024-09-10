const mongoose = require("mongoose");
const Url = require("./models/urlModel");
const express = require("express");
const {restrictToLoggedinUsersOnly} = require("./middlewares/authMiddleware")

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//This middleware is used to parse cookies attached to the client request object.
const path = require("path");

const urlRoutes = require("./routes/urlRoutes");
const staticRoutes = require("./routes/StaticRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/urldb3");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine',"ejs");
app.set("views",path.resolve(("./views")));

app.use("/",staticRoutes);

app.use("/api",restrictToLoggedinUsersOnly,urlRoutes); // passing inline middleware , ensuring that all routes under /api are protected and only accessible to logged-in users

app.use("/user",userRoutes);

app.get('/api/url/:shortId',async(req,res)=>{
    shortId = req.params.shortId;
    const newEntry = await Url.findOneAndUpdate(
        {shortId},{ $push: {visitHistory:{timestamp:Date.now()}} }); 

    res.redirect(newEntry.originalUrl)
});

app.listen(8080,()=>console.log("server started"))