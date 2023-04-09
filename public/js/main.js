const socket = io();
const messageBox = document.getElementById("messageBox") 

const createMsg = (msg, toAppend) => {
  let container = document.createElement("div")
  let username = document.createElement("div")
  let time = document.createElement("div")
  let message = document.createElement("div")

  container.className = "messageContainer"
  username.className = "username"
  time.className = "time"
  message.className = "message"

  let now = new Date();

  message.innerText = msg
  time.innerText = `${now.getHours()}:${now.getMinutes()}`
  username.innerText = "username not implemented lmao"

  container.appendChild(username)
  container.appendChild(time)
  container.appendChild(message)

  toAppend.append(container)
  
}

form.addEventListener('submit', (err) => {
    err.preventDefault();
    if (input.value) {
      socket.emit("msg", input.value);
      input.value = "";
    }
});

socket.on("msg", (msg) => {
    // why doesnt it let me do let x = document.createElement("li").textContent = msg; ??? probably some actual reason that i dont know or are not smart enough to realise
    createMsg(msg, messageBox)
    window.scrollTo(0, document.body.scrollHeight);
})