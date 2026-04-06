import { Button, Text, TextInput, View } from "react-native";
import { useRegister } from "../hooks/useRegister";
import { register } from "../services/registerService";

export default function SignUpScreen({ navigation }) {

    const {
        name, setName,
        lastname, setLastname,
        email, setEmail,
        password, setPassword,
        role, setRole,
        handleRegisterBtn
    } = useRegister();

    const onRegister = async () => {
        console.log("Click")

        if (!handleRegisterBtn()) return;

        const user = { name, lastname, email, password, role };
        console.log("ENVIANDO:", user);

        const res = await register(user);

        if (res.token || res.success) {
            alert("Registro exitoso ");
            navigation.replace("Login");
        } else {
            alert("Error en registro");
        }
    };

    return (
        <View style={{ marginTop: 50 }}>
            <Text>Registro</Text>

            <TextInput placeholder="Nombre" value={name} onChangeText={setName} />
            <TextInput placeholder="Apellido" value={lastname} onChangeText={setLastname} />
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <TextInput placeholder="Role" value={role} onChangeText={setRole} />

            <Button title="Registrarse" onPress={onRegister} />
        </View>
    );
}