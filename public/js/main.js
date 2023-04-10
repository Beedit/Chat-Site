let username = prompt("Username")
const socket = io();
const messageBox = document.getElementById("messageBox") 

socket.emit("username", username)

const createMsg = (msg, username, toAppend) => {
  let container = document.createElement("div")
  let uname = document.createElement("div")
  let time = document.createElement("div")
  let message = document.createElement("div")

  container.className = "messageContainer"
  uname.className = "username"
  time.className = "time"
  message.className = "message"

  let now = new Date();

  message.innerText = msg
  time.innerText = `${now.getHours()}:${now.getMinutes()}`
  uname.innerText = username

  container.appendChild(uname)
  container.appendChild(time)
  container.appendChild(message)

  toAppend.append(container)
  
}

form.addEventListener('submit', (err) => {
    err.preventDefault();
    if (input.value) {
      socket.emit("msg", {msg: input.value, username : username});
      input.value = "";
    }
});

socket.on("msg", (msg) => {
    // why doesnt it let me do let x = document.createElement("li").textContent = msg; ??? probably some actual reason that i dont know or are not smart enough to realise
    createMsg(msg.msg, msg.username, messageBox)
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on("userJoin", (username) => {
  createMsg("User joined", username, messageBox)
  window.scrollTo(0, document.body.scrollHeight);
})

socket.on("userLeft", () => {
  createMsg("User Left", "", messageBox)
  window.scrollTo(0, document.body.scrollHeight);
})