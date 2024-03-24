export const handleGithubLogin = async () => {
    try {
        const response = await fetch(
            "http://localhost:8080/api/sessions/github",
            {
                method: "GET",
                headers: {
                    "Content-Type": "Access-Control-Allow-Origin",
                },
                credentials: "include",
            }
        );
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json(); // Parse the response as JSON
        console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
