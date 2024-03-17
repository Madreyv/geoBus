import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

export const InputContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    justify-items: flex-start;
    width: 100%;
    margin-bottom: 20px;
`
export const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  border-color: #ccc;
  border-width: 1px;
  border-radius: 5px;
  margin-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const ButtonContainer= styled.View`
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    gap: 10px;
`

export const ButtonConfirmar = styled.TouchableOpacity`
    border-radius: 5px;
    background-color: #007bff;
    padding: 12px 40px;
    border-radius: 5px;
    width: 170px;
`;

export const ButtonCancelar = styled.TouchableOpacity`
    background-color: #FFF;
    border: 1px solid #007bff;
    padding: 12px 40px;
    border-radius: 5px;
    width: 160px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;

export const ButtonTextCancelar = styled.Text`
    color: #007bff;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
`
export const ErrorText = styled.Text`
    color:red;
    font-size: 10px;
    text-align: left;
`