import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Animated } from "react-native";
import { getAllReports } from "../services/reportService";

export default function useHome() {
    const [reports, setReports] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const fadeAnim = useState(new Animated.Value(0))[0];

    // Tiempo actual para actualización automática
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // cada minuto

        return () => clearInterval(interval);
    }, []);

    const loadReports = useCallback(async () => {
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
    }, [fadeAnim]);

    useFocusEffect(
        useCallback(() => {
            loadReports();
        }, [loadReports])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await loadReports();
        setRefreshing(false);
    };

    const total = reports.length;
    const high = reports.filter(r => r.priority === "high").length;

    // LAST UPDATE REAL
    const lastUpdate = (() => {
        if (reports.length === 0) return 0;

        const latestDate = reports.reduce((latest, report) => {
            const created = report.createdAt ? new Date(report.createdAt) : null;
            const updated = report.updatedAt ? new Date(report.updatedAt) : null;

            const reportDate = updated || created;

            if (!latest) return reportDate;

            return reportDate > latest ? reportDate : latest;
        }, null);

        if (!latestDate) return 0;

        const now = currentTime;
        const diffMs = now - latestDate;
        const diffMinutes = Math.floor(diffMs / 60000);

        return Math.max(0, diffMinutes);
    })();

    const lastUpdateLabel =
        lastUpdate === 0 ? "Just now" : `${lastUpdate} min`;

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
        lastUpdate: lastUpdateLabel, 
        getPriorityConfig
    };
}
