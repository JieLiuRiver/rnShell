

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert} from 'react-native';


export default class Actionsheet extends Component {

  constructor(props) {
    super(props);
    this.state = {
       bigButtonPointerEvents: null, //状态机变量控制大按钮是否工作
    };
  }

  onBigButtonPressed() {
    alert("大按钮点击");
    console.log('大按钮点击');
  }

  onSmallButtonPressed() {
    if (this.state.bigButtonPointerEvents === null) {
        console.log('让大按钮不处理触摸事件。');
        this.setState({bigButtonPointerEvents: 'none'});//改变状态机变量
        return;
    }
    console.log('让大按钮正常工作。');
    this.setState({bigButtonPointerEvents: null});//改变状态机变量
  }

  render() {
    return (
      <View style={styles.container}
            pointerEvents='box-none'>
          <View pointerEvents={this.state.bigButtonPointerEvents}>
              <Text style={styles.bigButton}
                    onPress={this.onBigButtonPressed.bind(this)}>
                  大按钮
              </Text>
          </View>
          <Text style={styles.smallButton}
                onPress={this.onSmallButtonPressed.bind(this)}>
        {this.state.bigButtonPointerEvents === null ? "当前大按钮正常工作": "当前大按钮不处理触摸事件"}
          </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {   //根View样式
        flex: 1,
        alignItems: 'center',
        marginTop: 10
    },
    bigButton: {     //大按钮的样式
        width: 200,
        height: 70,
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        backgroundColor: 'orange',
    },
    smallButton: {      // 小按钮的样式
        width: 200,
        height: 35,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        backgroundColor: 'grey'
    }
});
