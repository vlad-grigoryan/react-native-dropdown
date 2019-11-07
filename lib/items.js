import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    ScrollView,
    TouchableWithoutFeedback,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    scrollView: {
        height: 120,
        width: '100%',
    },
    container: {
        width: '100%',
        position: 'absolute',
        elevation: 1000,
        borderColor: '#BDBDC1',
        borderWidth: 1,
        borderTopColor: 'transparent',
    },
});

class Items extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { items, positionX, positionY, show, onPress, width, height } = this.props;

        if (!show) {
            return null;
        }

        const renderedItems = React.Children.map(items, item => {
            return (
                <TouchableWithoutFeedback
                    onPress={() => onPress(item.props.children, item.props.value)}>
                    <View>{item}</View>
                </TouchableWithoutFeedback>
            );
        });

        return (
            <View style={[styles.container, { top: positionY, left: positionX }]}>
                <ScrollView
                    style={{ width: width - 2, height: height * 3 }}
                    automaticallyAdjustContentInsets={false}
                    bounces={false}>
                    {renderedItems}
                </ScrollView>
            </View>
        );
    }
}

Items.propTypes = {
    positionX: PropTypes.number,
    positionY: PropTypes.number,
    show: PropTypes.bool,
    onPress: PropTypes.func,
};

Items.defaultProps = {
    width: 0,
    height: 0,
    positionX: 0,
    positionY: 0,
    show: false,
    onPress: () => {},
};

module.exports = Items;
