import AsyncStorage from "@react-native-async-storage/async-storage";
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

  // Guardar usuario en lista local
  const saveUserOffline = async (user) => {
    try {
      const existing = await AsyncStorage.getItem("users");
      const users = existing ? JSON.parse(existing) : [];
      users.push(user);
      await AsyncStorage.setItem("users", JSON.stringify(users));
      console.log("Usuario guardado offline");
    } catch (error) {
      console.error("Error guardando offline:", error);
    }
  };

  const onRegister = async () => {
    if (!handleRegisterBtn()) return;

    const user = { name, lastname, email, password, role };
    console.log("ENVIANDO:", user);

    try {
      const res = await register(user);
      console.log("RESPUESTA:", res);

      if (res.token || res.success) {
        alert("Registro exitoso");

        // Guardar también en local
        await saveUserOffline({ ...user, token: res.token });

        navigation.replace("Login");
      } else {
        alert("Error en registro");
      }
    } catch (error) {
      alert("Error al registrar");
    }
  };

  return (
    <View style={{ marginTop: 50, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Registro</Text>

      <TextInput placeholder="Nombre" value={name} onChangeText={setName} />
      <TextInput placeholder="Apellido" value={lastname} onChangeText={setLastname} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput placeholder="Role" value={role} onChangeText={setRole} />

      <Button title="Registrarse" onPress={onRegister} />
    </View>
  );
}