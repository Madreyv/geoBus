import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { ButtonCadastrar, ButtonLogin, ButtonTextCandastrar, ButtonTextLogin, ErrorText, InputContainer, InputFormFildContainer, InputIcon, LoginContainer, LoginTextInput, TextLink } from './login.style';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { login } from '../../service.map'
import { LoginForm, LoginResponse } from '../../tipos/tipos';
import { logar } from '../../services/services';


const semEspacosInicioEFim = (value: string) => /^\S.*\S$/.test(value);

const LoginScreen = () => {
    const { control, handleSubmit, formState: { errors }  } = useForm<LoginForm>();
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const handleNavigateToCadastro = () => {
        navigation.navigate('Cadastro');
    };
    
    const handleMostrarSenha = () => {
        setMostrarSenha(!mostrarSenha);
    };

    const handleEntrar = async (data:LoginForm) => {
        // Lógica para entrar
        console.log("data", data)
        try {
            let userData = await logar(data);

            console.log('Usuário logado:', userData);
        } catch (error:any) {
            console.error('Erro ao fazer login:', error.message);
        }
    };

    const handleCadastrar = () => {
        // Lógica para cadastrar
    };

    const handleEsqueceuSenha = () => {
        // Lógica para esqueceu a senha
    };

    return (
        <LoginContainer >
            <InputFormFildContainer>
                <Controller
                    control={control}
                    name='email'
                    defaultValue=''
                    render={({field:{onChange, onBlur, value}}) => (
                    <InputContainer >
                        {/* <Image source={require('./assets/person.png')} style={styles.icon} /> */}
                        <LoginTextInput
                            value={value}
                            onChangeText={(value)=>onChange(value)}
                            onBlur={onBlur}
                            placeholder="Login"
                        ></LoginTextInput>
                    </InputContainer>

                    )}
                    rules={{
                        required:"O Email é obrigatório",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Email inválido'
                        },
                        validate:{
                            noLeadingOrTrailingSpaces: (value: string) => semEspacosInicioEFim(value) || 'O email não pode começar e nem terminar com espaços'
                        }
                    }}
                ></Controller>
                {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
            </InputFormFildContainer>
            
            <InputFormFildContainer>
                <Controller
                    control={control}
                    name='senha'
                    defaultValue=''
                    render={({field:{onChange, onBlur, value}}) => (
                    <InputContainer >
                        {/* <InputIcon source={require('../../assets/icons/user.png')} /> */}
                        <LoginTextInput
                            value={value}
                            onChangeText={(value)=> onChange(value)}
                            onBlur={onBlur}
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
                    )}
                    rules={{ 
                        minLength: {
                            value: 8,
                            message: 'Senha deve ter no mínimo 8 caracteres'
                        },
                        required: 'Senha é obrigatória',
                        validate: (value) => {
                        const containsSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
                        const containsNumber = /\d+/;
                        
                        if (!containsSpecialChar.test(value)) {
                            return 'A senha deve conter pelo menos um caractere especial';
                        }
                        
                        if (!containsNumber.test(value)) {
                            return 'A senha deve conter pelo menos um número';
                        }
                        
                        return true;
                        }
                    }}
                ></Controller>
                {errors.senha && <ErrorText>{errors.senha.message}</ErrorText>}
            </InputFormFildContainer>
            <ButtonLogin onPress={handleSubmit(handleEntrar)}>
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
