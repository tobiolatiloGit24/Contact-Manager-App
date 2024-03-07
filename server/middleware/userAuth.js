// const validateToken = require("../middleware/validateTokenHandler")

const authUser = async (req) => {
    const token = req.token
    console.log("token", token)
    const tokenUser = token.user
    if (!tokenUser) {
        return { "msg": "Unauthorized" }
    }

    const tokenEmail = tokenUser.email
    const dbUser = await Users.findOne({ email: tokenEmailEmail })
    if (!dbUser) {
        return { "msg": "Unauthorized Please Login" }
    }

}


function authRole(req, res, role, next) {
    if (req.user.role !== role) {
        return res.status(401).send('Unathorized')
    }

    next()

    const token = req.token;
    userToken = token.user;
    if (!userToken) {
        return (" user is not authorized")
    }

    const tokenEmail = userToken.email
    const dbUser = User.findOne({ email: tokenEmail })
    if (!dbUser) {
        return ("User is not authorized")
    }

}


module.exports = { authRole, authUser };