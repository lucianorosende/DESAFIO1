const socket = io();

// function sendMessage() {
//     const messageInput = document.getElementById("messageInput");
//     const message = messageInput.value.trim();

//     if (message !== "") {
//         const chatBox = document.getElementById("chatBox");
//         const messageDiv = document.createElement("div");
//         messageDiv.classList.add("message", "user-message");
//         messageDiv.innerHTML = `<div class="message-text">${message}</div>`;
//         chatBox.appendChild(messageDiv);

//         messageInput.value = "";
//     }
// }

function sendMessage(email) {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value.trim();
    const date = new Date().toLocaleTimeString();
    if (message) {
        let newMsg = {
            message: message,
            author: email,
            date: date,
        };
        socket.emit("newMsg", newMsg);
        messageInput.value = "";
    }
}

const chatBox = document.getElementById("chatBox");

function appendMessage(text, isUserMessage) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");

    if (isUserMessage) {
        messageDiv.classList.add("user-message");
    } else {
        messageDiv.classList.add("other-message");
    }

    const messageText = document.createElement("div");
    messageText.classList.add("message-text");
    messageText.textContent = text;

    messageDiv.appendChild(messageText);
    chatBox.appendChild(messageDiv);
}

socket.on("messages", async (data) => {
    appendMessage(data, false);
});
