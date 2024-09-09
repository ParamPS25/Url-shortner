const express = require("express");
const router = express.Router();
const Url = require("../models/urlModel");

router.get('/',async(req,res)=>{
    const allUrls = await Url.find({});
    return res.render("home.ejs",
        {urls:allUrls}
    );
})

router.get('/signup',async(req,res)=>{
    res.render("signup.ejs")
})

router.get('/login',async(req,res)=>{
    res.render("login.ejs")
})

module.exports = router;