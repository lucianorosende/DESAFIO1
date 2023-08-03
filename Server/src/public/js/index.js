function handleClick(pid, cid) {
    fetch(`/api/carts/${cid}/product/${pid}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            // Handle the response data if needed
            console.log("Response data:", data);
        })
        .catch((error) => {
            // Handle any errors that occurred during the fetch request
            console.error("Fetch error:", error);
        });
}

function deleteResource(pID) {
    fetch(`/api/products/${pID}`, {
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
