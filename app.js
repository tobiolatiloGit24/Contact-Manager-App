const express = require('express')
require('dotenv').config()
const methodOveride = require('method-override')
const connectDB = require('./config/db')
const jwt = require("jsonwebtoken")
const errorHandler = require("./server/middleware/errorHandler")
const expressLayout = require('express-ejs-layouts')
const flash = require('connect-flash')
const expressFlash = require('express-flash')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")


const app = express()
const port = 5000 || process.env.PORT

// connect to Data Base
connectDB()

// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser("secret"))
app.use(express.json())
app.use(methodOveride("_method"))
app.use(bodyParser.json())

// Static File
app.use(express.static('public'));

// Express Session  
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 10,
        }
    }))


// Flash Message
app.use(flash())
app.use(expressFlash())

// Temlate Engine
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')



// Routes
// app.use("/customer", require("./server/routes/customer"))
app.use("/", require("./server/routes/customer"))
app.use("/", require("./server/routes/user"))
app.use(errorHandler)


app.get('/', (req, res) => {
    const locals = {
        title: 'Contact Application',
        description: "Customer Contact Management Application"
    }
    res.render('layouts/home', { locals, layout: './layouts/home' })
})

// Handle 404
app.get('*', (req, res) => {
    res.status(404).render('layouts/404', { layout: './layouts/404' })
})


app.listen(port, () => {
    console.log(`Application running on port: ${port}`)
})