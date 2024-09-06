const mongoose = require("mongoose");
const Url = require("./models/urlModel");
const express = require("express");
const bodyParser = require("body-parser");
const urlRoutes = require("./routes/urlRoutes");

const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/urldb");

app.use("/api",urlRoutes);

app.get('/api/url/:shortId',async(req,res)=>{
    shortId = req.params.shortId;
    const newEntry = await Url.findOneAndUpdate(
        {shortId},{ $push: {visitHistory:{timestamp:Date.now()}} }); 

    res.redirect(newEntry.OriginalUrl)
});

app.listen(8080,()=>console.log("server started"))