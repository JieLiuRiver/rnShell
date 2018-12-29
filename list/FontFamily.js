

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

export default class Actionsheet extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontFamily: 'Sujeta', fontSize: 40}}>HELLO WORLD</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  	flex: 1,
  	justifyContent: 'center',
  	alignItems: 'center'
  }
});

