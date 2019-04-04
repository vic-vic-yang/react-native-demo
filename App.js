import React, {Component} from "react";
import { AppRegistry, View, Text } from "react-native";

import Root from "./src/root";


class AppRoot extends Component {
    constructor(props) {
        super(props);
    }
    
    componentWillMount(){
    }

    componentDidMount() {

    }
   
    componentWillMount() {}

    render() {
          return <Root/>;
    }
}

AppRegistry.registerComponent("reactNativeDemo", () => AppRoot);
