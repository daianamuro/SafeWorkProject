import apiClient from "../helpers/api";

export const login = async (email, password) => {
    try {
        const response = await apiClient.post("/api/usuario/login", {
            email,
            password
        });

        return response.data;
    } catch (error) {
        console.error("Error en register:", error.response?.data || error.message);
        return {
            ok: false,
            error: error.response?.data || error.message
        };
    }
};
