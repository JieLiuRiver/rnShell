

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { downloadFile, checkPermissions } from '../utils'


export default class Fs extends Component {
  
  download() {
    console.log('downloadFile')
    downloadFile('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2486956696,687545127&fm=27&gp=0.jpg', (rate) => {})
        .then((res)=>{
        })
        .catch((error)=>{
          Dialog.showToast({text: '保存失败', type: 'error'})
        })
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="download" onPress={() => this.download.call(this)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});

