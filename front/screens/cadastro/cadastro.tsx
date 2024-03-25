import React from 'react';
import { ButtonCancelar, ButtonConfirmar, ButtonContainer, ButtonText, ButtonTextCancelar, Container, ErrorText, Input, InputContainer } from './cadastro.style';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CadastrarForm } from '../../tipos/tipos';
import { cadastrar } from '../../services/services';



const isAlpha = (value: string) => /^([A-Za-z]\s?){3,20}$/g.test(value);
const semEspacosInicioEFim = (value: string) => /^\S.*\S$/.test(value);

const CadastroScreen = () => {
    const { control, handleSubmit, formState: { errors }, getValues  } = useForm<CadastrarForm>();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const handleVoltar = () => {
        navigation.goBack();
    };

    const handleCadastro : SubmitHandler<CadastrarForm> = async (data) => {
        const body = {...data, tipo:1}
        // console.log('Nome:', data);
        try{
            let response = await cadastrar(body);
            alert(response.data.message)
            navigation.navigate('Login')
            // console.log('response', response.data.message)
        }catch(error:any){
            alert(error)
        }
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
                    name="nome"
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
                {errors.nome && <ErrorText>{errors.nome.message}</ErrorText>}
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
                    name='email'
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
                {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
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
                    name='senha'
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
                {errors.senha && <ErrorText>{errors.senha.message}</ErrorText>}
            </InputContainer>

            <InputContainer>
                <Controller
                    control={control}
                    name='confirmarSenha'
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
                            const senha = getValues('senha');
                            return senha === value || 'As senhas não correspondem';
                        },
                        }
                    }}
                ></Controller>
                {errors.confirmarSenha && <ErrorText>{errors.confirmarSenha.message}</ErrorText>}
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
