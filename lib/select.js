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

const Option = require('./option');
const SELECT = 'SELECT';

const styles = StyleSheet.create({
    container: {
        borderColor: '#BDBDC1',
        borderWidth: 1,
        position: 'relative',
    },
    icon: {
        position: 'absolute',
        right: 0,
        height: '100%',
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

class Select extends Component {
    constructor(props) {
        super(props);

        this.pageX = 0;
        this.pageY = 0;

        let defaultValue = props.defaultValue;

        if (!defaultValue) {
            if (Array.isArray(props.children)) {
                defaultValue = props.children[0].props.children;
            } else {
                defaultValue = props.children.props.children;
            }
        }

        this.state = {
            value: defaultValue,
        };
    }

    isShowing = false;

    reset() {
        const { defaultValue } = this.props;
        this.setState({ value: defaultValue });
    }

    _currentPosition(pageX, pageY) {
        this.pageX = pageX;
        this.pageY = pageY + this.props.height;
    }

    _onPress() {
        const { optionListRef, children, onSelect, width, height } = this.props;

        if (!children.length) {
            return false;
        }

        if (this.isShowing) {
            //close
            this.isShowing = false;
            optionListRef()._hide();
        } else {
            this.isShowing = true;

            optionListRef()._show(
                children,
                this.pageX,
                this.pageY,
                width,
                height,
                (item, value = item) => {
                    if (item) {
                        onSelect(value);
                        this.isShowing = false;
                        this.setState({
                            value: item,
                        });
                    }
                },
            );
        }
    }

    render() {
        const {
            width,
            height,
            children,
            defaultValue,
            style,
            styleOption,
            styleText,
            icon,
        } = this.props;
        const dimensions = { width, height };

        return (
            <TouchableWithoutFeedback onPress={this._onPress.bind(this)}>
                <View ref={SELECT} style={[styles.container, style, dimensions]}>
                    <Option style={styleOption} styleText={styleText}>
                        {this.state.value}
                    </Option>
                    {icon && <View style={styles.icon}>{icon}</View>}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

Select.propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    optionListRef: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    icon: PropTypes.any,
};

Select.defaultProps = {
    width: 200,
    height: 40,
    onSelect: () => {},
    icon: null,
};

module.exports = Select;
