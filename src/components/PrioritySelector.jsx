import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PrioritySelector({
    value,
    onChange,
    getPriorityConfig,
    disabled = false
}) {
    return (
        <View style={styles.row}>
            {["high", "medium", "low"].map(p => {
                const config = getPriorityConfig(p);
                const isActive = value === p;

                return (
                    <TouchableOpacity
                        key={p}
                        style={[
                            styles.btn,
                            { borderColor: config.color },
                            isActive && { backgroundColor: config.color }
                        ]}
                        onPress={() => !disabled && onChange(p)}
                    >
                        <MaterialIcons
                            name={config.icon}
                            size={18}
                            color={isActive ? "#fff" : config.color}
                        />
                        <Text style={[
                            styles.text,
                            { color: isActive ? "#fff" : config.color }
                        ]}>
                            {p}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    btn: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 2,
        marginHorizontal: 4,
        gap: 5,
    },
    text: {
        fontWeight: "600",
        textTransform: "capitalize",
    },
});