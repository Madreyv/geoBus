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
    margin-bottom: 20px;
    width: 330px;
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
/* const ButtonContainer = styled.TouchableOpacity`
  margin-vertical: 40px;
  width: 120px;
  height: 40px;
  padding: 12px;
  border-radius: 10px;
  background-color: ${props => props.bgColor};
`; */