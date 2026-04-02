import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRegister } from "../hooks/useRegister";
import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen() {
    const {
        name, setName,
        lastname, setLastname,
        email, setEmail,
        password, setPassword,
        role, setRole,
        handleRegisterBtn
    } = useRegister();

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.card}>

                <View style={styles.row}>
                    <TextInput
                        placeholder="Enter your first name"
                        value={name}
                        onChangeText={setName}
                        style={[styles.input, styles.halfInput]}
                    />
                    <TextInput
                        placeholder="Enter your last name"
                        value={lastname}
                        onChangeText={setLastname}
                        style={[styles.input, styles.halfInput]}
                    />
                </View>

                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    placeholder="Create a password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />

                <Text style={styles.label}>Confirm your password</Text>
                <TextInput
                    placeholder="Confirm password"
                    secureTextEntry
                    style={styles.input}
                />

                <TouchableOpacity style={styles.button} onPress={handleRegisterBtn}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                {/* Ir a login */}
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.link}>
                        Already have an account? Login
                    </Text>
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
        backgroundColor: "#d9d9d9",
        padding: 20,
        borderRadius: 12,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    input: {
        backgroundColor: "#eee",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    halfInput: {
        width: "48%",
    },
    label: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    button: {
        backgroundColor: "#1f2a7a",
        padding: 15,
        borderRadius: 20,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    link: {
        textAlign: "center",
        marginTop: 15,
    },
});