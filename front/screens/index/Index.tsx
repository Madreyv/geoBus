import { Dropdown } from "react-native-element-dropdown";
import React, { useEffect, useState } from 'react';
import { Container } from "./Index.style";
import { LocationObject, getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { Veiculos } from "../../tipos/tipos";
import { IMensagens, mensagensMock, veiculosMock } from "../../mocks/veiculos";
import { rotaDois, rotaUm } from "../../mocks/coordenadas";
import { initializeSocket, getSocket } from "../../service.map";
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { Marker } from "react-native-maps";
import MapComponent from "../../components/map/Map";



export default function Index() {

  const [location, setLocation] = useState<LocationObject | null>(null)
  const [veiculos, setVeiculos] = useState<Array<Veiculos>>(veiculosMock)
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<Veiculos>()
  const [isFocus, setIsFocus] = useState(false);
  const [contador, setContador] = useState<number>(0);
  const [instancia, setInstancia] = useState<any>(null);
  const [localizacaoTransporte, setLocalizacaoTransportes] = useState<any>(null)
  const [mensagensVeiculo, setMensagensveiculo] = useState<Array<IMensagens>>(mensagensMock)
  const [mensagensVeiculoSelecionada, setMensagensveiculoSelecionada] = useState<IMensagens>()
  const [transporteUm, setTransporteUm] = useState<any>(null);
  const transporteUmMock = rotaUm
  const transporteDoisMock = rotaDois

  useEffect(() => {
    conectarSocket()
    requestLocationPermition()
  }, [])

  useEffect(() => {
    if(instancia){
      instancia.on('localizacaoVeiculo', (localizacao:any) => {
        // Atualize a interface do usuário para exibir a localização do veículo
        modificarLocalizacao(localizacao);
    })
    }else{
      conectarSocket()
    }
  }, [localizacaoTransporte, veiculoSelecionado])

  const conectarSocket = () => {
    const socket = initializeSocket('http://192.168.18.29:3000')//ipv4 ipconfig rede sem fio
    if(socket) setInstancia(socket);

    return () => {
      socket.disconnect()
    }
  }

  const mudarLocalizacao = () => {
    setTimeout(() => {
      setTransporteUm(transporteUmMock[contador])
      setContador(contador + 1)
    }, 1000);
  }

  const modificarLocalizacao = (localizacao:any) => {
    setLocalizacaoTransportes(localizacao)
  }

  async function requestLocationPermition() {
    const { granted } = await requestForegroundPermissionsAsync()

    if (granted) {
      const currentPosition = await getCurrentPositionAsync()
      console.log('current position', currentPosition)
      setLocation(currentPosition)
      
    }
  }

  const selecionaVeoculo = (veiculo: any) => {
    console.log('veiculo', veiculo.id)

    const socket = getSocket();

    if(socket){
      socket.emit('selecionarVeiculo', veiculo.id)
      setVeiculoSelecionado(veiculo)
    }
  }

  const selecionarStatusVeiculo = (mensagem:any) => {
    console.log('mensagem', mensagem)

    setMensagensveiculoSelecionada(mensagem);
  }

  const renderLabel = () => {
    if (veiculoSelecionado || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Selecione um veículo
        </Text>
      );
    }
    return null;
  };


  return (
    <Container>
      <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={veiculos}
        search
        maxHeight={300}
        labelField="name"
        valueField="id"
        placeholder={!isFocus ? 'Selecione o veículo' : '...'}
        searchPlaceholder="Pesquisar..."
        value={veiculoSelecionado}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          // setVeiculoSelecionado(item);
          selecionaVeoculo(item);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="Safety"
            size={20}
          />
        )}
      />
      {
        location !== null ? (
          <MapComponent localizacao={localizacaoTransporte} localizacaoUsuario={location}></MapComponent>
        ) : (<></>)
      }
      {
        veiculoSelecionado != null || veiculoSelecionado != undefined 
        ?(
          <Dropdown
            style={[styles.dropdownMensagem]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={mensagensMock}
            search
            maxHeight={300}
            labelField="mensagem"
            valueField="id"
            placeholder={!isFocus ? 'Selecione um status para o veiculo' : '...'}
            searchPlaceholder="Pesquisar..."
            value={mensagensVeiculoSelecionada}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              // setVeiculoSelecionado(item);
              selecionarStatusVeiculo(item);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? 'blue' : 'black'}
                name="Safety"
                size={20}
              />
            )}
          />

        )
        : <></>
      }
    </Container>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    width: 380,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: 'blue',
    borderWidth: 1,
    padding: 10,
    position: 'absolute',
    top: 50,
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

  dropdownMensagem: {
    width: 380,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: 'blue',
    borderWidth: 1,
    padding: 10,
    position: 'absolute',
    bottom: 50,
    zIndex: 99999,
  },
});