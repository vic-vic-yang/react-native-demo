import React, { Component } from "react"
import { View, Modal, Text, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from "react-native"
import { px2dp, px2sp } from '../../commons/Adapt'
import GlobalStyles from '../../commons/GlobalStyles'
import Images from '../../commons/Images'
import {Actions} from "react-native-router-flux";



export default class Login extends Component {
    constructor(props) {
        super(props)
    }



    getBtn(type, name, callBack) {
        return (

            // < View style = { [styles.btn_wrap, styles.center]} >
            <TouchableOpacity style={[styles.btn, styles.center]} onPress={callBack} activeOpacity={0.7}>
                <Text style={styles.btn_text}>{name}</Text>

            </TouchableOpacity>
            // </View >
        )
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#f7ffff' }}>

                <Text style={styles.title}>Welcome Home</Text>
                <View style={styles.title_line} />
                <Image style={styles.image} source={Images.Logo}></Image>
                <View style={styles.btn_view}>
                    {this.getBtn('1', 'Sign in', ()=>{Actions.Home()})}
                    {this.getBtn('2', 'Demo', ()=>{Actions.Demo()})}
                </View>
                <View style={styles.bottom_view}>
                    <TouchableOpacity onPress={()=>{Actions.Home()}} activeOpacity={0.7} style={styles.center}>
                        <Text style={styles.else}>Or else</Text>
                        <Image style={styles.image_home} source={Images.Home}></Image>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    title: {
        fontSize: px2sp(24),
        color: GlobalStyles.color_theme,
        marginTop: px2dp(70),
    },
    title_line: {
        height: px2dp(1),
        width: px2dp(70),
        backgroundColor: GlobalStyles.color_theme
    },
    image: {
        height: px2dp(140),
        width: px2dp(140),
        tintColor: GlobalStyles.color_theme,
        marginTop: px2dp(60),
        marginBottom: px2dp(80),
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn_view: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    btn: {
        height: px2dp(32),
        width: px2dp(120),
        borderRadius: px2dp(24),
        borderColor: GlobalStyles.color_theme,
        borderWidth: px2dp(1),
        // shadowColor: GlobalStyles.color_theme,
        // shadowOpacity: 0.1,
        // shadowOffset: { width: 4, height: 4 },
        // shadowRadius: px2dp(1),
        // elevation: px2dp(1)
    },
    btn_text: {
        fontSize: GlobalStyles.size_13,
        color: GlobalStyles.color_theme
    },
    bottom_view: {
        position: 'absolute',
        width: GlobalStyles.WIDTH * 4,
        height: GlobalStyles.WIDTH * 4,
        backgroundColor: GlobalStyles.color_theme,
        borderRadius: GlobalStyles.WIDTH * 2,
        bottom: -GlobalStyles.WIDTH * 2 - 730,
        right: -GlobalStyles.WIDTH * 2 + 204,
        alignItems: 'center'
    },
    else: {
        fontSize: px2sp(22),
        color: '#fff',
        marginTop: px2dp(8),
    },
    image_home: {
        height: px2dp(28),
        width: px2dp(28),
        tintColor: "#fff",
    },

})
