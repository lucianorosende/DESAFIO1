const socket = io();

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

socket.on("messageHistory", (messages) => {
    const chatBox = document.getElementById("chatBox");
    messages.forEach((message) => {
        const messageDiv = document.createElement("div");
        messageDiv.textContent = message.message;
        messageDiv.classList.add("chat-message");
        if (chatBox === null) {
            return;
        } else {
            chatBox.appendChild(messageDiv);
        }
    });
});

socket.on("messages", async (data) => {
    const chatBox = document.getElementById("chatBox");
    const messageDiv = document.createElement("div");
    messageDiv.textContent = data.message;
    messageDiv.classList.add("chat-message");
    if (chatBox === null) {
        return;
    } else {
        chatBox.appendChild(messageDiv);
    }
});
