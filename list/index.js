/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';


export default class List extends Component {
  
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
          <Button title="react-native-actionsheet" onPress={() => {
              navigation.navigate('Actionsheet', {title: 'ReactNativeActionsheet'})
          }}/>
          <Button title="antd-mobile-rn" onPress={() => {
              navigation.navigate('AntdMobile', {title: 'AntdMobileRn'})
          }}/>
          <Button title="react-native-fs" onPress={() => {
              navigation.navigate('Fs', {title: 'ReactNativeFs'})
          }}/>
          <Button title="react-native-image-pickers" onPress={() => {
              navigation.navigate('ReactNativeImagePicker', {title: 'ReactNativeImagePicker'})
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center'
  }
});
