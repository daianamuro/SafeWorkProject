import { useState } from "react";
import { validate } from "../helpers/Regex";

export const useLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginBtn = () => {
        if (!email || !password) {
            alert("Please fill in all fields");
            return false;
        }

        if (!validate("email", email)) {
            alert("Invalid email");
            return false;
        }

        if (!validate("password", password)) {
            alert("Invalid password. It must include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 8 characters.");
            return false;
        }

        return true;
    };

    return { email, setEmail, password, setPassword, handleLoginBtn };
};
