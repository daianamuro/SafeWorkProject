import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { getAllReports } from "../services/reportService";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
    const navigation = useNavigation();
    
    const [reports, setReports] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadReports();
        }, [])
    );

    const loadReports = async () => {
        const data = await getAllReports();
        setReports(data);
    };

    // Métricas
    const total = reports.length;
    const high = reports.filter(r => r.priority === "high").length;
    const lastUpdate = reports.length > 0 ? "Hoy" : "-";

    return (
        <View style={styles.container}>
            
            <Text style={styles.logo}>SafeWork</Text>
            <Text style={styles.title}>All reports</Text>

            {/* 📊 RESUMEN */}
            <View style={styles.stats}>
                <Text>High: {high}</Text>
                <Text>Total: {total}</Text>
                <Text>Last update: {lastUpdate}</Text>
            </View>

            {/* Lista */}
            <FlatList
                data={reports}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.priority}>
                            Priority: {item.priority}
                        </Text>
                        <Text style={styles.report}>
                            Report: {item.title}
                        </Text>
                        <Text style={styles.user}>
                            Created by: {item.user?.name}
                        </Text>
                    </View>
                )}
            />

            {/* Botón para crear reporte */}
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate("CreateReport")}
            >
                <Text style={styles.buttonText}>+ CREATE</Text>
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
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    stats: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    priority: {
        fontWeight: "bold",
    },
    report: {
        fontSize: 16,
    },
    user: {
        color: "gray",
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
});