import apiClient from "../helpers/api";
export const register = async (user) => {
    try {
        const response = await apiClient.post("/api/usuario/register", {
            name: user.name.trim(),
            lastname: user.lastname.trim(),
            email: user.email.trim(),
            password: user.password.trim(),
            role: user.role.trim()
        });

        return {
            ok: true,
            data: response.data
        };
    } catch (error) {
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);
        return {
            ok: false,
            error: error.response?.data?.message || error.response?.data?.error || error.message || "Registration failed"
        };
    }
};
