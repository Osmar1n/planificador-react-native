import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import globalStyles from '../styles';
import {delay, formatearCantidad} from '../helpers';
import CircularProgress from 'react-native-circular-progress-indicator';

const ControlPresupuesto = ({presupuesto, gastos}) => {
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);

    useEffect(() => {
        const totalGastado = gastos.reduce(
            (total, gasto) => Number(gasto.cantidad) + total,
            0
        );
        const totalDisponible = presupuesto - totalGastado;

        const nuevoPorcentaje =
            ((presupuesto - totalDisponible) / presupuesto) * 100;

        delay(600).then(() => {
            setPorcentaje(nuevoPorcentaje);
        });

        setDisponible(totalDisponible);
        setGastado(totalGastado);
    }, [gastos]);

    return (
        <View style={styles.contenedor}>
            <View style={styles.centrarGrafica}>
                <CircularProgress
                    value={porcentaje}
                    duration={1000}
                    radius={150}
                    valueSuffix="%"
                    title="Gastado"
                    inActiveStrokeColor="#F5F5F5"
                    inActiveStrokeWidth={20}
                    activeStrokeColor="#3B82F6"
                    titleStyle={{
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}
                    titleColor="#64748B"
                />
            </View>

            <View style={styles.contendorTexto}>
                <Text style={styles.valor}>
                    <Text style={styles.label}>Presupuesto:</Text>
                    {` ${formatearCantidad(presupuesto)}`}
                </Text>
                <Text style={styles.valor}>
                    <Text style={styles.label}>Disponible:</Text>
                    {` ${formatearCantidad(disponible)}`}
                </Text>
                <Text style={styles.valor}>
                    <Text style={styles.label}>Gastado:</Text>
                    {` ${formatearCantidad(gastado)}`}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        ...globalStyles.contenedor,
    },
    centrarGrafica: {
        alignItems: 'center',
    },
    imagen: {
        width: 250,
        height: 250,
    },
    contendorTexto: {
        marginTop: 50,
    },
    valor: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
        color: '#000',
    },
    label: {
        fontWeight: '700',
        color: '#3B82F6',
    },
});

export default ControlPresupuesto;
