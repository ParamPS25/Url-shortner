const mongoose = require("mongoose");
const Url = require("./models/urlModel");
const express = require("express");
const bodyParser = require("body-parser");
const urlRoutes = require("./routes/urlRoutes");
const staticRoutes = require("./routes/StaticRoutes");
const path = require("path");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/urldb2");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine',"ejs");
app.set("views",path.resolve(("./views")));

app.use("/",staticRoutes);

app.use("/api",urlRoutes);

app.get('/api/url/:shortId',async(req,res)=>{
    shortId = req.params.shortId;
    const newEntry = await Url.findOneAndUpdate(
        {shortId},{ $push: {visitHistory:{timestamp:Date.now()}} }); 

    res.redirect(newEntry.originalUrl)
});

app.listen(8080,()=>console.log("server started"))