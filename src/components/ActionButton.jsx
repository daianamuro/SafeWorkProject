import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ActionButton({ title, icon, color, onPress }) {
    return (
        <TouchableOpacity 
            style={[styles.button, { backgroundColor: color }]} 
            onPress={onPress}
        >
            <MaterialIcons name={icon} size={18} color="#fff" />
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 14,
        borderRadius: 30,
        marginHorizontal: 5,
        gap: 5,
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
    },
});