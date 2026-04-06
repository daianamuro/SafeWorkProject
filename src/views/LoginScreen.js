import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { guardarToken } from "../helpers/getToken";
import { useLogin } from "../hooks/useLogin";
import { login } from "../services/loginService";

export default function LoginScreen({ navigation }) {

    const { email, setEmail, password, setPassword, handleLoginBtn } = useLogin();

    const onLogin = async () => {
        try {
            console.log("Click");

            if (!handleLoginBtn()) return;

            const res = await login(email, password);
            console.log("RESPUESTA:", res);

            const token = res.token;

            if (token) {
                await guardarToken("JWTToken", token);

                // Navegación segura: reemplaza stack actual con Home
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Home" }],
                });
            } else {
                alert("Error en login: token no recibido");
            }
        } catch (error) {
            console.log("LOGIN ERROR:", error.response?.data || error.message);
            alert("Error en login, revisa tus datos");
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.card}>
                <Text style={styles.title}>Login</Text>

                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />

                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <View style={styles.buttonContainer}>
                    <Button
                        title="Login"
                        color="#0A84FF"
                        onPress={onLogin}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="No tengo una cuenta"
                    color="#0A84FF"
                    onPress={() => navigation.navigate("SignUp")}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#3A7DFF",
        justifyContent: "center",
        alignItems: "center"
    },

    card: {
        width: "80%",
        backgroundColor: "#E5E5E5",
        padding: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5
    },

    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
        fontWeight: "bold"
    },

    input: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
        marginBottom: 15
    },

    buttonContainer: {
        marginTop: 10
    }
});