import React, {useEffect, useState} from 'react';
import {
    Text,
    SafeAreaView,
    View,
    TextInput,
    StyleSheet,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import globalStyles from '../styles';
import {Picker} from '@react-native-picker/picker';

const FormularioGasto = ({setModal, handleGasto, gasto, setGasto, handleEliminarGasto}) => {
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('');

    useEffect(() => {
        if (gasto?.id) {
            setNombre(gasto.nombre);
            setCantidad(gasto.cantidad);
            setCategoria(gasto.categoria);
            setId(gasto.id);
            setFecha(gasto.fecha);
        }
    }, [gasto]);

    return (
        <SafeAreaView style={styles.contenedor}>
            <View style={styles.contenedorBotones}>
                <TouchableOpacity
                    style={[styles.btn, styles.btnCancelar]}
                    onPress={() => {
                        setModal(false);
                        setGasto({});
                    }}>
                    <Text style={styles.btnTexto}>Cancelar</Text>
                </TouchableOpacity>

                {gasto?.id && (
                    <TouchableOpacity
                        style={[styles.btn, styles.btnEliminar]}
                        onPress={() => {
                            handleEliminarGasto(id);
                        }}>
                        <Text style={styles.btnTexto}>Eliminar</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.formulario}>
                <Text style={styles.titulo}>
                    {gasto?.id ? 'Editar gasto' : 'Nuevo gasto'}
                </Text>

                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre Gasto</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre del gasto: Ej. Comida"
                        placeholderTextColor="grey"
                        value={nombre}
                        onChangeText={setNombre}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Cantidad Gasto</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Cantidad del gasto: Ej. 200"
                        placeholderTextColor="grey"
                        value={cantidad}
                        onChangeText={setCantidad}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Categoría Gasto</Text>
                    <View
                        style={{
                            borderRadius: 10,
                            overflow: 'hidden',
                            marginTop: 10,
                        }}>
                        <Picker
                            style={{...styles.input, marginTop: 0}}
                            dropdownIconColor="grey"
                            selectedValue={categoria}
                            onValueChange={itemValue =>
                                setCategoria(itemValue)
                            }>
                            <Picker.Item
                                label="Seleccione..."
                                value=""
                                color="grey"
                                enabled={false}
                            />
                            <Picker.Item label="Ahorro" value="ahorro" />
                            <Picker.Item label="Comida" value="comida" />
                            <Picker.Item label="Casa" value="casa" />
                            <Picker.Item label="Gastos varios" value="gastos" />
                            <Picker.Item label="Ocio" value="ocio" />
                            <Picker.Item label="Salud" value="salud" />
                            <Picker.Item
                                label="Suscripciones"
                                value="suscripciones"
                            />
                        </Picker>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={() =>
                        handleGasto({nombre, cantidad, categoria, id, fecha})
                    }>
                    <Text style={styles.submitBtnTexto}>
                        {gasto?.id ? 'Guardar cambios' : 'Agregar gasto'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#1E40AF',
        flex: 1,
    },
    contenedorBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn: {
        flexGrow: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 30,
        marginHorizontal: 10,
    },
    btnCancelar: {
        backgroundColor: '#DB2777',
    },
    btnEliminar: {
        backgroundColor: '#EF4444',
    },
    btnTexto: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#FFF',
    },
    formulario: {
        ...globalStyles.contenedor,
    },
    titulo: {
        textAlign: 'center',
        fontSize: 28,
        marginBottom: 30,
        color: '#64748B',
    },
    campo: {
        marginVertical: 10,
    },
    label: {
        color: '#64748B',
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#F5F5F5',
        color: '#000',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    submitBtn: {
        backgroundColor: '#3B82F6',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
    },
    submitBtnTexto: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});

export default FormularioGasto;
