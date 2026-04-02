import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";

export const useRegister = () => {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const handleRegisterBtn = async () => {
        if (name.trim() === "" || lastname.trim() === "" || email.trim() === "" || password.trim() === "" || role.trim() === "") {
            return alert("Llene todos los campos");
        }

        const user = { name, lastname, email, password, role };
        const texto = JSON.stringify(user);

        try {
            let usuarios = await AsyncStorage.getItem('usuarios');
            usuarios = usuarios ? JSON.parse(usuarios) : [];
            usuarios.push(user);
            await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
            alert("Datos guardados correctamente");

            // Limpiar inputs
            setName(""); setLastname(""); setEmail(""); setPassword(""); setRole("");
        } catch(e) {
            console.error("Error guardando usuario:", e);
        }
    }

    return { name, setName, lastname, setLastname, email, setEmail, password, setPassword, role, setRole, handleRegisterBtn };
}