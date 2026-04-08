import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActionButton from "../components/ActionButton";
import Card from "../components/Card";
import Input from "../components/Input";
import { guardarToken } from "../helpers/getToken";
import { useLogin } from "../hooks/useLogin";
import { login } from "../services/loginService";

export default function LoginScreen({ navigation }) {
  const { email, setEmail, password, setPassword, handleLoginBtn } = useLogin();

  const onLogin = async () => {
    try {
      console.log("Login button pressed");

      if (!handleLoginBtn()) return;

      const res = await login(email, password);
      console.log("Login response:", res);

      const token = res?.token;

      if (token) {
        await guardarToken("JWTToken", token);

        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      } else {
        const localUsers = await AsyncStorage.getItem("users");
        const users = localUsers ? JSON.parse(localUsers) : [];

        const found = users.find(
          (u) => u.email === email && u.password === password
        );

        if (found) {
          alert("Offline login successful");

          await guardarToken("JWTToken", found.token || "offline-token");

          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        } else {
          alert(
            res?.error
              ? "Login failed or no connection available"
              : "Login failed: user not found"
          );
        }
      }
    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);
      alert("Login failed, please check your credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      <View style={styles.heroIcon}>
        <MaterialCommunityIcons name="shield-account" size={30} color="#1f2a7a" />
      </View>

      <Text style={styles.title}>Welcome back</Text>

      <Card>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </Card>

      <Card>
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />
      </Card>

      <View style={styles.actionsRow}>
        <ActionButton
          title="Login"
          icon="login"
          color="#1f2a7a"
          onPress={onLogin}
        />
      </View>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("SignUp")}
      >
        <MaterialCommunityIcons name="account-plus" size={18} color="#1f2a7a" />
        <Text style={styles.secondaryText}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#7fa1b3",
    justifyContent: "center",
  },

  logo: {
    width: 160,
    height: 160,
    alignSelf: "center",
    marginBottom: 10,
  },

  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    elevation: 4,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },

  secondaryButton: {
    marginTop: 14,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 3,
    gap: 8,
  },

  secondaryText: {
    color: "#1f2a7a",
    fontWeight: "600",
  },
});
