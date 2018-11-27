

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, Dimensions} from 'react-native';
import Swiper from '../swipe'

const { width } = Dimensions.get('window')

const Slide = props => {
  return (<View style={styles.slide}>
    <Image onLoad={props.loadHandle.bind(null, props.i)} style={styles.image} source={{uri: props.uri}} />
    {
      !props.loaded && <View style={styles.loadingView}>
        <Text>loading</Text>
      </View>
    }
  </View>)
}
 
export default class RnSwiper extends Component {

  state = {
      imgList: [
        'https://gitlab.pro/yuji/demo/uploads/d6133098b53fe1a5f3c5c00cf3c2d670/DVrj5Hz.jpg_1',
        'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
        'https://gitlab.pro/yuji/demo/uploads/4421f77012d43a0b4e7cfbe1144aac7c/XFVzKhq.jpg',
        'https://gitlab.pro/yuji/demo/uploads/576ef91941b0bda5761dde6914dae9f0/kD3eeHe.jpg'
      ],
      loadQueue: [0, 0, 0, 0]
  }

  loadHandle (i) {
    let loadQueue = this.state.loadQueue
    loadQueue[i] = 1
    this.setState({
      loadQueue
    })
  }

  render() {
    return (
      <Swiper loadMinimal loadMinimalSize={1} style={styles.wrapper} loop={true}>
          {
            this.state.imgList.map((item, i) => <Slide
              loadHandle={this.loadHandle.bind(this)}
              loaded={!!this.state.loadQueue[i]}
              uri={item}
              i={i}
              key={i} />)
          }
        </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    width,
    flex: 1,
    backgroundColor: 'transparent'
  },

  loadingView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)'
  },

  loadingImage: {
    width: 60,
    height: 60
  }
});
