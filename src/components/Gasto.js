import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import globalStyles from '../styles';

import {formatearCantidad, formatearFecha} from '../helpers';

const diccionarioIconos = {
    ahorro: require('../img/icono_ahorro.png'),
    comida: require('../img/icono_comida.png'),
    casa: require('../img/icono_casa.png'),
    gastos: require('../img/icono_gastos.png'),
    ocio: require('../img/icono_ocio.png'),
    salud: require('../img/icono_salud.png'),
    suscripciones: require('../img/icono_suscripciones.png'),
};

const Gasto = ({gasto, setModal, setGasto}) => {
    const {nombre, categoria, cantidad, fecha} = gasto;

    const handleAcciones = () => {
        setModal(true);
        setGasto(gasto);
    };

    return (
        <TouchableOpacity style={styles.contenedor} onPress={handleAcciones}>
            <View style={styles.contenido}>
                <View style={styles.contenedorImagen}>
                    <Image
                        style={styles.imagen}
                        source={diccionarioIconos[categoria]}
                    />
                    <View style={styles.contenedorTexto}>
                        <Text style={styles.categoria}>{categoria}</Text>
                        <Text style={styles.nombre}>{nombre}</Text>
                        <Text style={styles.fecha}>
                            {formatearFecha(fecha)}
                        </Text>
                    </View>
                </View>
                <Text style={styles.cantidad}>
                    {formatearCantidad(cantidad)}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        ...globalStyles.contenedor,
        marginBottom: 20,
    },
    contenido: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contenedorImagen: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    imagen: {
        width: 80,
        height: 80,
        marginRight: 20,
    },
    contenedorTexto: {
        flex: 1,
    },
    categoria: {
        color: '#94A3B8',
        fontSize: 16,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: 5,
    },
    nombre: {
        color: '#000',
        color: '#64748B',
        marginBottom: 5,
    },
    fecha: {
        fontWeight: '700',
        color: '#DB2777',
    },
    cantidad: {
        color: '#000',
        fontSize: 20,
        fontWeight: '700',
    },
});

export default Gasto;