import * as Keychain from 'react-native-keychain';

export const guardarToken = async (token) => {
    await Keychain.setGenericPassword("userToken", token);
};

export const obtenerToken = async () => {
    const credentials = await Keychain.getGenericPassword();
    return credentials ? credentials.password : null;
};

export const eliminarToken = async () => {
    await Keychain.resetGenericPassword();
};