/* eslint-disable no-undef */
const username = prompt("Username");
const socket = io();
const messageBox = document.getElementById("messageBox");
const userList = document.getElementById("userList");
const keyBox = document.getElementById("key");
const encryptToggle = document.getElementById("encryptionToggle");

socket.emit("username", username);
socket.emit("getUsers");

const createMsg = (msg, _username, toAppend) => {
  const container = document.createElement("div");
  const uname = document.createElement("div");
  const time = document.createElement("div");
  const message = document.createElement("div");

  container.className = "messageContainer";
  uname.className = "username";
  time.className = "time";
  message.className = "message";

  const now = new Date();

  message.innerText = msg;
  time.innerText = `${now.getHours()}:${now.getMinutes()}`;
  uname.innerText = _username;

  container.appendChild(uname);
  container.appendChild(time);
  container.appendChild(message);

  toAppend.append(container);
};

const createUser = (_username) => {
  const container = document.createElement("div");
  container.innerText = _username;
  return container;
};

form.addEventListener('submit', (err) => {
    err.preventDefault();
    if (input.value) {
      if (encryptToggle.checked) {
        socket.emit("msg", { msg: CryptoJS.AES.encrypt(input.value, keyBox.value).toString(), encrypted: true });
      } else {
        socket.emit("msg", { msg: input.value, encrypted: false });
      }
        input.value = "";
    }
});

socket.on("msg", (msg) => {
  if (msg.encrypted) {
    createMsg(CryptoJS.AES.decrypt(msg.msg, keyBox.value).toString(CryptoJS.enc.Utf8), msg.username, messageBox);
  } else {
    createMsg(msg.msg, msg.username, messageBox);
  }
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("userJoin", (_username) => {
  createMsg("User joined", _username, messageBox);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("userLeft", () => {
  createMsg("User Left", "", messageBox);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("disconnect", () => {
  window.location.reload();
});

socket.on("userList", (userLst) => {
  userList.innerHTML = "";
  userList.forEach(userList.append(createUser(userLst[i])));
});
