import { useState } from "react";
import { validate } from "../helpers/Regex";

export const useRegister = () => {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const handleRegisterBtn = () => {
        if (
            !name.trim() ||
            !lastname.trim() ||
            !email.trim() ||
            !password.trim() ||
            !role.trim()
        ) {
            alert("Please fill in all fields");
            return false;
        }

        if (!validate("email", email)) {
            alert("Invalid email");
            return false;
        }

        if (!validate("password", password)) {
            alert("Invalid password");
            return false;
        }

        return true;
    };

    return {
        name, setName,
        lastname, setLastname,
        email, setEmail,
        password, setPassword,
        role, setRole,
        handleRegisterBtn
    };
};
