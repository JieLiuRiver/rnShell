

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
var Icon = require('react-native-vector-icons/FontAwesome')

export default class VectorIcons extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Icon.Button    //在图片后加文字
          name="facebook"
          backgroundColor="#3b5998"
          onPress={this.loginWithFacebook} //点击该按钮后触发的方法
          >
          Login with Facebook
        </Icon.Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
