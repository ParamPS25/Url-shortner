const{getUser} = require("../services/auth")

async function restrictToLoggedinUsersOnly(req,res,next){

    const user_uid = req.cookies?.uid; //as named our cookie "uid" also installed cookie parser for it
    
    if(!user_uid) return res.redirect("/login");

    const user =  getUser(user_uid);
    if(!user) return res.redirect("/login");

    // as middleware can add req,res object properties so,
    req.user = user; //If a valid user is found, their information is attached to the req object. This makes the user information available to subsequent middleware and route handlers.
    next();
}

module.exports ={
    restrictToLoggedinUsersOnly,
}