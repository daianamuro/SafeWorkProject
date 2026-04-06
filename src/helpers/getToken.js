import * as Keychain from 'react-native-keychain';

// 🔹 Guardar token
export const guardarToken = async (token) => {
    try {
        await Keychain.setGenericPassword("userToken", token);
    } catch (error) {
        console.error("Error guardando token", error);
    }
};

// 🔹 Obtener token
export const obtenerToken = async () => {
    try {
        const credentials = await Keychain.getGenericPassword();

        if (credentials) {
            return credentials.password;
        }

        return null;
    } catch (error) {
        console.error("Error obteniendo token", error);
        return null;
    }
};

// 🔹 Eliminar token
export const eliminarToken = async () => {
    try {
        await Keychain.resetGenericPassword();
    } catch (error) {
        console.error("Error eliminando token", error);
    }
};