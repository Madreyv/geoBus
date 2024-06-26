// navigation/index.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/login/login';
import CadastroScreen from '../../screens/cadastro/cadastro'
import Index from '../../screens/index/Index';
import MotoristaScreen from '../../screens/motorista/motorista';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="index" component={Index} />
        <Stack.Screen name="motorista" component={MotoristaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
