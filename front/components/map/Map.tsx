import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { Marker } from "react-native-maps";
import { MapIcon, Map, BusTitle, BusTitleContainer } from "./Map.style";
import { LocationObject, getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";

interface IMapProps {
    localizacao: LocationObject | any;
    localizacaoUsuario:LocationObject | any;
}

export default function MapComponent({localizacao, localizacaoUsuario}:IMapProps) {
    const [location, setLocation] = useState<LocationObject | any>(null)
    const [isLoading, setIsLoading] = useState(true);
    const [transporteUm, setTransporteUm] = useState<any>(null)


    useEffect(() => {
        console.log("localização usuário", localizacaoUsuario)
        // requestLocationPermition()
        console.log('locaização', localizacao)
        if(localizacao != null){
            console.log('localizacao atualizada')
            mudarLocalizacao()
        }
    }, [isLoading, localizacao])


    const mudarLocalizacao = () => {
        setTransporteUm(localizacao)
        setIsLoading(false)
    }

    async function requestLocationPermition() {
        const { granted } = await requestForegroundPermissionsAsync()

        if (granted) {
            const currentPosition = await getCurrentPositionAsync()
            setLocation(currentPosition)
            setIsLoading(false)
            // console.log('localização atual', currentPosition)
        }
    }

    return (
        <>
        { isLoading ? (
            <>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Escolha um veiculo para abrir o Mapa</Text>
            </>
            )

            : (<Map
            initialRegion={{
                latitude: localizacaoUsuario.coords.latitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
                longitude: localizacaoUsuario.coords.longitude
            }}
        >
            <Marker
                coordinate={{
                    latitude: localizacaoUsuario.coords.latitude,
                    longitude: localizacaoUsuario.coords.longitude
                }}
            >
                <MapIcon
                    source={require('../../assets/icons/person.png')}
                ></MapIcon>
                <BusTitleContainer>
                    <BusTitle>Eduardo</BusTitle>
                </BusTitleContainer>
            </Marker>

            {
                transporteUm &&
                <Marker
                    coordinate={{
                        latitude: transporteUm.latitude,
                        longitude: transporteUm.longitude
                    }}
                >

                    <MapIcon
                        source={require('../../assets/icons/bus.png')}
                    ></MapIcon>
                    <BusTitleContainer>
                        <BusTitle>T-11</BusTitle>
                        <BusTitle>Onibus Lotado!</BusTitle>
                    </BusTitleContainer>
                </Marker>
            }
        </Map>)
        }
        </>

        

    )
}