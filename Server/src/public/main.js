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

function checkout(cID, email) {
    fetch(`http://localhost:8080/api/carts/${cID}/purchase/${email}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log("data:", data);
            // Do something with the response data if needed
        })
        .catch((error) => {
            console.error("Error:", error);
            // Handle the error appropriately
        });
}
