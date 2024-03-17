import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MapIcon, Container, Map, BusTitle, BusTitleContainer } from './App.style';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject,watchPositionAsync } from 'expo-location';
import React, { useEffect, useState } from 'react';
import {Marker} from 'react-native-maps';
import { rotaDois, rotaUm } from './mocks/coordenadas';
import { forEachChild } from 'typescript';
import { Dropdown } from 'react-native-element-dropdown';
import { Veiculos } from './tipos/tipos';
import { veiculosMock } from './mocks/veiculos';
import { AntDesign } from '@expo/vector-icons';
import { initializeSocket } from './service.map';
import 'react-native-gesture-handler';
import Index from './screens/index/Index';
import LoginScreen from './screens/login/login';
import AppNavigator from './components/navigation/navigator.index';


export default function App() {
  // const [location, setLocation] = useState<LocationObject | null>(null)
  // const [veiculos, setVeiculos] = useState<Array<Veiculos>>(veiculosMock)
  // const [veiculoSelecionado, setVeiculoSelecionado] = useState<Veiculos>()
  // const [isFocus, setIsFocus] = useState(false);
  // const [contador, setContador] = useState<number>(0)
  // const [transporteUm, setTransporteUm] = useState<any>(null)
  // const transporteUmMock = rotaUm
  // const transporteDoisMock = rotaDois
  
  // useEffect(() => {
  //   conectarSocket()
  //   requestLocationPermition()
  //   mudarLocalizacao()
  // },[])

  // useEffect(() => {
  //   if (contador < transporteUmMock.length) {
  //     setTimeout(() => {
  //       setTransporteUm(transporteUmMock[contador]);
  //       setContador((prevContador) => prevContador + 1);
  //     }, 3000);
  //   }
  // }, [contador, transporteUmMock]);

  // const conectarSocket = () => {
  //   const socket = initializeSocket('http://10.0.0.173:3000')
  //   // const socket = initializeSocket('http://localhost:3000')
  //   // const socket = initializeSocket('ws://echo.websocket.org')

  //   return() => {
  //     socket.disconnect()
  //   }
  // }
  // const mudarLocalizacao = () => {
  //   // console.log('contador', contador)
  //   setTimeout(() => {
  //     setTransporteUm(transporteUmMock[contador])
  //     // setTransporteUm(transporteUmMock[8])
  //     // console.log("tranporte um", transporteUmMock[contador])
  //     setContador(contador + 1)
  //   }, 1000);
  // }

  // async function requestLocationPermition() {
  //   const { granted } = await requestForegroundPermissionsAsync()

  //   if (granted){
  //     const currentPosition = await getCurrentPositionAsync()
  //     setLocation(currentPosition)
  //     // console.log('localização atual', currentPosition)
  //   }
  // }

  // const renderLabel = () => {
  //   if (veiculoSelecionado || isFocus) {
  //     return (
  //       <Text style={[styles.label, isFocus && { color: 'blue' }]}>
  //         Selecione um veículo
  //       </Text>
  //     );
  //   }
  //   return null;
  // };

  return (
    // <Index></Index>
    // <LoginScreen></LoginScreen>
    <AppNavigator />
    // <Container>
    //     <Dropdown
    //       style={[styles.dropdown]}
    //       placeholderStyle={styles.placeholderStyle}
    //       selectedTextStyle={styles.selectedTextStyle}
    //       inputSearchStyle={styles.inputSearchStyle}
    //       iconStyle={styles.iconStyle}
    //       data={veiculos}
    //       search
    //       maxHeight={300}
    //       labelField="name"
    //       valueField="id"
    //       placeholder={!isFocus ? 'Selecione o veículo' : '...'}
    //       searchPlaceholder="Pesquisar..."
    //       value={veiculoSelecionado}
    //       onFocus={() => setIsFocus(true)}
    //       onBlur={() => setIsFocus(false)}
    //       onChange={item => {
    //         setVeiculoSelecionado(item);
    //         setIsFocus(false);
    //       }}
    //       renderLeftIcon={() => (
    //         <AntDesign
    //           style={styles.icon}
    //           color={isFocus ? 'blue' : 'black'}
    //           name="Safety"
    //           size={20}
    //         />
    //       )}
    //     />
    //   { location !== null &&
    //     <Map
    //       initialRegion={{
    //         latitude:location.coords.latitude,
    //         latitudeDelta:0.005,
    //         longitudeDelta:0.005,
    //         longitude:location.coords.longitude
    //       }}
    //     >
    //       <Marker 
    //         coordinate={{
    //           latitude: location.coords.latitude,
    //           longitude: location.coords.longitude
    //         }}
    //       >
    //         <MapIcon
    //             source={require('./assets/icons/person.png')}
    //         ></MapIcon>
    //         <BusTitleContainer>
    //             <BusTitle>Eduardo</BusTitle>
    //         </BusTitleContainer>
    //       </Marker>

    //       {
    //         transporteUm && 
    //         <Marker 
    //           coordinate={{
    //             latitude: transporteUm.latitude,
    //             longitude: transporteUm.longitude
    //           }}
    //         >
    //           {/* <View style={{backgroundColor: "red", padding: 10}}>
    //             <Text>SF</Text>
    //           </View> */}
    //           <MapIcon
    //             source={require('./assets/icons/bus.png')}
    //           ></MapIcon>
    //           <BusTitleContainer>
    //             <BusTitle>T-11</BusTitle>
    //             <BusTitle>Onibus Lotado!</BusTitle>
    //           </BusTitleContainer>
    //         </Marker>
    //       }
    //     </Map>
    //   }
    //   <View>
    //     {/* <Text>Selecione o veículo</Text> */}
    //   </View>

    // </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    position: "absolute",
    top: 100,
    zIndex: 100,
  },
  bubbleArrow: {
    width: 20,
    height: 20,
    backgroundColor: "black",
    position: "absolute",
    top: -10,
    right: -10,
    borderRadius: 10,
  },
  bubbleContent: {
    flex: 1,
  },

  dropdown: {
    width: 380,
    backgroundColor: "white",
    borderRadius: 10,
    // borderColor: "black",
    borderColor: 'blue',
    borderWidth: 1,
    padding: 10,
    position: 'absolute',
    top:50,
    zIndex: 99999,
  },
  dropdownArrow: {
    width: 20,
    height: 20,
    backgroundColor: "black",
    position: "absolute",
    top: -10,
    right: -10,
    borderRadius: 10,
  },
  dropdownContent: {
    flex: 1,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
