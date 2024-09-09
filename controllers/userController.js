const User = require("../models/user");

async function handleUserSignUp(req,res){

    const {name,email,password} = req.body;
    await User.create({
        name,
        email,
        password,
    });

    return res.redirect("/");  // so user signed up so render home.ejs
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
    if(!find_user) return res.render("login.ejs",{
            error:"invalid user or password"
        });

    return res.redirect("/");  // else redirect to home
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
}