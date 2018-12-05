

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import ActionSheet from 'react-native-actionsheet'

const WeChat = require('react-native-wechat');

export default class RNWechat extends Component {
  
  componentDidMount() {
    // 注册
    WeChat.registerApp('xxx')
    // 监听
    WeChat.addListener(
        'SendMessageToWX.Resp',
        (response) => {
            if (parseInt(response.errCode) === 0) {
                /*
                Dialog.showToast({
                    text: '分享成功',
                    type: 'success',
                    duration: 2000
                })
                */
            } else {
              /*
                Dialog.showToast({
                    text: '分享失败',
                    type: 'error',
                    duration: 2000
                })
                */
            }
        }
    )
  }

  componentWillUnmount() {
    // 解绑
    WeChat.removeAllListeners()
  }

  share() {
    WeChat.isWXAppInstalled()
        .then((isInstalled) => {
            if (isInstalled) {
              this.setState({showPopout: false})
              WeChat.shareToTimeline({
                  type: 'imageUrl',
                  description: '测试',
                  mediaTagName: '',
                  messageAction: undefined,
                  messageExt: undefined,
                  imageUrl: 'https://p99.pstatp.com/list/190x124/pgc-image/c5169d7e8e7940d4a8ac54f04cacdd51'
              })
              .catch((error) => {
                console.log('shareToTimeline', error)
              })
            } else {
                Dialog.showToast({
                    text: "请安装微信应用"
                })
            }
        })
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="press me" onPress={() => this.share.call(this)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});
