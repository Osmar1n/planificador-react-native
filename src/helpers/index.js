export const formatearCantidad = cantidad => {
    return Number(cantidad).toLocaleString('es-GT', {
        style: 'currency',
        currency: 'GTQ',
    });
};

export const generarId = () => {
    const random = Math.random().toString(36).substring(2, 11);
    const fecha = Date.now().toString(36);

    return random + fecha;
};

export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha);

    return fechaNueva.toLocaleDateString('es-GT', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
