/** 
 * 
*/

import React, { Component, PureComponent } from 'react'
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Image, } from "react-native"
import { Actions } from "react-native-router-flux";
import ListData from './ListData'
import { px2dp, px2sp } from '../../commons/Adapt'
import Images from '../../commons/Images'

const LINE_HEIGHT = 100

class MyListItem extends PureComponent {
    _onPress = () => {
        this.props.onPressItem();
    };

    render() {
        console.log('==================================', this.props.index)
        let item = this.props.item
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View style={[styles.item, item.select && { backgroundColor: 'red' }]}  >
                    {item.showImg ? <Image source={{ uri: item.src }} style={styles.header} resizeMode={'contain'} />
                        : <Image source={Images.Default} style={styles.header} resizeMode={'contain'} />}

                    <View>
                        <Text style={{ fontSize: 15, color: '#333' }}>
                            {item.title + '--------' + this.props.index}
                        </Text>
                        <Text style={{ fontSize: 13, color: '#666' }} numLines={2}>
                            {item.describe}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default class ComListNew extends Component {

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
        console.log('================', index)

        //加了 getItemLayout  后 extraData={this.state} 失效，必须要重新copy一下原数据才能实现更新状态
        let data = JSON.parse(JSON.stringify(this.state.dataSource))
        data[index].select = data[index].select ? false : true
        this.setState({
            dataSource: data
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
        console.log('A============================', index)
        return (
            // <TouchableOpacity onPress={() => this._onPress(item, index)}>
            //     <View style={[styles.item, item.select && { backgroundColor: 'red' }]}  >
            //         <Image source={{ uri: item.src }} style={styles.header} resizeMode={'contain'} />
            //         <View>
            //             <Text style={{ fontSize: 15, color: '#333' }}>
            //                 {item.title + '--------' + index}
            //             </Text>
            //             <Text style={{ fontSize: 13, color: '#666' }} numLines={2}>
            //                 {item.describe}
            //             </Text>
            //         </View>
            //     </View>
            // </TouchableOpacity>
            <MyListItem
                onPressItem={() => this._onPress(item, index)}
                item={item}
                index={index}
            />

        );
    }

    itemSeparatorComponent = () => {
        //分割线
        return (
            <View style={{ height: px2dp(1), backgroundColor: '#ccc' }}>

            </View>
        )
    }

    _keyExtractor = (item, index) => index;//直接用index做标识的话，一旦列表顺序发生变化，例如往列表头插入数据，就会导致大量单元行的刷新
    getItemLayout = (item, index) => (
        { length: px2dp(LINE_HEIGHT + 1), offset: px2dp((LINE_HEIGHT + 1) * index), index }//计算每行的高度 及偏移量
    )
    onViewableItemsChanged = (info) => {  //图片懒加载实现
        //console.log('==============', info)
        let changed = info.changed
        if (changed) {
            let data = JSON.parse(JSON.stringify(this.state.dataSource))
            let willShow = false
            for (let item of changed) {
                //console.log('==============', item)
                let index = item.index
                if (!item.showImg) {
                    data[index].showImg = true
                    willShow = true
                }
            }
            if (willShow) {
                this.setState({
                    dataSource: data
                })

            }
        }

    }
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

                getItemLayout={this.getItemLayout}
                initialNumToRender={6} //指定一开始渲染的元素数量，最好刚刚够填满一个屏幕，永远不会被卸载掉
                removeClippedSubviews={true}

                onViewableItemsChanged={this.onViewableItemsChanged}

            />
        );
    }
}
const styles = StyleSheet.create({
    item: {
        height: px2dp(LINE_HEIGHT),
        flexDirection: 'row',
        alignItems: 'center'
    },
    header: {
        height: px2dp(88),
        width: px2dp(88),
        marginRight: px2dp(16),
    },
    fetchingView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
})