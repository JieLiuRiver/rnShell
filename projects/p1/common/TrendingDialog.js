/**
 * 更多菜单
 * @flow
 */
'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, TouchableOpacity, StyleSheet, Image, DeviceInfo, View, Text} from 'react-native'
import TimeSpan from '../model/TimeSpan'

export const TimeSpans = [new TimeSpan('今 天', 'since=daily'),
    new TimeSpan('本 周', 'since=weekly'), new TimeSpan('本 月', 'since=monthly')]

export default class TrendingDialog extends Component {
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
        const {onClose, onSelect} = this.props;
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
                    {TimeSpans.map((result, i, arr) => {
                        let menu = arr[i];
                        return <TouchableOpacity
                            key={i}
                            onPress={() => {
                                onSelect(arr[i])
                            }}
                            underlayColor={'transparent'}
                        >
                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <Text
                                    style={styles.text}
                                >{arr[i].showText}</Text>
                                {
                                    i !== TimeSpans.length - 1 ? <View
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
        alignItems: 'center'
    },
    arrow: {
        marginTop: 56 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0),
        width: 16,
        height: 6,
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
        padding: 8,
        paddingLeft: 26,
        paddingRight: 26
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
TrendingDialog.propTypes = {
    onSelect: PropTypes.func.isRequired,
    onClose: PropTypes.func
};