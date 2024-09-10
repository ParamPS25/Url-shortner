const User = require("../models/user");
const {v4:uuidv4} = require("uuid");  //This is a destructuring assignment. It extracts the v4 function from the uuid library and assigns it to a new constant named uuidv4. This is done to give the function a more descriptive name and to make it clear that it generates UUIDs of version 4.
const {setUser,getUser} = require("../services/auth");

async function handleUserSignUp(req,res){

    const {name,email,password} = req.body;
    await User.create({
        name,
        email,
        password,
    });

    return res.redirect("/");  // so user signed up so redirect to home
}

async function handleUserLogin(req,res){

    const email = req.body.email;
    const password = req.body.password;
    const find_user = await User.findOne({
        $and: [
          { email: email },
          { password: password }
        ]
      });
      
    // if null again render login page
    if(!find_user) return res.render("login.ejs");         // so will render a view of html ie. login.ejs with response 200 on /user/login
    // if(!find_user) return res.redirect("/user/login");  // cannot redirect here as no get req on /user/login only post is it check userRoutes so rendering login.ejs 

    const sessionId = uuidv4(); //Generate a new UUID v4
    setUser(sessionId,find_user)  //forget to set User created problems... need to setUser so map session id with ref to user
    res.cookie("uid",sessionId)  //sets a cookie in the user’s browser named "uid" and value of that cookie is sessionId   

    return res.redirect("/");  // else redirect to home
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
}