
const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId:{
        type:String,required:true,unique:true,
    },
    OriginalUrl:{
        type:String,required:true,unique:true,  
    },
    visitHistory:[{
        timestamp:{type:Number}
    }],
},{timestamps : true} //Mongoose will automatically add createdAt and updatedAt fields to your documents.
);

const Url = mongoose.model("url",urlSchema);

module.exports = Url;