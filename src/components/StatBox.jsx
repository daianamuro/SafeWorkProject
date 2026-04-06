import { StyleSheet, Text, View } from "react-native";

export default function StatBox({ title, value }) {
    return (
        <View style={styles.box}>
            <Text style={styles.label}>{title}</Text>
            <Text style={styles.number}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        alignItems: "center",
    },
    label: {
        fontSize: 12,
        color: "#6c757d",
    },
    number: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1f2a7a",
        marginTop: 5,
    },
});