import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Input({
    label,
    value,
    onChangeText,
    multiline = false,
    editable = true,
    placeholder = "",
    secureTextEntry = false,
    autoCapitalize = "sentences",
    keyboardType = "default"
}) {
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, multiline && { height: 100 }]}
                value={value}
                onChangeText={onChangeText}
                editable={editable}
                multiline={multiline}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 12,
        color: "#6c757d",
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#f8f9fa",
        borderRadius: 10,
        padding: 10,
    },
});
