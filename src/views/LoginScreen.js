import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useLogin } from "../hooks/useLogin";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
    const { email, setEmail, password, setPassword, handleLoginBtn } = useLogin();
    const navigation = useNavigation();

    const probarLogin = async () => {
        if (!handleLoginBtn()) return;

        const respuesta = await login(email, password);

        if (respuesta.token) {
            alert("Home");
        } else {
            alert("Error 👎");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                
                <Text style={styles.title}>Login</Text>

                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />

                <TouchableOpacity style={styles.button} onPress={probarLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                {/* Botón para ir a register */}
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text style={styles.link}>Don't have an account? Register</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#7fa1b3",
    },
    card: {
        width: "85%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#1f2a7a",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    link: {
        textAlign: "center",
        marginTop: 10,
    },
});