const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')
const session = require('express-session')



const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next()
    } else {
        res.redirect('/login')
    }
}


const parseCookie = ('/login', (res) => {
    var cookies = setCookie.parse(res, {
        decodeValues: true
    });

    cookies.forEach(console.log);
})


const authenticateUser = asyncHandler(async (req) => {
    const cookies = req.cookies
    console.log("cookies", cookies)
    const cookieUser = cookies.user
    if (!cookieUser) {
        return { "msg": "Unauthorized", "valid": false }
    }

    const cookieEmail = cookieUser.email
    const dbUser = await Users.findOne({ email: cookieEmail, "deleted": false })
    if (!dbUser) {
        return { "msg": "Unauthorized", "valid": false }
    }
    return { "valid": true, "msg": "Valid" }

})

// const validateToken = asyncHandler(async (req, res, next) => {
//     console.log("authenticating")
//     let token;
//     console.log(req.cookies)
//     let cookies = req.cookies;
//     let autHeader = null
//     if (cookies && cookies.authorization) {
//         autHeader = cookies.authorization
//     }
//     let rediectAuth = req.query.Authorization || req.query.authorization
//     if (autHeader && autHeader.startsWith("Bearer")) {
//         token = autHeader.split(" ")[1]
//         console.log(token)
//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//             console.log(decoded)
//             console.log(err)
//             if (err) {
//                 // res.status(401)
//                 res.cookie("authorization", `Bearer ${token}`, { maxAge: 0 })
//                 throw new Error("User is not Authorized")
//             }
//             req.user = decoded.user
//             if (!token) {
//                 // res.status(401)
//                 throw new Error("User not Authorized or Token not is missing")
//             }
//             res.cookie("authorization", `Bearer ${token}`, { maxAge: 1000 * 60 * 10 })

//             next()
//         })

//     } else if (rediectAuth) {
//         token = rediectAuth.split(" ")[1]
//         console.log(token)
//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//             if (err) {
//                 // res.status(401)
//                 res.cookie("authorization", `Bearer ${token}`, { maxAge: 0 })
//                 throw new Error("User is not Authorized")
//             }
//             req.user = decoded.user
//             if (!token) {
//                 // res.status(401)
//                 throw new Error("User not Authorized or Token not is missing")
//             }
//             res.cookie("authorization", `Bearer ${token}`, { maxAge: 1000 * 60 * 10 })
//             next()
//         })
//     } else {
//         throw new Error("Unauthorized")
//     }
// })

// module.exports = validateToken
module.exports = { authenticateUser, isAuth, parseCookie }