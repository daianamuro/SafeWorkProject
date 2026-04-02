import { useState } from "react";

export const useLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginBtn = () => {
        if (!email || !password) {
            alert("Campos vacíos");
            return false;
        }
        return true;
    };

    return { email, setEmail, password, setPassword, handleLoginBtn };
};