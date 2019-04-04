var {StyleSheet} = React;
var theme = require("./theme")

module.exports = StyleSheet.create({
    titleText : {
        fontWeight: 'bold',
        ...theme.title
    },
    container1: {
        background: theme.backgroundColor
    },
    container2: {
        background: theme.backgroundColor
    },
    content: {
        ...theme.content
    }
})