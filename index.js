require('dotenv').config()
const express = require("express")
const path = require("path")
const { compileCss } = require("./js/compileCss")

const port = process.env.PORT
const app = express()

compileCss({ src: path.join(__dirname, 'views/style'), dest: path.join(__dirname, 'public')})

// app stuff
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.set('views','./views');


// Simple logging
app.use(function(req, res, next){
    console.log(`Incomming ${req.method} request from ${req.ip} at ${Date.now()}`)
    next();
})

// Stuff goes here

app.get("/", (req, res) => {
    res.render("main")
})


// 404 not found
app.get("*", (req, res) => {
    res.render("404")
})

// Pings a response back to unused stuff
app.all("*", (req, res) => { res.send(`${req.method} not supported\n`)})


// Actually start it!!!

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})