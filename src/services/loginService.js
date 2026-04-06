export const login = async (email, password) => {
    try {
        const response = await fetch("https://save-work-utr-project.onrender.com/api/usuario/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        return data;

    } catch (error) {
        return { error: "Error de conexión" };
    }
};