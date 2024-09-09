const express = require("express");
const router = express.Router();
const Url = require("../models/urlModel");

router.get('/',async(req,res)=>{
    const allUrls = await Url.find({});
    return res.render("home.ejs",
        {urls:allUrls}
    );
})

module.exports = router;