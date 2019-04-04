/**
 * 根页面
 */
import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Platform
} from 'react-native';
 import { Provider } from 'mobx-react/native';
import AppNavigation from './pages/AppNavigation';

// import CodePush from 'react-native-code-push'
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';
import SplashScreen from 'react-native-splash-screen'
import Stores from './stores/index';
// let codePushOptions = {
//     checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME
// };

class App extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        SplashScreen.hide();
        // if (!__DEV__) {
        //     CodePush.disallowRestart();//禁止重启
        //     AutoUpdateUtil.checkReDWWERactUpdate()
        // }
    }
    componentWillReceiveProps(nextProps) {
        
    }
    shouldComponentUpdate() {
        return false
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {IS_ANDROID && <StatusBar barStyle="light-content" />}
                <Provider {...Stores}>
                    <AppNavigation />
                </Provider>
            </View>
        );
    }
}
// App = CodePush(codePushOptions)(App)
module.exports = App
