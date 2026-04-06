import * as SecureStore from 'expo-secure-store';

export const getToken = async (key) => {
    try {
        const token = await SecureStore.getItemAsync(key);
        return token;
    } catch (error) {
        console.log("Error obteniendo token", error);
        return null;
    }
};


export const guardarToken = async (key, value) => {
    try {
        console.log(key, value)
        await SecureStore.setItemAsync(key, value);
    } catch (error) {
        console.log("Error guardando token", error);
    }
};

export const eliminarToken = async (key) => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.log("Error eliminando token", error);
    }
};