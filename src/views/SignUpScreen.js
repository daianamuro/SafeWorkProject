import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActionButton from "../components/ActionButton";
import Card from "../components/Card";
import Input from "../components/Input";
import { useRegister } from "../hooks/useRegister";
import { register } from "../services/registerService";

export default function SignUpScreen({ navigation }) {
  const {
    name,
    setName,
    lastname,
    setLastname,
    email,
    setEmail,
    password,
    setPassword,
    confirm,
    setConfirm,
    handleRegisterBtn
  } = useRegister();

  const saveUserOffline = async (user) => {
    try {
      const existing = await AsyncStorage.getItem("users");
      const users = existing ? JSON.parse(existing) : [];

      // evitar duplicados por email
      const filtered = users.filter(u => u.email !== user.email);

      filtered.push(user);

      await AsyncStorage.setItem("users", JSON.stringify(filtered));

      console.log("Usuarios guardados:", filtered);
    } catch (error) {
      console.error("Error saving offline user:", error);
    }
  };
  
  const onRegister = async () => {
    if (!handleRegisterBtn()) return;

    const user = { name, lastname, email, password };
    console.log("Sending user:", user);

    try {
      const res = await register(user);
      console.log("Register response:", res);

      if (res.ok) {
        alert("Registration successful");
        await saveUserOffline({ ...user, token: res.data?.token });
        navigation.replace("Login");
      } else {
        alert(res.error || "Registration failed");
      }
    } catch (_error) {
      alert("Error while registering");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />

        <View style={styles.heroIcon}>
          <MaterialCommunityIcons name="account-star" size={30} color="#1f2a7a" />
        </View>

        <Text style={styles.title}>Create your account</Text>

        <Card>
          <Input
            label="First name"
            value={name}
            onChangeText={setName}
            placeholder="Enter your first name"
          />
        </Card>

        <Card>
          <Input
            label="Last name"
            value={lastname}
            onChangeText={setLastname}
            placeholder="Enter your last name"
          />
        </Card>

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
            placeholder="Create a password"
            secureTextEntry
          />
        </Card>

        <Card>
          <Input
            label="Confirm"
            value={confirm}
            onChangeText={setConfirm}
            placeholder="Confirm your password"
          />
        </Card>

        <View style={styles.actionsRow}>
          <ActionButton
            title="Sign Up"
            icon="person-add"
            color="#1f2a7a"
            onPress={onRegister}
          />
        </View>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("Login")}
        >
          <MaterialCommunityIcons name="login" size={18} color="#1f2a7a" />
          <Text style={styles.secondaryText}>Back to login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#7fa1b3",
  },

  logo: {
    width: 160,
    height: 160,
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 12,
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
    marginBottom: 24,
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
