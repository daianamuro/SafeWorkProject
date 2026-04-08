import api, { ENDPOINTS } from '../models/api';

// GET ALL
export const getAllReports = async () => {
    try {
        const res = await api.get(ENDPOINTS.getAllReports);
        return { ok: true, data: res.data };
    } catch (error) {
        console.error("Error loading reports:", error?.response?.data || error.message);
        return { 
            ok: false,
            data: [],
            error: error?.response?.data || "Unknown error"
        };
    }
};

// CREATE
export const createReport = async (report) => {
    try {
        const res = await api.post(ENDPOINTS.createReport, report);
        return { ok: true, data: res.data };
    } catch (error) {
        console.error("Error creating report:", error?.response?.data || error.message);
        return { ok: false, data: null, error: error?.response?.data || "Unknown error" };
    }
};

// GET BY ID
export const getReportById = async (id) => {
    try {
        const res = await api.get(ENDPOINTS.getReportById(id));
        return { ok: true, data: res.data };
    } catch (error) {
        console.error("Error getting report:", error?.response?.data || error.message);
        return { ok: false, data: null, error: error?.response?.data || "Unknown error" };
    }
};

// DELETE
export const deleteReport = async (id) => {
    try {
        await api.delete(ENDPOINTS.deleteReport(id));
        return { ok: true };
    } catch (error) {
        console.error("Error deleting report:", error?.response?.data || error.message);
        return { ok: false, error: error?.response?.data || "Unknown error" };
    }
};

// UPDATE
export const updateReport = async (id, data) => {
    try {
        const res = await api.put(ENDPOINTS.updateReport(id), data);
        return { ok: true, data: res.data };
    } catch (error) {
        console.error("Error updating report:", error?.response?.data || error.message);
        return { ok: false, data: null, error: error?.response?.data || "Unknown error" };
    }
};
