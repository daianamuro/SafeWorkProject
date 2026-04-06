import { useState } from "react";
import { validate } from "../helpers/Regex";

export const useRegister = () => {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const handleRegisterBtn = () => {
        if (!name || !lastname || !email || !password || !role) {
            alert("Llena todos los campos");
            return false;
        }

        if (!validate("email", email)) {
            alert("Correo inválido");
            return false;
        }

        if (!validate("password", password)) {
            alert("Contraseña inválida");
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