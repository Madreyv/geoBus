import styled from 'styled-components/native';
import MapView from 'react-native-maps';
import { Dropdown } from 'react-native-element-dropdown';


export const Container = styled.View`
    flex: 1%;
    background-color: #fff;
    align-items:center;
    justify-content: center ;
`
export const MapDropDown = styled(Dropdown)`
    flex:1;
    width:100% ;
    background-color: #fff;
    border-radius: 10;
    border-color : blue;
    border-width: 1;
    padding: 10;
 
   /* { placeholderStyle={styles.placeholderStyle}
    selectedTextStyle={styles.selectedTextStyle}
    inputSearchStyle={styles.inputSearchStyle}
    iconStyle={styles.iconStyle}} */
`

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