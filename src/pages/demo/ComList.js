import React, { Component, PureComponent } from 'react'
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Image, } from "react-native"
import { Actions } from "react-native-router-flux";
import ListData from './ListData'

export default class ComList extends Component {

    constructor(props) {
        super(props)
        this._flatList = null
        this.state = {
            dataSource: JSON.parse(JSON.stringify(ListData)),
            isRefreshing: false,
            paginationStatus: false
        }
    }


    renderItem({ item }) {
        console.log("========", item)
        return (
            <TouchableOpacity onPress={() => { Actions.push(item.page) }} style={styles.item}>
                <Text>{item.title}</Text>
            </TouchableOpacity>
        )

    }

    _onPress = (item, index) => {
        this.state.dataSource[index].select = this.state.dataSource[index].select ? false : true
        this.setState({
            dataSource: this.state.dataSource
        })

    }

    onRefresh = () => {
        this.setState({
            isRefreshing: true
        })
        setTimeout(() => {
            this.setState({
                isRefreshing: false,
                dataSource: JSON.parse(JSON.stringify(ListData))
            })
        }, 2000)


    }

    onEndReached = () => {
        console.log('onEndReached()');
        if (!this.state.paginationStatus) {
            this.setState({
                paginationStatus: true
            })
            setTimeout(() => {
                this.setState({
                    paginationStatus: false,
                    dataSource: this.state.dataSource.concat(JSON.parse(JSON.stringify(ListData)))
                })
            }, 2000)
        }


    }
    renderFooter = () => {
        if (this.state.paginationStatus) {
            return (
                <View style={styles.fetchingView}>
                    <Text style={{ fontSize: 13, color: '#999' }}>加载中...</Text>
                </View>
            )
        }
        else {
            return (
                <View >
                </View>
            )
        }

    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => this._onPress(item, index)}>
                <View style={[styles.item, item.select && { backgroundColor: 'red' }]}  >
                    <Image source={{ uri: item.src }} style={styles.header} resizeMode={'contain'} />
                    <View>
                        <Text style={{ fontSize: 15, color: '#333' }}>
                            {item.title + '--------' + index}
                        </Text>
                        <Text style={{ fontSize: 13, color: '#666' }} numLines={2}>
                            {item.describe}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    itemSeparatorComponent = () => {
        //分割线
        return (
            <View style={{ height: 1, backgroundColor: '#ccc' }}>

            </View>
        )
    }

    _keyExtractor = (item, index) => index;

    render() {
        return (
            <FlatList
                ref={ref => this._flatList = ref}
                data={this.state.dataSource}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                ItemSeparatorComponent={this.itemSeparatorComponent}
                onRefresh={this.onRefresh}
                refreshing={this.state.isRefreshing}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={0.1}
                ListFooterComponent={this.renderFooter}
            />
        );
    }
}
const styles = StyleSheet.create({
    item: {
        padding: 16,
        flexDirection: 'row',
    },
    header: {
        height: 88,
        width: 88,
        marginRight: 16
    },
    fetchingView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
})