

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import ActionSheet from 'react-native-actionsheet'


export default class Actionsheet extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Button title="press" onPress={() => this.ActionSheet.show()}/>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Which one do you like ?'}
          options={['Apple', 'Banana', 'cancel']}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={(index) => {}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});
