import { useEffect, useState } from "react";
import { deleteReport, getReportById, updateReport } from "../services/reportService";

export default function useReport(id, navigation) {
    const [report, setReport] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReport();
    }, [id]);

    const loadReport = async () => {
        try {
            if (!id) return;

            const res = await getReportById(id);

            if (res.ok) {
                setReport(res.data);
            } else {
                console.error("Error loading report");
                setReport(null);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const response = await deleteReport(id);
        if (!response.ok) return alert("Error deleting report");

        alert("Deleted successfully");
        navigation.replace("Home");
    };

    const handleUpdate = async () => {
        if (!report?.title || !report?.description) {
            return alert("Complete all fields");
        }

        const response = await updateReport(id, report);
        if (!response.ok) return alert("Error updating");

        alert("Updated successfully");
        navigation.replace("Home");
    };

    const getPriorityConfig = (p) => {
        if (p === "high") return { color: "#dc3545", icon: "arrow-upward" };
        if (p === "medium") return { color: "#ffc107", icon: "warning" };
        return { color: "#198754", icon: "arrow-downward" };
    };

    const updateField = (field, value) => {
        setReport(prev => ({ ...prev, [field]: value }));
    };

    // CREATED DATE
    const createdDate = report?.createdAt ? new Date(report.createdAt) : null;

    const formattedDate = createdDate
        ? `${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        : "No date";

    //  UPDATED DATE
    const updatedDate = report?.updatedAt ? new Date(report.updatedAt) : null;

    const formattedUpdatedDate = updatedDate
        ? `${updatedDate.toLocaleDateString()} ${updatedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        : "No date";

    return {
        report,
        setReport,
        isEditing,
        setIsEditing,
        loading,
        handleDelete,
        handleUpdate,
        getPriorityConfig,
        updateField,
        formattedDate,
        formattedUpdatedDate
    };
}