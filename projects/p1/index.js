/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, Alert, TouchableHighlight, ScrollView, BackHandler, ToastAndroid} from 'react-native';

export default class List extends Component {

  state = {
    list: [
      {
        routeName: 'HomePage2',
        pagetitle: 'HomePage2'
      },
      {
        routeName: 'SearchPage',
        pagetitle: 'SearchPage'
      }
    ]
  }

  componentWillMount(){

  }

  componentWillUnmount(){
  }

  onPressWork(o, i) {
    const {navigation} = this.props;
    navigation.navigate(o.routeName, {title: o.routeName})
  }


  render() {
    const { list } = this.state
    return (
      <ScrollView contentContainerStyle={styles.container}>
          {
            list.map((o, i) => (
              <TouchableOpacity style={styles.item} onPress={this.onPressWork.bind(this, o, i)} key={i}>
                <Text style={{fontSize: 18, color: '#3780f7'}}>{ i+1 }. { o.pagetitle }</Text>
              </TouchableOpacity>
            ))
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingTop: 20
  },
  item: {
    marginBottom: 10
  }
});
