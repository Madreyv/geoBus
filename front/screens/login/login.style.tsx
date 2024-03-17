import styled from 'styled-components/native';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

export const LoginContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
`
export const InputContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;
    /* width: 330px; */
    width: 100%;
    `
export const InputFormFildContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    justify-items: flex-start;
    width: 100%;
    /* width: 330px; */
    margin-bottom: 20px;
`
export const LoginTextInput = styled.TextInput`
    flex: 1;
    height: 40px;
    border: 1px solid #ccc;
    padding-left: 40px;
    border-radius: 6px;
    /* borderWidth: 1px;
    borderColor: #ccc;
    borderRadius: 5px; */
`

export const ButtonLogin = styled.TouchableOpacity`
    background-color: #007bff;
    padding: 12px 40px;
    border-radius: 5px;
    margin-bottom: 10px;
    width: 200px;
`
export const ButtonCadastrar = styled.TouchableOpacity`
    background-color: #FFF;
    border: 1px solid #007bff;
    padding: 12px 40px;
    border-radius: 5px;
    margin-bottom: 30px;
    width: 200px;
`

export const ButtonTextLogin = styled.Text`
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
`

export const ButtonTextCandastrar = styled.Text`
    color: #007bff;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
`
export const TextLink = styled.Text`
    color: #007bff;
    text-decoration: underline;
`
export const ErrorText = styled.Text`
    color:red;
    font-size: 10px;
    text-align: left;
`

export const InputIcon = styled.Image`
    width: 10px;
`