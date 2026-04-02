import AsyncStorage from '@react-native-async-storage/async-storage';

// Obtener todos los reportes guardados en el celular/navegador
export const getAllReports = async () => {
    try {
        const storedReports = await AsyncStorage.getItem('reports');
        return storedReports ? JSON.parse(storedReports) : [];
    } catch (error) {
        console.error("Error cargando reportes locales:", error);
        return [];
    }
};

// Guardar un nuevo reporte localmente
export const createReport = async (report) => {
    try {
        // 1. Traer los que ya existen
        let reports = await AsyncStorage.getItem('reports');
        reports = reports ? JSON.parse(reports) : [];
        
        // 2. Agregar el nuevo reporte a la lista
        reports.push(report);
        
        // 3. Guardar la lista actualizada
        await AsyncStorage.setItem('reports', JSON.stringify(reports));
        
        // 4. Devolvemos algo que NO sea null para que el IF de tu pantalla sea exitoso
        return { status: "ok", data: report }; 
    } catch (error) {
        console.error("Error guardando reporte local:", error);
        return null; // Solo aquí daría el alert de error
    }
};