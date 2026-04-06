import { useState, useCallback } from "react";
import { Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getAllReports } from "../services/reportService";

export default function useHome() {
    const [reports, setReports] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const fadeAnim = useState(new Animated.Value(0))[0];

    useFocusEffect(
        useCallback(() => {
            loadReports();
        }, [])
    );

    const loadReports = async () => {
        const response = await getAllReports();

        if (response.ok) {
            setReports(response.data);
        } else {
            console.error("Error loading reports");
            setReports([]);
        }

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadReports();
        setRefreshing(false);
    };

    const total = reports.length;
    const high = reports.filter(r => r.priority === "high").length;
    const lastUpdate = reports.length > 0 ? 2 : 0;

    const getPriorityConfig = (priority) => {
        switch (priority) {
            case "high":
                return { color: "#dc3545", icon: "arrow-upward" };
            case "medium":
                return { color: "#ffc107", icon: "warning" };
            default:
                return { color: "#198754", icon: "arrow-downward" };
        }
    };

    return {
        reports,
        refreshing,
        fadeAnim,
        onRefresh,
        total,
        high,
        lastUpdate,
        getPriorityConfig
    };
}