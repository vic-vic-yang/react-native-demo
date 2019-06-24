/*
 * @Description: 
 * @Author: shaobo
 * @Date: 2019-05-01 11:16:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-06-03 17:43:01
 * @Params: in
 * @Test: Use example
 */
import React, { Component } from 'react'
import { FlatList, View, TouchableOpacity, StyleSheet, Text, Image } from "react-native"
import { Actions } from "react-native-router-flux";
import { px2dp, px2sp } from '../../commons/Adapt'
import Images from '../../commons/Images'
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map'
const { Marker, Arc, Circle, Polyline, Polygon, InfoWindow } = Overlay


export default class map extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mapType: 1,
            zoom: 16,
            center: { latitude: 39.9491765406, longitude: 116.8132195060 },
            markers: [],
            dataSource: [],
            curLocation: { latitude: 39.9491765406, longitude: 116.8132195061 }
        }
        this.curIndex = 0

    }
    componentWillMount() {
        //this.geocode()
    }

    intitData(data) {
        this.curIndex = 0
        data[0].select = true
        this.setState({
            dataSource: data || []
        })
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
                    this.reverseGeoCode(data.latitude, data.longitude)
                }
            })
            .catch(e => {
                console.warn(e, 'error');
            })
    }

    reverseGeoCode = (lat, lng) => {
        let _this = this
        Geolocation.reverseGeoCode(lat, lng)
            .then(data => {
                console.log('reverseGeoCode=======', data);
                _this.intitData(data.poiList)
            })
            .catch(e => {
                console.warn(e, 'error');
            })
    }
    getCurrentPosition = () => {
        Geolocation.getCurrentPosition()
            .then(data => {
                console.log('getCurrentPosition====', data);
                alert(JSON.stringify(data))
                this.setState({
                    center: {
                        longitude: data.longitude,
                        latitude: data.latitude
                    },
                })
                this.reverseGeoCode(data.latitude, data.longitude)
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
        this.setState({
            center: { latitude: data.target.latitude, longitude: data.target.longitude },
        })
        this.reverseGeoCode(data.target.latitude, data.target.longitude)
    }

    onMapLoaded = (data) => {
        console.log('onMapLoaded=======', data);
    }

    onMapDoubleClick = (data) => {
        console.log('onMapDoubleClick=======', data);
    }

    //点击标记点
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

    itemClick = (item, index) => {
        let data = [...this.state.dataSource]

        data[this.curIndex].select = false
        data[index].select = true
        this.curIndex = index
        console.log("========", data)
        this.setState({
            dataSource: data,
            center: { latitude: item.latitude, longitude: item.longitude },
        })

    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.address} onPress={() => this.itemClick(item, index)} activeOpacity={0.75}>
                <View>
                    <Text style={styles.text_1}>{item.name}</Text>
                    <Text style={styles.text_2}>{item.address}</Text>
                </View>
                {item.select && <Image style={styles.image_sel} source={Images.Location_sel}></Image>}

            </TouchableOpacity>
        )

    }

    renderEmptyView = () => {

    }

    _keyExtractor = (item, index) => item.name;

    render() {
        let { mapType, zoom, center, markers } = this.state
        return (
            <View style={styles.contain}>
                <MapView style={{ height: px2dp(200) }}
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

                    <Marker
                        location={this.state.curLocation}
                        title={"sss"}
                    ></Marker>

                </MapView>
                <FlatList
                    style={styles.list}
                    removeClippedSubviews={false}
                    keyExtractor={this._keyExtractor}
                    onEndReachedThreshold={0.1}
                    ref={ref => this._flatList = ref}
                    data={this.state.dataSource}
                    renderItem={this.renderItem}
                    //ListEmptyComponent={this.renderEmptyView}
                    {...this.props}
                />
            </View>

        )
    }
}
const styles = StyleSheet.create({
    contain: {
        flex: 1,
        backgroundColor: "#fff"

    },
    address: {
        backgroundColor: '#fff',
        padding: px2dp(16),
        paddingTop: px2dp(4),
        paddingBottom: px2dp(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text_1: {
        fontSize: px2sp(15),
        color: '#333'
    },
    text_2: {
        fontSize: px2sp(13),
        color: '#999'
    },
    image_sel: {
        height: px2dp(13),
        width: px2dp(13)
    },
    list: {
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: px2dp(16),
    }
})