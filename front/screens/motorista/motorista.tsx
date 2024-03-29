import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Switch } from 'react-native';
import { AuthContext } from '../../contexts/authContext';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { initializeSocket } from '../../service.map';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io-client';
import { LocationObject, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const SwitchContainer = styled.View`
  margin-bottom: 20px;
`;

const Text = styled.Text`
  font-size: 18px;
  text-align: center;
`;

const MotoristaScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [intervaloAtivado, setIntervaloAtivado] = useState<any>(null);
  const [location, setLocation] = useState<LocationObject | null>(null)
  const { token, logout, user } = useContext(AuthContext);
  const [instanciaSocket, setInstanciaSocket] = useState<any>(null);
  
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    if(token == null){
        logout()
        navigation.navigate('login');
    }
    conectarSocket()
    requestLocationPermition()
  }, []) 
  

  useEffect(() => {
    const intervalo = setInterval(enviarLocalizacao, 30000); //envia a localização a cada 30s
    return () => clearInterval(intervalo);
  },[isEnabled])

  const conectarSocket = () => {
    const socket = initializeSocket('http://192.168.18.29:3000')//ipv4 ipconfig rede sem fio
    if(socket) setInstanciaSocket(socket);

    return () => {
      socket.disconnect()
    }
  }

  async function requestLocationPermition() {
    const { granted } = await requestForegroundPermissionsAsync()

    if (granted) {
      const currentPosition = await getCurrentPositionAsync()
      console.log('current position', currentPosition)
      setLocation(currentPosition)
      
    }
  }

  const enviarLocalizacao = () => {
      if(instanciaSocket ){
        if(isEnabled){
            
            instanciaSocket.emit('setLocalizacaoVeiculo', 
                {
                    localizacao:location?.coords, 
                    user:user
                }
            )
            console.log("localização emitida")
        }
    }else{
        conectarSocket()
    }
  }


  return (
    <Container>
      <Text>
        {isEnabled
          ? 'Clique no seletor abaixo para parar de compartilhar a localização'
          : 'Clique no seletor abaixo para compartilhar a localização'}
      </Text>
      <SwitchContainer>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setIsEnabled(previousState => !previousState)}
          value={isEnabled}
          style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
        />
      </SwitchContainer>
      <Text>{isEnabled ? 'ON' : 'OFF'}</Text>
    </Container>
  );
};

export default MotoristaScreen;

