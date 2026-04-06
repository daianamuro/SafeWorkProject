import { useState } from "react";
import { createReport } from "../services/reportService";

export default function useCreate(navigation) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!title || !description || !priority) {
            alert("Complete all fields");
            return;
        }

        try {
            setLoading(true);

            const newReport = { title, description, priority };
            const response = await createReport(newReport);

            if (!response.ok) {
                return alert("Error creating report");
            }

            resetForm();
            navigation.navigate("Home");
            alert("Report created successfully");

        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setPriority("low");
    };

    const getPriorityConfig = (p) => {
        if (p === "high") return { color: "#dc3545", icon: "arrow-upward" };
        if (p === "medium") return { color: "#ffc107", icon: "warning" };
        return { color: "#198754", icon: "arrow-downward" };
    };

    return {
        title,
        setTitle,
        description,
        setDescription,
        priority,
        setPriority,
        loading,
        handleCreate,
        getPriorityConfig
    };
}