
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { List, SwipeAction } from 'antd-mobile-rn';


export default class AntdMobile extends Component {

  render() {

    const right = [
      {
        text: 'More',
        onPress: () => console.log('more'),
        style: { backgroundColor: 'orange', color: 'white' },
      },
      {
        text: 'Delete',
        onPress: () => console.log('delete'),
        style: { backgroundColor: 'red', color: 'white' },
      },
    ];
    const left = [
      {
        text: 'Read',
        onPress: () => console.log('read'),
        style: { backgroundColor: 'blue', color: 'white' },
      },
      {
        text: 'Reply',
        onPress: () => console.log('reply'),
        style: { backgroundColor: 'green', color: 'white' },
      },
    ];

    return (
      <View style={styles.container}>
          <List>
            <SwipeAction
              autoClose
              style={{ backgroundColor: 'transparent' }}
              right={right}
              left={left}
              onOpen={() => console.log('open')}
              onClose={() => console.log('close')}
            >
              <List.Item extra="extra content">
                Simple example: left and right buttons
              </List.Item>
            </SwipeAction>
          </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});
