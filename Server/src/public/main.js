function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value.trim();

    if (message !== "") {
        const chatBox = document.getElementById("chatBox");
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", "user-message");
        messageDiv.innerHTML = `<div class="message-text">${message}</div>`;
        chatBox.appendChild(messageDiv);

        messageInput.value = "";
    }
}
