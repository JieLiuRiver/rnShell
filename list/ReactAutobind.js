

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import autoBind from 'react-autobind';


export default class AutoBind extends Component {
    
  state = {
    clickCounter: 0
  }

  constructor(props) {
    super(props);
    autoBind(this)
  }

  increment() {
    this.setState({
      clickCounter: this.state.clickCounter + 1
    })
  }

  render() {
    return (
      <View style={styles.container}>
          <Text>Number of clicks: {this.state.clickCounter}</Text>
          <Button title="Increment Counter" onPress={this.increment}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});
