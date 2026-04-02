import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { createReport } from "../services/reportService";
import { useNavigation } from "@react-navigation/native";

export default function CreateReportScreen() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");

    const navigation = useNavigation();

    const handleCreate = async () => {
        if (!title || !description) {
            alert("Completa todos los campos");
            return;
        }

        const newReport = {
            title,
            description,
            priority
        };

        const response = await createReport(newReport);

        if (response) {
            alert("Reporte creado");
            navigation.navigate("Home");
        } else {
            alert("Error");
        }
    };

    return (
        <View style={styles.container}>
            
            <Text style={styles.logo}>SafeWork</Text>
            <Text style={styles.title}>Create a new report</Text>

            <Text>Title:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter title"
                value={title}
                onChangeText={setTitle}
            />

            <Text>Priority:</Text>
            <View style={styles.row}>
                {["high", "medium", "low"].map(p => (
                    <TouchableOpacity
                        key={p}
                        style={[
                            styles.priorityBtn,
                            priority === p && styles.active
                        ]}
                        onPress={() => setPriority(p)}
                    >
                        <Text>{p}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text>Description:</Text>
            <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Enter description"
                value={description}
                onChangeText={setDescription}
                multiline
            />

            <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
                <Text style={styles.btnText}>CREATE</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.cancel}>CANCEL</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    logo: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        marginBottom: 15,
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    priorityBtn: {
        padding: 10,
        backgroundColor: "#ddd",
        borderRadius: 8,
        width: "30%",
        alignItems: "center",
    },
    active: {
        backgroundColor: "#1f2a7a",
        color: "#fff",
    },
    createBtn: {
        backgroundColor: "#1f2a7a",
        padding: 15,
        borderRadius: 20,
        alignItems: "center",
        marginTop: 10,
    },
    btnText: {
        color: "#fff",
        fontWeight: "bold",
    },
    cancel: {
        textAlign: "center",
        marginTop: 15,
    },
});