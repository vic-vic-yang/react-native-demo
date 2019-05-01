import React, { Component } from 'react'
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Actions } from "react-native-router-flux";
const dataArray = [
    {
        title: '地图', image: '', page: "DemoMap"
    },

]

export default class list extends Component {

    renderItem({item}) {
        console.log("========",item)
        return (
            <TouchableOpacity onPress={() => { Actions.push(item.page) }} style={styles.item}>
                <Text>{item.title}</Text>
            </TouchableOpacity>
        )

    }

    render() {
        return (
            <FlatList
                style={{ flex: 1 }}
                removeClippedSubviews={false}
                data={dataArray}
                renderItem={this.renderItem}
            />
        )
    }
}
const styles = StyleSheet.create({
    item: {
        height: 44,
        justifyContent: "center",
        alignItems: 'center'

    }
})