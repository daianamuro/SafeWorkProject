import { Button, Text, TextInput, View } from "react-native";
import { guardarToken } from "../helpers/security";
import { useLogin } from "../hooks/useLogin";
import { login } from "../services/loginService";

export default function LoginScreen({ navigation }) {

    const { email, setEmail, password, setPassword, handleLoginBtn } = useLogin();

    const onLogin = async () => {
        console.log("Click")
        if (!handleLoginBtn()) return;

        const res = await login(email, password);

        if (res.token) {
            await guardarToken(res.token);

            // 🔥 ir a HOME
            navigation.replace("Home");

        } else {
            alert("Error en login");
        }
    };

    return (
        <View style={{ marginTop: 50 }}>
            <Text>Login</Text>

            <TextInput placeholder="Email" value={email} onChangeText={setEmail}/>
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>

            <Button title="Login" onPress={onLogin} />
            <Button title="No tengo cuenta" onPress={() => navigation.navigate("SignUp")} />
        </View>
    );
}