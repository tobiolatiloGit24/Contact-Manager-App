const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const dotenv = require("dotenv").config()
const { constants } = require("../constants/constant")
const { validatePassword, confirmPassword } = require('../constants/passwordutil')
const Customer = require('../models/Customer')
const session = require('express-session')
// const validateToken = require("../middleware/validateTokenHandler")


/**
 * POST/
 *REGISTER NEW USER
 */
const registerUser = asyncHandler(async (req, res) => {

    const { firstname, lastname, email, password } = req.body;
    console.log(req.body)
    if (!firstname || !lastname || !email || !password) {
        req.flash("error", "Missing required filed to register")
        return res.redirect("/register")
    }

    if (!firstname.match(/^[A-Za-z][a-zA-Z]{3,30}$/)) {
        req.flash("error", "First Name can not be less than 3 characters")
        return res.redirect("/register")
    }
    if (!lastname.match(/^[A-Za-z][a-zA-Z]{3,30}$/)) {
        req.flash("error", "Last Name can not be less than 3 characters")
        return res.redirect("/register")
    }

    if (!email.match(/^[a-zA-Z][a-zA-Z0-9\.\-_]+@[a-z]+\.[a-z]{2,5}$/)) {
        req.flash("error", "Please fill valid email")
        return res.redirect("/register")
    }

    if (password.length < 8) {
        req.flash("error", " Password can not be less than 8 characters")
        return res.redirect("/register")
    }

    if (password.match(/["'():<>\[\]^`{-~]/)) {
        req.flash("error", " Password Must contain valid special character")
        return res.redirect("/register")
    }

    if (!password.match(/[A-Z]/)) {
        req.flash("error", " Password must contain upper case character")
        return res.redirect("/register")
    }

    if (!password.match(/[a-z]/)) {
        req.flash("error", " Password must contain lower case character")
        return res.redirect("/register")
    }

    if (!password.match(/[0-9]/)) {
        req.flash("error", "Password Must contain a number")
        return res.redirect("/register")
    }

    if (!password.match(/[_\\?@=;*-/! #-&]/)) {
        req.flash("error", "Password is missing one special character")
        return res.redirect("/register")
    }

    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        // req.flash("error")
        req.flash("error", "User already registered")
        return res.redirect("/register")
        // throw new Error("User already registered")
    }

    //Hashed Password with sortround number of 10
    const hashedpassword = await bcrypt.hash(password, 10)
    console.log("hashed password is:", hashedpassword)
    const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashedpassword,
        // confirmPassword,
        role: req.body.role,
    })
    console.log(`User created ${user}`)
    if (user) {
        req.flash("success", "Registered Successfully! Please Login.")
        return res.redirect("/register")
        // res.status(201).json({ _id: user.id, email: user.email })  
    } else {
        res.status(400)
        throw new Error("Registration failed! User data not vailid")
    }

})


/**
 * POST/
 *LOGIN USER
 */


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        req.flash("error", "Missing required filed to Login")
        return res.redirect("/login")
    }
    const user = await User.findOne({ email })

    if (!user) {
        req.flash("error", "User Not Found")
        return res.redirect("/login")
    }

    //Compare user password with hashed password
    try {
        if (!(await bcrypt.compare(password, user.password))) {
            req.flash("error", "Invalid Email or Password")
            return res.redirect("/login")
        }
        req.session.isAuth = true
        req.session.user = user
        res.redirect('/dashboard')
        console.log(req.session)
    } catch (error) {
        console.log(error)
    }
})

/**
 * GET 
 * CURRENT USER PAGE
 * 
 */
const currentUser = asyncHandler(async (req, res) => {

    res.json(req.user)
})

/**
 * POST 
 * LOGOUT USER 
 * 
 */
const logoutUser = asyncHandler(async (req, res) => {
    const session = req.session
    const userSession = session.user.id
    if (userSession) {
        req.session.destroy((err) => {
            if (err) throw err
            res.redirect('/login')
        })
    }

    // const token = req.accessToken
    // const userToken = accessToken.user.id
    // res.token("user", userToken, {
    //     expiresIn: 1
    //     // maxAge: 1
    // })
    // console.log(userToken)
    // res.redirect("/login")
})


/**
 * GET
 * REGISTER PAGE
 */
const register = asyncHandler(async (req, res) => {
    const locals = {
        title: 'Sign Up Page',
        description: "Customer Contact Management Application"
    }
    res.render('layouts/register', { layout: './layouts/register', locals, messages: req.flash() })
})
/**
 * GET
 * LOGIN PAGE
 */
const login = asyncHandler(async (req, res) => {

    const locals = {
        title: 'Login Page',
        description: "Customer Contact Management Application"
    }
    res.render('layouts/login', { layout: './layouts/login', locals, messages: req.flash() })

})

/**
 * GET/
 *Homepage
 */

// Homepage
const dashboard = async (req, res) => {

    const messages = await req.flash("message");

    const locals = {
        title: 'NodeJs Project',
        description: "Customer Contact Management Application",
    }

    let perPage = 10;
    let page = req.query.page || 1;

    try {
        const customers = await Customer.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        const count = await Customer.countDocuments({});

        res.render("index", {
            locals,
            customers,
            current: page,
            pages: Math.ceil(count / perPage),
            user: req.session.user,
            messages,
        });
    } catch (error) {
        console.log(error);
    }

    // try {
    //     const customers = await Customer.find({}).limit(22)
    //     res.render('index', { locals, customers })
    // } catch (error) {
    //     console.log(error)
    // }
}

// /**
//  * GET/
//  *Homepage
//  */

// // Homepage
// exports.dashboard = async (req, res) => {
//     const locals = {
//         title: 'NodeJs Project',
//         description: "Customer Contact Management Application"
//     }

//     let perPage = 5;
//     let page = req.query.page || 1;

//     try {
//         const customers = await Customer.aggregate([{ $sort: { createdAt: -1 } }])
//             .skip(perPage * page - perPage)
//             .limit(perPage)
//             .exec();

//         const count = await Customer.countDocuments({});

//         res.render("index", {
//             locals,
//             customers,
//             current: page,
//             pages: Math.ceil(count / perPage),
//             // messages,
//         });
//     } catch (error) {
//         console.log(error);
//     }

//     // try {
//     //     const customers = await Customer.find({}).limit(22)
//     //     res.render('index', { locals, customers })
//     // } catch (error) {
//     //     console.log(error)
//     // }
// }



module.exports = { registerUser, loginUser, currentUser, register, login, logoutUser, dashboard }



// console.log({ 'userCookie': cookie })
// res.cookie("user", user, {
//     maxAge: 1000 * 60
// })
// return res.redirect("/dashboard")

// create the signin payload

// try {
//     const accessToken = jwt.sign(
//         {
//             user: {
//                 firstname: user.firstname,
//                 email: user.email,
//                 id: user.id
//             },
//         }, process.env.ACCESS_TOKEN_SECRET,
//         { expiresIn: "10m" }
//     )
//     console.log("accessToken", accessToken)
//     // res.status(200).json({ accessToken })
//     // req.auth = "fdghjkjl"
//     // res.auth = "fdghjkjl"
//     // res.cookie("authorization", `Bearer ${accessToken}`)
//     // return res.render("index")
//     return res.redirect(`/dashboard?authorization=Bearer ${accessToken}`);
// } catch (e) {
//     console.log(e)
//     res.status(500)
// }