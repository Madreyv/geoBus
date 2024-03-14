import styled from 'styled-components/native';
import MapView from 'react-native-maps';

export const Map = styled(MapView)`
    flex:1;
    width:100% ;
`
export const MapIcon = styled.Image`
    width: 50px;
    height: 50px;
    /* border: 1px solid red ; */
`
export const BusTitleContainer = styled.View`
    background-color: white;
    display:flex;
    justify-content:center;
    align-items:center;
`    
export const BusTitle = styled.Text`
    font-weight: 600;
` 