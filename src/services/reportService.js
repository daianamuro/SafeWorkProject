import AsyncStorage from '@react-native-async-storage/async-storage';

const REPORTS_STORAGE_KEY = 'reports';

const readReports = async () => {
    const storedReports = await AsyncStorage.getItem(REPORTS_STORAGE_KEY);
    return storedReports ? JSON.parse(storedReports) : [];
};

const writeReports = async (reports) => {
    await AsyncStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(reports));
};

// GET ALL
export const getAllReports = async () => {
    try {
        const data = await readReports();
        return { ok: true, data };
    } catch (error) {
        console.error("Error cargando reportes:", error);
        return { ok: false, data: [], error };
    }
};

// CREATE
export const createReport = async (report) => {
    try {
        const reports = await readReports();

        const now = new Date().toISOString();

        const newReport = {
            id: Date.now().toString(),
            title: report.title,
            description: report.description,
            priority: report.priority ?? "low",
            user: report.user ?? { name: "Local User" },
            createdAt: now,
            updatedAt: null
        };

        reports.push(newReport);
        await writeReports(reports);

        return { ok: true, data: newReport };
    } catch (error) {
        console.error("Error creando reporte:", error);
        return { ok: false, data: null, error };
    }
};

// GET BY ID
export const getReportById = async (id) => {
    try {
        const reports = await readReports();
        const report = reports.find(r => String(r.id) === String(id));

        return { ok: true, data: report ?? null };
    } catch (error) {
        console.error("Error obteniendo reporte:", error);
        return { ok: false, data: null, error };
    }
};

// DELETE
export const deleteReport = async (id) => {
    try {
        const reports = await readReports();

        const filtered = reports.filter(r => String(r.id) !== String(id));
        await writeReports(filtered);

        return { ok: true };
    } catch (error) {
        console.error("Error eliminando:", error);
        return { ok: false, error };
    }
};

// UPDATE
export const updateReport = async (id, data) => {
    try {
        const reports = await readReports();

        const updatedReports = reports.map(r =>
            String(r.id) === String(id)
                ? {
                    ...r,
                    ...data,
                    updatedAt: new Date().toISOString()
                }
                : r
        );

        await writeReports(updatedReports);

        const updated = updatedReports.find(r => String(r.id) === String(id));

        return { ok: true, data: updated };
    } catch (error) {
        console.error("Error actualizando:", error);
        return { ok: false, data: null, error };
    }
};