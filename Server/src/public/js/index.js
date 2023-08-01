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
