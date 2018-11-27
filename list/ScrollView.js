

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ScrollView, Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window')

// contentOffset 用来手动设置初始的滚动坐标

export default class Sv extends Component {

  state = {
    offset: {x: 0, y: 0}
  }

  componentDidMount() {
    this.isScrolling = false
  }

  // 当用户开始拖动此视图时调用此函数。
  onScrollBegin(e) {
  }

  // 滚动动画结束时调用此函数
  onMomentumScrollEnd(e) {
      console.log('contentOffset', e.nativeEvent.contentOffset)
      this.isScrolling = true
  }

  // 当用户停止拖动此视图时调用此函数。
  onScrollEnd(e) {
    console.log('contentOffset', e.nativeEvent.contentOffset)
    if (!e.nativeEvent.contentOffset) {
      if (true) {
        e.nativeEvent.contentOffset = {x: e.nativeEvent.position * this.width}
      } else {
        e.nativeEvent.contentOffset = {y: e.nativeEvent.position * this.height}
      }
    }
    const diff = e.nativeEvent.contentOffset.x - this.offset.x
    const index = parseInt(this.index + Math.round(diff / this.width))
    console.log('index', index)
    this.setState({
      offset: e.nativeEvent.contentOffset
    })
  }

  onScrollEndDrag(e) {
    console.log('onScrollEndDrag', e)
  }  

  onLayout(event){
    const { width, height } = event.nativeEvent.layout
    this.width = width
    this.height = height
    this.index = 0
    this.index++
    this.offset = {
      x: this.index * width,
      y: 0
    }
    this.scrollView.scrollTo({...this.offset, animated: false})
  }

  render() {
    return (
      <View style={styles.container} onLayout={this.onLayout.bind(this)}>
            <ScrollView
                ref={o => this.scrollView = o}
                horizontal={true}
                contentContainerStyle={styles.contentContainerStyle}
                contentOffset={this.state.offset}
                onScrollBeginDrag={this.onScrollBegin}
                onMomentumScrollEnd={this.onScrollEnd.bind(this)}
                onScrollEndDrag={this.onScrollEndDrag.bind(this)}>
                  <View style={styles.item}><Text style={{color: '#fff', fontSize: 20}}>0</Text></View>
                  <View  style={styles.item}><Text style={{color: '#fff', fontSize: 20}}>1</Text></View>
                  <View  style={styles.item}><Text style={{color: '#fff', fontSize: 20}}>2</Text></View>
                  <View  style={styles.item}><Text style={{color: '#fff', fontSize: 20}}>3</Text></View>
            </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
     flex: 1
  },
  contentContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    backgroundColor: 'red'
  }
});
