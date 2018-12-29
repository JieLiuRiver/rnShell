

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import autoBind from 'react-autobind';

export default class Examples extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = {
    	demos: [
    		{
    			name: 'BetterView',
    			path: 'MineUi_View'
    		},
        {
          name: 'BetterText',
          path: 'MineUi_Text'
        }
    	]
    };
    autoBind(this)
  }

  onPressDemoItem(o, i) {
  	const {navigation} = this.props;
    navigation.navigate(o.path, {title: o.name})
  }

  render() {
  	const {demos} = this.state
    return (
      <View style={styles.container}>
        {
        	demos.map((o,i) => (
        		<TouchableOpacity key={i} onPress={this.onPressDemoItem.bind(this, o, i)}>
        			<Text style={{fontSize: 18}}>{i+1}. {o.name}</Text>
        		</TouchableOpacity>
        	))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  	justifyContent: 'center',
  	alignItems: 'flex-start'
  }
});
