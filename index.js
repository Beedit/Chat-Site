require('dotenv').config()
const express = require("express")
const path = require("path")
const { compileCss } = require("./js/compileCss")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)


const port = process.env.PORT

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

app.post("/message", (req, res) => {
    console.log(req.body.message)
    res.send("Recieved\n")
})

// 404 not found
app.get("*", (req, res) => {
    res.render("404")
})

// Pings a response back to unused stuff
app.all("*", (req, res) => { res.send(`${req.method} not supported\n`)})

// Socket.io Stuff
io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("disconnect", () => {
        console.log("User disconnected")
        io.emit("userLeft")
    })

    socket.on("msg", (msg) => {
        console.log(`${msg.username}: ${msg.msg}`);
        io.emit("msg", {msg: msg.msg, username: msg.username})
      });
    
    socket.on("username", (username) => {
        io.emit("userJoin", username)
    })
});

// Actually start it!!!
server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
