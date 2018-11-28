

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class KeyboardAwareScroll extends Component {
  
  render() {
    return (
        <View style={styles.container}>
                <TouchableOpacity style={{alignItems: 'center', width: 375, height: 30, backgroundColor:'yellow', marginTop: 20}}
                                  onPress={()=>{
                                      this.refs.scroll.scrollToPosition(0, 0, true) // 滚动到具体的位置
                                      //this.refs.scroll.scrollToEnd(animated: true); 滚动到底部
                                  }}
                >
                    <Text style={{textAlign: 'center', lineHeight: 30}}>
                        点击按钮，KeyboardAwareScrollView 滚动到顶部
                    </Text>
                </TouchableOpacity>
                <KeyboardAwareScrollView style={{ width: 375, height: 1200}}
                     ref='scroll'
                     onKeyboardWillShow={(frames: Object) => {
                         console.log('键盘弹出时，键盘高度改变时：', frames)
                     }}>
                    <View>
                        <TextInput style={{marginTop: 30, width: 375, height: 30, backgroundColor: '#f5f5f5'}}
                                   onFocus={(event: Event) => {
                                   }} placeholder='textInput 1'/>
                        <TextInput style={{marginTop: 30, width: 375, height: 30, backgroundColor: '#f5f5f5'}}
                                   onFocus={(event: Event) => {
                                   }} placeholder='textInput 2'/>
                        <TextInput style={{marginTop: 30, width: 375, height: 30, backgroundColor: '#f5f5f5'}}
                                   onFocus={(event: Event) => {
                                   }} placeholder='textInput 3'/>
                        <TextInput style={{marginTop: 30, width: 375, height: 30, backgroundColor: '#f5f5f5'}}
                                   onFocus={(event: Event) => {
                                   }} placeholder='textInput 4'/>
                        <TextInput style={{marginTop: 30, width: 375, height: 30, backgroundColor: '#f5f5f5'}}
                                   onFocus={(event: Event) => {
                                   }} placeholder='textInput 5'/>
                        <TextInput style={{marginTop: 30, width: 375, height: 30, backgroundColor: '#f5f5f5'}}
                                   onFocus={(event: Event) => {
                                   }} placeholder='textInput 6'/>
                        <TextInput style={{marginTop: 30, width: 375, height: 30, backgroundColor: '#f5f5f5'}}
                                   onFocus={(event: Event) => {
                                   }} placeholder='textInput 7'/>
                        <TextInput style={{marginTop: 30, width: 375, height: 30, backgroundColor: '#f5f5f5'}}
                                   onFocus={(event: Event) => {
                                   }} placeholder='textInput 8'/>
                        <TextInput style={{marginTop: 30, width: 375, height: 30, backgroundColor: '#f5f5f5'}}
                                   onFocus={(event: Event) => {
                                   }} placeholder='textInput 9'/>
                        <TextInput style={{marginTop: 30, width: 375, height: 30, backgroundColor: '#f5f5f5'}}
                                   onFocus={(event: Event) => {
                                   }} placeholder='textInput 10'/>
                        <TextInput style={{marginTop: 30, width: 375, height: 30, backgroundColor: '#f5f5f5'}}
                                   onFocus={(event: Event) => {
                                   }} placeholder='textInput 11'/>
                        <TextInput style={{marginTop: 30, width: 375, height: 30, backgroundColor: '#f5f5f5'}}
                                   onFocus={(event: Event) => {
                                   }} placeholder='textInput 12'/>
                        <TextInput style={{marginTop: 30, width: 375, height: 30, backgroundColor: '#f5f5f5'}}
                                   onFocus={(event: Event) => {
                                   }} placeholder='textInput 13'/>
                    </View>
                </KeyboardAwareScrollView>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});
