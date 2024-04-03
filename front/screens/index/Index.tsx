import { Dropdown } from "react-native-element-dropdown";
import React, { useContext, useEffect, useState } from 'react';
import { Container } from "./Index.style";
import { getDistance, getPreciseDistance } from 'geolib'
import { LocationObject, getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { IMensagens, mensagensMock, veiculosMock } from "../../mocks/veiculos";
import { rotaDois, rotaUm } from "../../mocks/coordenadas";
import { initializeSocket, getSocket } from "../../service.map";
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { Marker } from "react-native-maps";
import MapComponent from "../../components/map/Map";
import { AuthContext } from "../../contexts/authContext";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { listarVeicuosDisponiveis, listarMensagensStatus } from "../../services/services";
import { Veiculos } from "../../tipos/tipos";
import { toVeiculos } from "../../dto/veiculos.dto";
import { toMensagens } from "../../dto/mensagens.dto";




export default function Index() {

  const { token, logout } = useContext(AuthContext);
  const [location, setLocation] = useState<LocationObject | null>(null)
  // const [veiculos, setVeiculos] = useState<Array<Veiculos>>(veiculosMock)
  const [veiculos, setVeiculos] = useState<Array<Veiculos> | null>(null)
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<Veiculos>()
  const [isFocus, setIsFocus] = useState(false);
  const [contador, setContador] = useState<number>(0);
  const [instancia, setInstancia] = useState<any>(null);
  const [localizacaoTransporte, setLocalizacaoTransportes] = useState<any>(null)
  const [mensagensVeiculo, setMensagensveiculo] = useState<Array<IMensagens>>(mensagensMock)
  const [mensagensVeiculoSelecionada, setMensagensveiculoSelecionada] = useState<IMensagens>()
  const [exibirComboStatus, setExibirComboStatus] = useState<boolean>(false);
  const [transporteUm, setTransporteUm] = useState<any>(null);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [popupVisible, setPopupVisible] = useState(false);
  const transporteUmMock = rotaUm
  const transporteDoisMock = rotaDois

  useEffect(() => {
    if(token == null){
      navigation.navigate('login');
    }
    conectarSocket()
    requestLocationPermition()
  }, [])
  
  useEffect(() => {
    listarVeiculos()
  },[instancia])
  
  useEffect(() => {
    listarMensagens()
  },[])

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

  useEffect(() => {
    if (contador === 4) {
      setPopupVisible(true);
    }
  }, [contador]);

  const conectarSocket = () => {
    const socket = initializeSocket('http://192.168.18.29:3000')//ipv4 ipconfig rede sem fio
    if(socket) setInstancia(socket);

    return () => {
      socket.disconnect()
    }
  }

  const listarVeiculos = async () => {
    if(instancia){
      instancia.emit('getListaVeiculos',{localizacao:location?.coords})
      instancia.on('listaDeVeiculos',(lista:any) => {
        let listaVeiculo = lista.listaVeiculos;
        let veiculos = listaVeiculo.map((data:any) => {
          return{
            id: data.id,
            name:data.trajeto
          }
        })
        setVeiculos(veiculos)
      })
    }
  }

  const listarMensagens = async() => {
    try {
      let mensagens = await listarMensagensStatus();
      mensagens = mensagens.map((m:any) => {
        return toMensagens(m)
      })
      setMensagensveiculo(mensagens)
    } catch (error) {
      alert('error mensagnes' + error)
    }
  }

  const modificarLocalizacao = (localizacao:any) => {
    let userLocation = { latitude: Number(location?.coords.latitude), longitude: Number(location?.coords.longitude)}
    // let userLocation = { latitude: Number(-22.37328318846145), longitude: Number(-41.80716902301546)}
    const distance = getPreciseDistance(
      userLocation,
      localizacao
    );
    if(distance<=2){
      setContador(prevContador => prevContador + 1)
    }
      console.log('distancia', distance)
    setLocalizacaoTransportes(localizacao)
    // setPopupVisible(true)
  }

  async function requestLocationPermition() {
    const { granted } = await requestForegroundPermissionsAsync()

    if (granted) {
      const currentPosition = await getCurrentPositionAsync()
      // console.log('current position', currentPosition)
      setLocation(currentPosition)
      
    }
  }

  const selecionaVeoculo = (veiculo: any) => {
    // console.log('veiculo', veiculo.id)

    if(instancia){
      instancia.emit('selecionarVeiculo', veiculo.id)
      setVeiculoSelecionado(veiculo)
    }
  }

  const selecionarStatusVeiculo = (mensagem:any) => {
    // console.log('mensagem', mensagem)

    setMensagensveiculoSelecionada(mensagem);
  }

  const onClosePopup = () => {
    setPopupVisible(false)
    setContador(0)
  }

  const onExibirComboStatus = (exibir:boolean) => {
    setExibirComboStatus(exibir)
    if(exibir) setContador(5)
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
      {
        veiculos !== null 
        ?(

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
              setContador(0);
              setExibirComboStatus(false)
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
        :<></>
      }
      {
        location !== null ? (
          <MapComponent 
            localizacao={localizacaoTransporte}
            localizacaoUsuario={location} 
            popupVisible={popupVisible} 
            setPopupVisible={onClosePopup} 
            setExibirComboStatus={onExibirComboStatus}         
          ></MapComponent>
        ) : (<></>)
      }
      {
        (veiculoSelecionado != null || veiculoSelecionado != undefined ) && exibirComboStatus
        ?(
          <Dropdown
            style={[styles.dropdownMensagem]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={mensagensVeiculo}
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