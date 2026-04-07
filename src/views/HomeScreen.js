import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
    Animated,
    FlatList,
    Image,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import StatBox from "../components/StatBox";
import useHome from "../hooks/useHome";

export default function HomeScreen() {
    const navigation = useNavigation();

    const {
        reports,
        refreshing,
        fadeAnim,
        onRefresh,
        total,
        high,
        lastUpdate,
        getPriorityConfig
    } = useHome();

    return (
        <View style={styles.container}>

            {/* Logo */}
            <Image
                source={require("../../assets/images/logo.png")}
                style={styles.logo}
            />

            <Text style={styles.title}>All reports</Text>

            {/* Stats */}
            <View style={styles.statsContainer}>
                <StatBox title="High Priority" value={high} />
                <StatBox title="Total Reports" value={total} />
                <StatBox title="Last Update (mins)" value={lastUpdate} />
            </View>

            {/* Header */}
            <View style={styles.tableHeader}>
                <Text style={styles.headerText}>Priority</Text>
                <Text style={styles.headerText}>Report</Text>
                <Text style={styles.headerText}>Created by</Text>
            </View>

            {/* List */}
            <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                <FlatList
                    data={reports}
                    keyExtractor={(item, index) => item.id ?? index.toString()}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No reports yet</Text>
                    }
                    renderItem={({ item }) => {
                        const config = getPriorityConfig(item.priority);

                        return (
                            <TouchableOpacity
                                style={[styles.row, { borderLeftColor: config.color }]}
                                onPress={() =>
                                    navigation.navigate("ReportDetail", { id: String(item.id) })
                                }
                            >
                                {/* Priority */}
                                <View style={styles.cell}>
                                    <MaterialIcons
                                        name={config.icon}
                                        size={18}
                                        color={config.color}
                                    />
                                    <Text style={styles.cellText}>
                                        {item.priority}
                                    </Text>
                                </View>

                                {/* Report */}
                                <View style={styles.cell}>
                                    <Text style={styles.cellText}>
                                        {item.title}
                                    </Text>
                                </View>

                                {/* Created by */}
                                <View style={styles.cell}>
                                    <Text style={styles.cellText}>
                                        {item.user?.name ?? "Unknown"}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </Animated.View>

            {/* Floating Button */}
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => navigation.navigate("CreateReport")}
            >
                <View style={styles.iconCircle}>
                    <MaterialCommunityIcons name="plus" size={18} color="#1f2a7a" />
                </View>
                <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#7fa1b3",
    },

    logo: {
        width: 200,
        height: 200,
        alignSelf: "center",
        marginBottom: 10,
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
    },

    // Stats
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        elevation: 3,
    },

    // Table
    tableHeader: {
        flexDirection: "row",
        marginBottom: 5,
    },

    headerText: {
        flex: 1,
        fontWeight: "bold",
        fontSize: 13,
        color: "#495057",
        textAlign: "center",
    },

    row: {
        flexDirection: "row",
        padding: 12,
        marginBottom: 8,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderLeftWidth: 5,
        elevation: 2,
    },

    cell: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    cellText: {
        flex: 1,
        textAlign: "center",
        fontSize: 13,
    },

    emptyText: {
        textAlign: "center",
        marginTop: 30,
        color: "#6c757d",
    },

    // Button
    floatingButton: {
        position: "absolute",
        bottom: 25,
        right: 20,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1f2a7a",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 30,
        elevation: 6,
    },

    iconCircle: {
        backgroundColor: "#fff",
        borderRadius: 20,
        width: 28,
        height: 28,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 6,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});