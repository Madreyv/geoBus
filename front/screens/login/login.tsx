import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { ButtonCadastrar, ButtonLogin, ButtonTextCandastrar, ButtonTextLogin, InputContainer, LoginContainer, LoginTextInput, TextLink } from './login.style';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const LoginScreen = () => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    // const navigation = useNavigation();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const handleNavigateToCadastro = () => {
        navigation.navigate('Cadastro');
    };
    
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
        <LoginContainer >
            <InputContainer >
                {/* <Image source={require('./assets/person.png')} style={styles.icon} /> */}
                <LoginTextInput
                    value={login}
                    onChangeText={setLogin}
                    placeholder="Login"
                ></LoginTextInput>
            </InputContainer>
            <InputContainer >
                {/* <Image source={require('./assets/key.png')} style={styles.icon} /> */}
                <LoginTextInput
                    value={senha}
                    onChangeText={setSenha}
                    placeholder="Senha"
                    secureTextEntry={!mostrarSenha}
                >

                </LoginTextInput>
                <TouchableOpacity onPress={handleMostrarSenha}>
                    {/* <Image
                        source={require('./assets/eye.png')}
                        style={[styles.icon, styles.eyeIcon]}
                    /> */}
                </TouchableOpacity>
            </InputContainer>
            <ButtonLogin onPress={handleEntrar}>
                <ButtonTextLogin>Entrar</ButtonTextLogin>
            </ButtonLogin>
            <ButtonCadastrar onPress={handleNavigateToCadastro}>
                <ButtonTextCandastrar>Cadastrar</ButtonTextCandastrar>
            </ButtonCadastrar>
            <TouchableOpacity onPress={handleEsqueceuSenha}>
                <TextLink>Esqueceu a senha? Clique aqui!</TextLink>
            </TouchableOpacity>
        </LoginContainer>
    );
};

export default LoginScreen;
