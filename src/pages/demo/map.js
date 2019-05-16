import React, { Component } from 'react'
import { FlatList, View, Text, TouchableOpacity ,StyleSheet} from "react-native"
import { Actions } from "react-native-router-flux";
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map'
const { Marker, Arc, Circle, Polyline, Polygon, InfoWindow } = Overlay
export default class map extends Component {


    render() {
        return (
            <View style={styles.contain}> 
                <MapView style={{height:400}}>

                </MapView>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    contain: {
       flex:1,
       backgroundColor:"#fff"

    }
})