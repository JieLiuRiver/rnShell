/**
 * 更多菜单
 * @flow
 */
'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, TouchableOpacity, StyleSheet, Image, DeviceInfo, View, Text} from 'react-native'

export default class MenuDialog extends Component {
    state = {
        visible: false
    };

    show() {
        this.setState({
            visible: true
        })
    }

    dismiss() {
        this.setState({
            visible: false
        })
    } 

    render() {
        const {onClose, menus, onSelect, theme} = this.props;
        return (<Modal
            transparent={true}
            visible={this.state.visible}
            onRequestClose={() => onClose()}
        >
            <TouchableOpacity
                style={styles.container}
                onPress={() => this.dismiss()}
            >
                <Image
                    source={require('../res/images/arrow_top.png')}
                    style={styles.arrow}
                />
                <View
                    style={styles.content}
                >
                    {menus.map((result, i, arr) => {
                        let menu = arr[i];
                        return <TouchableOpacity
                            key={i}
                            onPress={() => {
                                onSelect(arr[i])
                            }}
                            underlayColor={'transparent'}
                        >
                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <Image source={menu.icon}
                                       resizeMode={'stretch'}
                                       style={[styles.icon, theme.styles.tabBarSelectedIcon]}
                                />
                                <Text
                                    style={styles.text}
                                >{menu.name}</Text>
                                {
                                    i !== menus.length - 1 ? <View
                                        style={styles.line}
                                    /> : null
                                }
                            </View>
                        </TouchableOpacity>
                    })}
                </View>
            </TouchableOpacity>
        </Modal>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'flex-end'
    },
    arrow: {
        marginTop: 56 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0),
        width: 16,
        height: 6,
        marginRight: 18,
        resizeMode: 'contain'
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 3,
        paddingTop: 3,
        paddingBottom: 3,
        marginRight: 3
    },
    text: {
        fontSize: 16,
        color: 'black',
        fontWeight: '400',
        paddingRight: 15
    },
    line: {
        height: 0.3,
        backgroundColor: 'darkgray'
    },
    icon: {
        width: 16,
        height: 16,
        margin: 10,
        marginLeft: 15
    }
});
MenuDialog.propTypes = {
    menus: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    theme: PropTypes.object,
    onClose: PropTypes.func
};
MenuDialog.defaultProps = {
    menus: []
};