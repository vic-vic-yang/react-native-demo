
import { StyleSheet,Dimensions } from "react-native"
var theme = require("./Theme")
import {px2dp,px2sp} from './Adapt'

module.exports = {
    // titleText : {
    //     fontWeight: 'bold',
    //     ...theme.title
    // },
    // container1: {
    //     backgroundColor: theme.backgroundColor
    // },
    // container2: {
    //     backgroundColor: theme.backgroundColor
    // },
    // content: {
    //     ...theme.content
    // },
    color_theme:"#78c6b8",
    color_theme_gray:"#bbe8e1",
    color_white:"#fff",

    size_11:px2sp(11),
    size_13:px2sp(13),
    size_15:px2sp(14),
    size_17:px2sp(15),

    WIDTH : Dimensions.get('window').width,
    HEIGHT : Dimensions.get('window').height,

}