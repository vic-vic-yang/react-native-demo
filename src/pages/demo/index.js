import React, { Component } from 'react'
import { View, Modal, Text, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from "react-native"
import {Actions} from "react-native-router-flux";
const dataArray = [
    {
        title: '基础组件', image: '', page: "DemoList"
    },
    {
        title: '三方库', image: '', page: ''
    },
    {
        title: '原生通信bridge', image: '', page: ''
    },
    {
        title: '网络库', image: '', page: ''
    }

]

export default class Demo extends Component {

    renderItem(){

        return (
            dataArray.map(item=>{
                return (

                    <TouchableOpacity onPress={()=>Actions.push(item.page)}  key={item.title} style={styles.item}>
                        <Text>{item.title}</Text>
                    </TouchableOpacity>

                )
               
            })
        )

    }
    render() {
        return (
            <View style={{flex:1}}>
                <ScrollView>
                    {this.renderItem()}
                </ScrollView>
            </View>
        )

    }
}

const styles=StyleSheet.create({
    item:{
        height:44,
        justifyContent:"center",
        alignItems:'center'

    }
})