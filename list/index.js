/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, Alert, TouchableHighlight, ScrollView, BackHandler, ToastAndroid} from 'react-native';

var lastBackTime = ""
export default class List extends Component {

  state = {
    list: [
      {
        routeName: 'Flex',
        pagetitle: 'flex'
      },
      {
        routeName: 'Actionsheet',
        pagetitle: 'react-native-actionsheet'
      },
      {
        routeName: 'AntdMobileRn',
        pagetitle: 'antd-mobile-rn'
      },
      {
        routeName: 'Fs',
        pagetitle: 'react-native-fs'
      },
      {
        routeName: 'ReactNativeImagePicker',
        pagetitle: 'react-native-image-pickers'
      },
      { 
        routeName: 'ReactNativeImageZoomViewer',
        pagetitle: 'react-native-image-zoom-viewer'
      },
      {
        routeName: 'ReactNativeSwiper',
        pagetitle: 'react-native-swiper'
      },
      {
        routeName: 'PointerEvents',
        pagetitle: 'pointer-events'
      },
      {
        routeName: 'ReactNativeWechat',
        pagetitle: 'react-native-wechat'
      },
      {
        routeName: 'SignatureCapture',
        pagetitle: 'signature-capturet'
      },
      {
        routeName: 'ScrollableTabView',
        pagetitle: 'scrollable-tab-view'
      },
      {
        routeName: 'Refreshlist',
        pagetitle: 'react-native-refresh-list-view'
      },
      {
        routeName: 'QRCodeScanner',
        pagetitle: 'qr-code-scanner'
      },
      {
        routeName: 'ReactNativePicker',
        pagetitle: 'react-native-picker'
      },
      {
        routeName: 'ImageCropPicker',
        pagetitle: 'react-native-image-crop-picker'
      },
      {
        routeName: 'Animatable',
        pagetitle: 'react-native-animatable'
      },
      {
        routeName: 'Progress',
        pagetitle: 'react-native-progress'
      },
      {
        routeName: 'VectorIcons',
        pagetitle: 'react-native-vector-icons'
      }, 
      {
        routeName: 'KeyboardAwareScrollView',
        pagetitle: 'react-native-keyboard-aware-scroll-view'
      },
      {
        routeName: 'DatePicker',
        pagetitle: 'date-picker'
      },
      {
        routeName: 'FontFamily',
        pagetitle: 'font-family'
      },
      {
        routeName: 'SwipeableFlatList',
        pagetitle: 'swipeable-flatList'
      },
      {
        routeName: 'SectionList',
        pagetitle: 'section-list'
      },
      {
        routeName: 'AndroidBack',
        pagetitle: 'android-back'
      },
      {
        routeName: 'ReactNativeUiLib',
        pagetitle: 'mine-react-native-ui-lib'
      },
      {
        routeName: 'ReactAutobind',
        pagetitle: 'react-autobind'
      },
      {
        routeName: 'NativeEcharts',
        pagetitle: 'native-echarts'
      },
      {
        routeName: 'HomePage2',
        pagetitle: 'GitHubPopular'
      }
    ]
  }

  componentWillMount(){
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
          if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
              BackHandler.exitApp();//直接退出APP
          }else{
              this.lastBackPressed = Date.now();
              ToastAndroid.show('再按一次退出应用', 1000);//提示
              return true;
          }
      })
    }
  }

  componentWillUnmount(){
      if (Platform.OS === 'android') {
          BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
      }
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
