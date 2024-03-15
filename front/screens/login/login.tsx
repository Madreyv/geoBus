import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const LoginScreen = () => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const handleMostrarSenha = () => {
        setMostrarSenha(!mostrarSenha);
    };

    const handleEntrar = () => {
        // Lógica para entrar
    };

    const handleCadastrar = () => {
        // Lógica para cadastrar
    };

    const handleEsqueceuSenha = () => {
        // Lógica para esqueceu a senha
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                {/* <Image source={require('./assets/person.png')} style={styles.icon} /> */}
                <TextInput
                    style={styles.input}
                    value={login}
                    onChangeText={setLogin}
                    placeholder="Login"
                />
            </View>
            <View style={styles.inputContainer}>
                {/* <Image source={require('./assets/key.png')} style={styles.icon} /> */}
                <TextInput
                    style={styles.input}
                    value={senha}
                    onChangeText={setSenha}
                    placeholder="Senha"
                    secureTextEntry={!mostrarSenha}
                />
                <TouchableOpacity onPress={handleMostrarSenha}>
                    {/* <Image
                        source={require('./assets/eye.png')}
                        style={[styles.icon, styles.eyeIcon]}
                    /> */}
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleEntrar}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEsqueceuSenha}>
                <Text style={styles.esqueceuSenha}>Esqueceu a senha? Clique aqui!</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingLeft: 40,
    },
    icon: {
        position: 'absolute',
        width: 20,
        height: 20,
        resizeMode: 'contain',
        left: 10,
    },
    eyeIcon: {
        right: 10,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    esqueceuSenha: {
        color: '#007bff',
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
