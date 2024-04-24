import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { Marker } from "react-native-maps";
import { MapIcon, Map, BusTitle, BusTitleContainer } from "./Map.style";
import { LocationObject } from "expo-location";
import Popup from '../popup/Popup';
import { Veiculos } from '../../tipos/tipos';

interface IMapProps {
    localizacao: LocationObject | any;
    localizacaoUsuario:LocationObject | any;
    popupVisible:boolean,
    compartilhandoLocalizacao:boolean,
    setPopupVisible:Function,
    setExibirComboStatus:Function,
    veiculo:Veiculos | undefined,
    isLoading:boolean
    setIsLoading:Function,
}

export default function MapComponent({localizacao, localizacaoUsuario,popupVisible,setPopupVisible,setExibirComboStatus,compartilhandoLocalizacao,veiculo,isLoading,setIsLoading}:IMapProps) {
    const [transporte, setTransporte] = useState<any>(null)
    useEffect(() => {
        if(localizacao != null){
            mudarLocalizacao()
        }
    }, [isLoading, localizacao, compartilhandoLocalizacao])


    const mudarLocalizacao = () => {
        console.log('localizacao maps', localizacao)
        setTransporte(localizacao)
        setIsLoading(false)
    }

    const handleEmbarqueConfirmado = (enviarMensagem:boolean) => {
        console.log('enviar mensagens', enviarMensagem)
        setPopupVisible(false);
        setExibirComboStatus(enviarMensagem)
    };

    return (
        <>
        { isLoading ? (
            <>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>{ veiculo
                    ?'Solicitando Informações'
                    :'Escolha um veiculo para abrir o Mapa'
                }</Text>
            </>
            )

            : (
            <Map
                initialRegion={{
                    latitude: localizacaoUsuario.coords.latitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                    longitude: localizacaoUsuario.coords.longitude
                }}
                >{ compartilhandoLocalizacao == false &&
                    (<Marker
                        coordinate={{
                            latitude: localizacaoUsuario.coords.latitude,
                            longitude: localizacaoUsuario.coords.longitude
                        }}
                    >
                        <MapIcon
                            source={require('../../assets/icons/person.png')}
                        ></MapIcon>
                        {/* <BusTitleContainer>
                            <BusTitle>Eduardo</BusTitle>
                        </BusTitleContainer> */}
                    </Marker>)
                }
                {
                    transporte &&
                    <Marker
                        coordinate={{
                            latitude: transporte.latitude,
                            longitude: transporte.longitude
                        }}
                    >

                        <BusTitleContainer>
                            <BusTitle>{veiculo?.name}</BusTitle>
                            <BusTitle>{localizacao && localizacao.status != null ?localizacao.status : ""}</BusTitle>
                        </BusTitleContainer>
                        <MapIcon
                            source={require('../../assets/icons/bus.png')}
                        ></MapIcon>
                    </Marker>
                }
            </Map>)
        }
        <Popup
            visible={popupVisible}
            onClose={() => setPopupVisible(false)}
            onEmbarqueConfirmado={handleEmbarqueConfirmado}
        />
        </>

        

    )
}