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

function deleteResourceFromCart(cID, pID) {
    fetch(`/api/carts/${cID}/products/${pID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json", // Replace with the appropriate content type if needed
            // Include any other required headers here (e.g., authentication tokens)
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Resource deleted:", data);
            // Do something with the response data if needed
        })
        .catch((error) => {
            console.error("Error deleting resource:", error);
            // Handle the error appropriately
        });
}

function deleteAccount(uid) {
    fetch(`/api/users/${uid}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json", // Replace with the appropriate content type if needed
            // Include any other required headers here (e.g., authentication tokens)
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Resource deleted:", data);
            // Do something with the response data if needed
        })
        .catch((error) => {
            console.error("Error deleting resource:", error);
            // Handle the error appropriately
        });
}
