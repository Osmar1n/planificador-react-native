import React, {useState} from 'react';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    View,
    Pressable,
    TouchableOpacity,
    Image,
    Modal,
    Text,
    ScrollView,
} from 'react-native';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import ListadoGastos from './src/components/ListadoGastos';
import Filtro from './src/components/Filtro';
import {generarId} from './src/helpers';

const App = () => {
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    const [presupuesto, setPresupuesto] = useState(0);
    const [gastos, setGastos] = useState([]);
    const [modal, setModal] = useState(false);
    const [gasto, setGasto] = useState({});
    const [filtro, setFiltro] = useState('');
    const [gastosFiltrados, setGastosFiltrados] = useState([]);

    const handleNuevoPresupuesto = presupuesto => {
        if (Number(presupuesto) > 0) {
            setIsValidPresupuesto(true);
        } else {
            Alert.alert('Error', 'El presupuesto no puede ser 0 o menor');
        }
    };

    const handleGasto = gasto => {
        if ([gasto.nombre, gasto.categoria, gasto.cantidad].includes('')) {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }

        if (gasto.id) {
            const gastosActualizados = gastos.map(gastoActual =>
                gastoActual.id === gasto.id ? gasto : gastoActual
            );
            setGastos(gastosActualizados);
        } else {
            gasto.id = generarId();
            gasto.fecha = Date.now();
            setGastos([...gastos, gasto]);
        }

        setModal(false);
    };

    const handleEliminarGasto = id => {
        Alert.alert('¿Deseas eliminar este gasto?', 'No se podra recuperar', [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'Eliminar',
                onPress: () => {
                    const gastosActualizados = gastos.filter(
                        gasto => gasto.id !== id
                    );
                    setGastos(gastosActualizados);

                    setModal(false);
                    setGasto({});
                },
            },
        ]);
    };

    return (
        <View style={styles.contenedor}>
            <ScrollView>
                <View style={styles.header}>
                    <Header />
                    {isValidPresupuesto ? (
                        <ControlPresupuesto
                            presupuesto={presupuesto}
                            gastos={gastos}
                        />
                    ) : (
                        <NuevoPresupuesto
                            presupuesto={presupuesto}
                            setPresupuesto={setPresupuesto}
                            handleNuevoPresupuesto={handleNuevoPresupuesto}
                        />
                    )}
                </View>

                {isValidPresupuesto && (
                    <>
                        <Filtro
                            filtro={filtro}
                            setFiltro={setFiltro}
                            gastos={gastos}
                            setGastosFiltrados={setGastosFiltrados}
                        />
                        
                        <ListadoGastos
                            gastos={gastos}
                            setModal={setModal}
                            setGasto={setGasto}
                            filtro={filtro}
                            gastosFiltrados={gastosFiltrados}
                        />
                    </>
                )}
            </ScrollView>

            {modal && (
                <Modal
                    animationType="slide"
                    visible={modal}
                    onRequestClose={() => {
                        setModal(false);
                    }}>
                    <FormularioGasto
                        setModal={setModal}
                        handleGasto={handleGasto}
                        gasto={gasto}
                        setGasto={setGasto}
                        handleEliminarGasto={handleEliminarGasto}
                    />
                </Modal>
            )}

            {isValidPresupuesto && (
                <TouchableOpacity
                    onPress={() => setModal(true)}
                    style={styles.boton}>
                    <Image
                        style={styles.imagen}
                        source={require('./src/img/nuevo-gasto.png')}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#3B82F6',
        minHeight: 400,
    },
    contenedor: {
        backgroundColor: '#F5F5F5',
        flex: 1,
    },
    imagen: {
        width: 60,
        height: 60,
    },
    boton: {
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 40,
        right: 30,
    },
});
export default App;
