export const register = async (user) => {
    try {
        const response = await fetch("https://save-work-utr-project.onrender.com/api/usuario/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        const data = await response.json();
        return data;

    } catch (error) {
        return { error: "Error de conexión" };
    }
};