import { useEffect, useState } from "react";

export function useProfileData() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [admin, setAdmin] = useState("");
    const [cID, setcID] = useState<number | undefined>();
    useEffect(() => {
        const handleProfileData = async () => {
            try {
                const checker = await fetch(
                    "http://localhost:8080/api/sessions/loginData",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                );
                const data = await checker.json();
                if (data.status === "success") {
                    setFirstName(data.data.firstName);
                    setlastName(data.data.lastName);
                    setEmail(data.data.email);
                    setcID(data.data.cartID);
                    const admin = data.data.admin.toString();
                    setAdmin(admin);
                }
            } catch (e) {
                console.log(e);
            }
        };
        handleProfileData();
    }, []);

    return { firstName, lastName, email, admin, cID };
}
