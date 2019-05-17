/*
 * @Description: 
 * @Author: shaobo
 * @Date: 2019-05-01 11:16:20
 * @LastEditors: shaobo
 * @LastEditTime: 2019-05-17 14:39:40
 * @Params: in
 * @Test: Use example
 */
import React, { Component } from 'react'
import { FlatList, View, TouchableOpacity, StyleSheet } from "react-native"
import { Actions } from "react-native-router-flux";
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map'
const { Marker, Arc, Circle, Polyline, Polygon, InfoWindow, Text } = Overlay
export default class map extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mapType: 1,
            zoom: 16,
            center: { latitude: 39.9491765406, longitude: 116.8132195060 },
            markers: []

        }

    }
    componentWillMount() {
        this.geocode()
    }


    componentDidMount() {
        this.getCurrentPosition()
    }

    setMarker = () => {

    }

    geocode = () => {
        Geolocation.geocode('成都市', '天府广场')
            .then(data => {
                console.log('geocode', data);
                if (data) {
                    this.setState({
                        center: data,
                    })
                }
            })
            .catch(e => {
                console.warn(e, 'error');
            })
    }

    reverseGeoCode = (lat, lng) => {
        Geolocation.reverseGeoCode(lat, lng)
            .then(data => {
                console.log('reverseGeoCode=======', data);
            })
            .catch(e => {
                console.warn(e, 'error');
            })
    }
    getCurrentPosition = () => {
        Geolocation.getCurrentPosition()
            .then(data => {
                console.log('getCurrentPosition====', data);
            })
            .catch(e => {
                console.warn(e, 'error');
            })
    }

    //Android only
    onMapStatusChangeStart = (data) => {
        console.log('onMapStatusChangeStart=======', data);
    }

    onMapStatusChange = (data) => {
        console.log('onMapStatusChange=======', data);
    }

    //Android only
    onMapStatusChangeFinish = (data) => {
        console.log('onMapStatusChangeFinish=======', data);
    }

    onMapLoaded = (data) => {
        console.log('onMapLoaded=======', data);
    }

    onMapDoubleClick = (data) => {
        console.log('onMapDoubleClick=======', data);
    }

    onMarkerClick = (data) => {
        console.log('onMarkerClick=======', data);
    }

    //点击地图标记物回调
    onMapPoiClick = (data) => {
        console.log('onMapPoiClick=======', data);

        this.setState({
            center: { latitude: data.latitude, longitude: data.longitude },
        })
        this.reverseGeoCode(data.latitude, data.longitude)
    }

    //点击地图回调
    onMapClick = (data) => {
        console.log('onMapClick=======', data);
        this.setState({
            center: data,
        })
        this.reverseGeoCode(data.latitude, data.longitude)
    }




    render() {
        let { mapType, zoom, center, markers } = this.state
        return (
            <View style={styles.contain}>
                <MapView style={{ height: 400 }}
                    zoomControlsVisible={true}
                    trafficEnabled={false}
                    baiduHeatMapEnabled={false}
                    mapType={mapType}
                    zoom={zoom}
                    center={center}
                    onMapStatusChangeStart={(data) => this.onMapStatusChangeStart(data)}
                    onMapStatusChange={(data) => this.onMapStatusChange(data)}
                    onMapStatusChangeFinish={(data) => this.onMapStatusChangeFinish(data)}
                    onMapLoaded={(data) => this.onMapLoaded(data)}
                    onMapClick={(data) => this.onMapClick(data)}
                    onMapDoubleClick={(data) => this.onMapDoubleClick(data)}
                    onMarkerClick={(data) => this.onMarkerClick(data)}
                    onMapPoiClick={(data) => this.onMapPoiClick(data)}
                >
                    <Marker
                        location={center}
                        title={"sss"}
                    ></Marker>
                </MapView>

            </View>

        )
    }
}
const styles = StyleSheet.create({
    contain: {
        flex: 1,
        backgroundColor: "#fff"

    }
})