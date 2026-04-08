import { Image, StyleSheet, Text, View } from "react-native";
import useReport from "../hooks/useReport";

import ActionButton from "../components/ActionButton";
import Card from "../components/Card";
import Input from "../components/Input";
import PrioritySelector from "../components/PrioritySelector";

export default function ReportDetailScreen({ route, navigation }) {
    const { id } = route.params ?? {};

    const {
        report,
        isEditing,
        setIsEditing,
        loading,
        handleDelete,
        handleUpdate,
        getPriorityConfig,
        updateField,
        formattedDate,
        formattedUpdatedDate,
        hasBeenUpdated
    } = useReport(id, navigation);

    if (loading) return <Text style={styles.status}>Loading...</Text>;
    if (!report) return <Text style={styles.status}>Report not found</Text>;

    return (
        <View style={styles.container}>

            <Image
                source={require("../../assets/images/logo.png")}
                style={styles.logo}
            />

            <Text style={styles.title}>Report detail</Text>

            <Card>
                <Input
                    label="Title"
                    value={report.title}
                    onChangeText={(text) => updateField("title", text)}
                    editable={isEditing}
                />
            </Card>

            <Card>
                <Text style={styles.label}>Priority</Text>
                <PrioritySelector
                    value={report.priority}
                    onChange={(p) => updateField("priority", p)}
                    getPriorityConfig={getPriorityConfig}
                    disabled={!isEditing}
                />
            </Card>

            <Card>
                <Input
                    label="Description"
                    value={report.description}
                    onChangeText={(text) => updateField("description", text)}
                    multiline
                    editable={isEditing}
                />
            </Card>

            <Card>
                <Text>Created by: {report.user?.name ?? "Unknown"}</Text>
                <Text>Created at: {formattedDate}</Text>
                {hasBeenUpdated && (
                    <Text>Updated at: {formattedUpdatedDate}</Text>
                )}
            </Card>

            <View style={styles.actionsRow}>
                {!isEditing ? (
                    <>
                        <ActionButton
                            title="Edit"
                            icon="edit"
                            color="#1f2a7a"
                            onPress={() => setIsEditing(true)}
                        />
                        <ActionButton
                            title="Delete"
                            icon="delete"
                            color="#dc3545"
                            onPress={handleDelete}
                        />
                    </>
                ) : (
                    <>
                        <ActionButton
                            title="Save"
                            icon="check-circle"
                            color="#1f2a7a"
                            onPress={handleUpdate}
                        />
                        <ActionButton
                            title="Cancel"
                            icon="close"
                            color="#dc3545"
                            onPress={() => setIsEditing(false)}
                        />
                    </>
                )}
            </View>

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
        width: 160,
        height: 160,
        alignSelf: "center",
        marginBottom: 10,
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
    },

    label: {
        fontSize: 12,
        color: "#6c757d",
        marginBottom: 5,
    },

    actionsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        gap: 10,
    },

    status: {
        marginTop: 50,
        textAlign: "center",
        fontSize: 16,
    },
});
