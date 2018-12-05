
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import { Button, List } from 'antd-mobile-rn'
import DatePicker from '../components/DatePicker'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});


export default class Actionsheet extends Component {

  state = {
    visible: false,
    enter: '',
    leave: ''
  }

  showDatePicker() {
    this.setState({
      visible: true
    })
  }

  componentDidMount(){
  }

  onCancelDatePicker(componentDatePicker) {
    console.log('componentDatePicker', componentDatePicker)
  }

  onConfirmSelected(selected, componentDatePicker) {
    console.log(selected, componentDatePicker)
    const { enter,leave } = selected
    this.setState({
      enter,
      leave
    })
  }
  
  render() {
    const { visible, enter, leave } = this.state
    return (
      <View style={styles.container}>
        <Button type="primary" onPressIn={this.showDatePicker.bind(this)}>选择日期</Button>
        <Text>{ '入住日期：  ' + enter}</Text>
        <Text>{ '离店日期：  ' + leave}</Text>

        <DatePicker 
          onCancelDatePicker={this.onCancelDatePicker}
          onConfirmSelected={this.onConfirmSelected.bind(this)}
          visibile={visible}/>
      </View>
    );
  }
}

