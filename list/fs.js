

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Image, View, Button} from 'react-native';
import { downloadFile, checkPermissions } from '../utils'


export default class Fs extends Component {

  state = {
    url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2486956696,687545127&fm=27&gp=0.jpg'
  }

  download() {
    debugger
    console.log('xxxxx')
    /*
    checkPermissions('camera').then(()=>{
      return checkPermissions('photo');
    }).then(()=>{
      return checkPermissions('storage');
    }).then(()=>{
      downloadFile(this.state.url, (rate) => {})
        .then((res)=>{
        })
        .catch((error)=>{
          Dialog.showToast({text: '保存失败', type: 'error'})
        })
    })
    */
  }

  download2() {
      // 注释
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={{width: '100%', height: 200}} source={{uri: this.state.url}}/>
        <Button title="download" onPress={() => this.download2.call(this)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});
