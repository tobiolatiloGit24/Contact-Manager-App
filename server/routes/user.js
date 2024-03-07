const express = require('express');
const router = express.Router();
const { registerUser, loginUser, currentUser, register, login, logoutUser, dashboard } = require("../controllers/userController")
const { isAuth } = require("../middleware/validateTokenHandler")

// router.use(["/current", "/logout/id", "/dashboard"], (req, res, next) => validateToken(req, res, next))

router.get("/register", register)
router.post("/register", registerUser)

router.get("/login", login)
router.post("/login", loginUser)

router.get("/current", currentUser)
router.post("/logout/:id", logoutUser)


router.get('/dashboard', isAuth, dashboard);

module.exports = router