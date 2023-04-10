require('dotenv').config()
const express = require("express")
const path = require("path")
const { compileCss } = require("./js/compileCss")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const { remove, randomID } = require("./js/helpers.js")

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


// 404 not found
app.get("*", (req, res) => {
    res.render("404")
})

// Pings a response back to unused stuff
app.all("*", (req, res) => { res.send(`${req.method} not supported\n`)})

// Socket.io Stuff

let users = []

io.on("connection", (socket) => {
    let uname = "Unknown User " + randomID(10)
    console.log("User connected");

    users.push(uname);

    socket.on("disconnect", () => {
        console.log(`${uname} disconnected`)
        io.emit("userLeft")
        users = remove(users, uname)
        io.emit("userList", users)
    })

    socket.on("msg", (msg) => {
        console.log(`${msg.username}: ${msg.msg}`);
        io.emit("msg", {msg: msg.msg, username: msg.username})
      });
    
    socket.on("username", (username) => {
        if (username == "") {
            socket.disconnect()
        } else {
            io.emit("userJoin", username)
            users[users.indexOf(uname)] = username
            uname = username
            console.log(`A user set ${uname} as their username`)
        }
    })

    socket.on("getUsers", () => {
        io.emit("userList", users)
    })
});

// Actually start it!!!
server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

/*
user0
user0 user1
user0 name2
name2
name2 user1
user1
user1 user1 */