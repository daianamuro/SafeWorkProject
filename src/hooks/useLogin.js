import { useState } from "react";
import { validate } from "../helpers/Regex";

export const useLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginBtn = () => {
        if (!email || !password) {
            alert("Campos vacíos");
            return false;
        }

        if (!validate("email", email)) {
            alert("Correo inválido");
            return false;
        }

        if (!validate("password", password)) {
            alert("Contraseña inválida. Minimo 1 mayuscla, minuscula y numero. Minimo 8 caracteres");
            return false;
        }

        return true;
    };

    return { email, setEmail, password, setPassword, handleLoginBtn };
};