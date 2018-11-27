

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import Picker from 'react-native-picker';


export default class ReactNativePicker extends Component {
  

  show() {
    let data = [];
    for(var i=0;i<100;i++){
        data.push(i);
    }

    Picker.init({
        pickerData: data,
        selectedValue: [59],
        onPickerConfirm: data => {
            console.log(data);
        },
        onPickerCancel: data => {
            console.log(data);
        },
        onPickerSelect: data => {
            console.log(data);
        }
    });
    Picker.show();
  }

  render() {
    return (
      <View style={styles.container}>
          <Button title="press" onPress={() => this.show.call(this)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});
