import React from 'react';
import { ButtonCancelar, ButtonConfirmar, ButtonContainer, ButtonText, ButtonTextCancelar, Container, ErrorText, Input, InputContainer } from './cadastro.style';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type FormData = {
    Nome: string;
    Senha: string;
    Email:string;
    ConfirmarSenha:string;
};

const isAlpha = (value: string) => /^([A-Za-z]\s?){3,20}$/g.test(value);
const semEspacosInicioEFim = (value: string) => /^\S.*\S$/.test(value);

const CadastroScreen = () => {
    const { control, handleSubmit, formState: { errors }, getValues  } = useForm<FormData>();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const handleVoltar = () => {
        navigation.goBack();
    };

    const handleCadastro : SubmitHandler<FormData>= (data) => {
        // Aqui você pode adicionar a lógica para enviar os dados de cadastro para o backend
        console.log('Nome:', data);
    };

    return (
        <Container>
            <InputContainer>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder="Nome"
                        // onChangeText={(value) =>setNome(value)}
                        // value={nome}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        onBlur={onBlur}
                    />
                    )}
                    name="Nome"
                    rules={{ 
                        required: 'O Nome é obrigatório',
                        minLength:8,
                        validate:{
                            noNumbers: (value: string) => isAlpha(value) || 'O nome não pode conter numeros.',
                            noLeadingOrTrailingSpaces: (value: string) => semEspacosInicioEFim(value) || 'O nome não pode começar e nem terminar com espaços'
                        }
                    }}
                    defaultValue=""
                />
                {errors.Nome && <ErrorText>{errors.Nome.message}</ErrorText>}
            </InputContainer>
            
            <InputContainer>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <Input
                            placeholder="Email"
                            onChangeText={(value)=>onChange(value)}
                            onBlur={onBlur}
                            value={value}
                        />

                    )}
                    name='Email'
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
                    defaultValue=''
                ></Controller>
                {errors.Email && <ErrorText>{errors.Email.message}</ErrorText>}
            </InputContainer>

            <InputContainer>
                <Controller 
                    control={control}
                    render={({field: {onChange, onBlur, value}}) =>(
                        <Input
                            placeholder="Senha"
                            onChangeText={(value) => onChange(value)}
                            value={value}
                            onBlur={onBlur}
                            secureTextEntry={true} // Para esconder os caracteres da senha
                        />
                    )}
                    name='Senha'
                    defaultValue=''
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
                {errors.Senha && <ErrorText>{errors.Senha.message}</ErrorText>}
            </InputContainer>

            <InputContainer>
                <Controller
                    control={control}
                    name='ConfirmarSenha'
                    render={({field:{onChange, onBlur, value}}) => (
                        <Input
                            placeholder="Confirme a senha"
                            onChangeText={(value) => onChange(value)}
                            onBlur={onBlur}
                            value={value}
                            secureTextEntry={true} // Para esconder os caracteres da senha
                        />
                    )}
                    defaultValue=''
                    rules={{ 
                        required: 'Confirmação de senha é obrigatória',
                        validate: {
                        matchesPassword: (value) => {
                            const senha = getValues('Senha');
                            return senha === value || 'As senhas não correspondem';
                        },
                        }
                    }}
                ></Controller>
                {errors.ConfirmarSenha && <ErrorText>{errors.ConfirmarSenha.message}</ErrorText>}
            </InputContainer>
            <ButtonContainer>
                <ButtonConfirmar onPress={handleSubmit(handleCadastro)}>
                    <ButtonText>Confirmar</ButtonText>
                </ButtonConfirmar>
                <ButtonCancelar onPress={() => {handleVoltar()}}>
                    <ButtonTextCancelar>Cancelar</ButtonTextCancelar>
                </ButtonCancelar>
            </ButtonContainer>
        </Container>
  );
};


export default CadastroScreen;
