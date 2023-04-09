const socket = io();
const messageBox = document.getElementById("messageBox") 


form.addEventListener('submit', (err) => {
    err.preventDefault();
    if (input.value) {
      socket.emit("msg", input.value);
      input.value = "";
    }
});

socket.on("msg", (msg) => {
    // why doesnt it let me do let x = document.createElement("li").textContent = msg; ??? probably some actual reason that i dont know or are not smart enough to realise
    let x = document.createElement("li")
    x.textContent = msg;
    messageBox.appendChild(x)
})