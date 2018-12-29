

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View as RNView, ScrollView} from 'react-native';
import {BetterText, BetterView} from '../../components'

export default class DemoText extends Component {
  
  render() {
    return (
      <ScrollView style={{padding: 20, marginBottom: 50}}>
      	<BetterView flex-column-around-center padding-20 height-400 bg-white>
      		<BetterText center size-40 weight-900 color-red>Hello World</BetterText>
      		<BetterText center size-30 weight-900 color-dark>Hi React Native</BetterText>
      	</BetterView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});
