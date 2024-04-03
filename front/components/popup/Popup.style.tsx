import styled from 'styled-components/native'
import { View, Text, TouchableOpacity } from 'react-native';

export const Container = styled.View`
    display: flex;
    width: 250px;
    height: 200px;
    justify-content: center;
    margin: auto;
    align-items: center;
    background-color: white;
    border-radius: 8px;
`

export const Pergunta = styled.Text`
    font-size: 16px;
    font-weight: bold;
`

export const ButtonContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    margin-top: 20px;
    width: 100%;
`

export const ButtonConfirmacao = styled.TouchableOpacity`
    background-color: #007bff;
    padding: 12px;
    border-radius: 5px;
    width: 80px;
    color: white;
`

export const ButtonText = styled.Text`
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
`

export const ButtonCancelar = styled.TouchableOpacity`
    background-color: #FFF;
    border: 1px solid #007bff;
    padding: 12px;
    border-radius: 5px;
    width: 80px;
`

export const ButtonTextCancelar = styled.Text`
    color: #007bff;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
`