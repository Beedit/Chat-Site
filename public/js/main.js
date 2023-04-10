let username = prompt("Username")
const socket = io();
const messageBox = document.getElementById("messageBox") 
const userList = document.getElementById("userList")
const keyBox = document.getElementById("key")
const encryptToggle = document.getElementById("encryptionToggle")

socket.emit("username", username)
socket.emit("getUsers")

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

const createUser = (username) => {
  let container = document.createElement("div")
  container.innerText = username
  return container
}

form.addEventListener('submit', (err) => {
    err.preventDefault();
    if (input.value) {
      if (encryptToggle.checked){
        socket.emit("msg", {msg: CryptoJS.AES.encrypt(input.value, keyBox.value).toString(), encrypted: true});
      } else {
        socket.emit("msg", {msg: input.value, encrypted: false});
      }
        input.value = "";
    }
});

socket.on("msg", (msg) => {
  if (msg.encrypted) {
    createMsg(CryptoJS.AES.decrypt(msg.msg, keyBox.value).toString(CryptoJS.enc.Utf8), msg.username, messageBox)
  } else {
    createMsg(msg.msg, msg.username, messageBox)
  }
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

socket.on("disconnect", () => {
  window.location.reload()
})

socket.on("userList", (userLst) => {
  userList.innerHTML = ""
  for(i in userLst){
    userList.append(createUser(userLst[i]))
  }
})

