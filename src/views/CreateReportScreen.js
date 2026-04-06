import { useNavigation } from "@react-navigation/native";
import {
    Image,
    StyleSheet,
    Text,
    View
} from "react-native";

import useCreate from "../hooks/useCreate";

import ActionButton from "../components/ActionButton";
import Card from "../components/Card";
import Input from "../components/Input";
import PrioritySelector from "../components/PrioritySelector";

export default function CreateReportScreen() {
    const navigation = useNavigation();

    const {
        title,
        setTitle,
        description,
        setDescription,
        priority,
        setPriority,
        loading,
        handleCreate,
        getPriorityConfig
    } = useCreate(navigation);

    return (
        <View style={styles.container}>

            <Image
                source={require("../../assets/images/logo.png")}
                style={styles.logo}
            />

            <Text style={styles.title}>Create a new report</Text>

            <Card>
                <Input
                    label="Title"
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter title"
                />
            </Card>

            <Card>
                <Text style={styles.label}>Priority</Text>
                <PrioritySelector
                    value={priority}
                    onChange={setPriority}
                    getPriorityConfig={getPriorityConfig}
                />
            </Card>

            <Card>
                <Input
                    label="Description"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    placeholder="Enter description"
                />
            </Card>

            <View style={styles.actionsRow}>
                <ActionButton
                    title={loading ? "Creating..." : "Create"}
                    icon="check-circle"
                    color="#1f2a7a"
                    onPress={handleCreate}
                />

                <ActionButton
                    title="Cancel"
                    icon="cancel"
                    color="#dc3545"
                    onPress={() => navigation.goBack()}
                />
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
        width: 200,
        height: 200,
        alignSelf: "center",
        marginBottom: 10,
    },

    title: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: "600",
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
});