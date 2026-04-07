import api, { ENDPOINTS } from '../models/api';

// GET ALL
export const getAllReports = async () => {
    try {
        const res = await api.get(ENDPOINTS.getAllReports);
        return { ok: true, data: res.data };
    } catch (error) {
        console.error("Error cargando reportes:", error?.response?.data || error.message);
        return { 
            ok: false,
            data: [],
            error: error?.response?.data || "Error desconocido"
        };
    }
};

// CREATE
export const createReport = async (report) => {
    try {
        const res = await api.post(ENDPOINTS.createReport, report);
        return { ok: true, data: res.data };
    } catch (error) {
        console.error("Error creando reporte:", error?.response?.data || error.message);
        return { ok: false, data: null, error: error?.response?.data || "Error desconocido" };
    }
};

// GET BY ID
export const getReportById = async (id) => {
    try {
        const res = await api.get(ENDPOINTS.getReportById(id));
        return { ok: true, data: res.data };
    } catch (error) {
        console.error("Error obteniendo reporte:", error?.response?.data || error.message);
        return { ok: false, data: null, error: error?.response?.data || "Error desconocido" };
    }
};

// DELETE
export const deleteReport = async (id) => {
    try {
        await api.delete(ENDPOINTS.deleteReport(id));
        return { ok: true };
    } catch (error) {
        console.error("Error eliminando:", error?.response?.data || error.message);
        return { ok: false, error: error?.response?.data || "Error desconocido" };
    }
};

// UPDATE
export const updateReport = async (id, data) => {
    try {
        const res = await api.put(ENDPOINTS.updateReport(id), data);
        return { ok: true, data: res.data };
    } catch (error) {
        console.error("Error actualizando:", error?.response?.data || error.message);
        return { ok: false, data: null, error: error?.response?.data || "Error desconocido" };
    }
};