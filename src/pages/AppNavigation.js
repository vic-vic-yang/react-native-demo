/**
 * 导航配置
 */
import React from "react";
import {DeviceEventEmitter, ToastAndroid} from "react-native";
import {Actions, Reducer, Router, Scene} from "react-native-router-flux";
import Images from '../commons/Images'
import Theme from '../commons/Theme'
import Login from "./account/Login";
import Home from "./home/index";
import Demo from "./demo/index";
import DemoList from "./demo/list";
import DemoMap from "./demo/map";
//关闭黄色警告
console.disableYellowBox = true;

const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        this._navigation = state ? state.index : 0;
        return defaultReducer(state, action);
    };
};
const getSceneStyle = () => ({
    backgroundColor: "#fff"
});
export default class AppNavigation extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <Router
            createReducer={reducerCreate}
            getSceneStyle={getSceneStyle}
            backAndroidHandler={() => {
                if (this._navigation && this._navigation >= 1) {
                    DeviceEventEmitter.emit("back");
                    Actions.pop();
                    Actions.refresh({isRefresh: true})
                    return true;
                }
                if (this.lastBackPressed && this.lastBackPressed + 2000 > Date.now()) {
                    return false;
                }
                this.lastBackPressed = Date.now();
                ToastAndroid.show("再按一次退出应用", ToastAndroid.SHORT);
                return true;
            }}>
            <Scene key="root" navigationBarStyle={{backgroundColor:Theme.backgroundColor}} titleStyle={{color:'#fff'}} backButtonImage={Images.Back} >
                <Scene component={Login} key="Login" hideNavBar={true}/>
                <Scene component={Home} key="Home" title='Home' />
                <Scene component={Demo} key="Demo" title='Demo' />
                <Scene component={DemoList} key="DemoList" title='DemoList' />
                <Scene component={DemoMap} key="DemoMap" title='DemoMap' />
                
                
               
            </Scene>
        </Router>
    }
}
