const Url = require("../models/urlModel");
//const {nanoid} = require("nanoid");

function generateRandomString() {
    const length = 8;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return String(result);
}

async function GenerateNewShortUrl(req,res){
    if(!req.body.OriginalUrl) return res.status(400).json({error:"url is required"});

    const newUrl = new Url({
        shortId : generateRandomString(),
        OriginalUrl : req.body.OriginalUrl,
        visitHistory : [],
    });
    await newUrl.save();
    res.json({id:newUrl.shortId});
}

async function getAnalytics(req,res){
    const shortId = req.params.shortId;
    if(!shortId) return res.json({err:"invalid shortId"});

    const result = await Url.findOne({shortId});

    res.json({
        totalClicks : result.visitHistory.length,
        analytics : result.visitHistory
    });
}

async function listAllUrl(req,res){
    try{
    const url = await Url.find()
    res.json(url)
    }
    catch(err){
        res.json({message:err.message})
    }
}

module.exports = {
    GenerateNewShortUrl,
    getAnalytics,
    listAllUrl
}