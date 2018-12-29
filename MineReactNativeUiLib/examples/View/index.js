

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View as RNView, ScrollView} from 'react-native';
import {BetterView} from '../../components'
import {View as UIView} from 'react-native-ui-lib'

export default class DemoView extends Component {
  
  render() {
    return (
      <ScrollView style={{padding: 20, marginBottom: 50}}>

      		<BetterView flex-row-start-center bg-ffffff>
      			 <BetterView flex-center bg-red width-100 height-100>
                  <BetterView width-60 height-60 br-30 bg-white>
                  </BetterView>
             </BetterView>
             <BetterView flex-center bg-white height-100 flex-1>
                 <Text>B</Text>
             </BetterView>
      		</BetterView>

          <BetterView marginT-20 flex-column-end-center height-400 bg-blue>
            <BetterView flex-center bg-red width-50 height-50>
             </BetterView>
             <BetterView flex-center bg-yellow height-50 style={{alignSelf: 'stretch'}}>
                 <Text>B</Text>
             </BetterView>
          </BetterView>

          <BetterView marginT-20 flex-row-center height-140 bg-orange style={{flexWrap: 'wrap'}}>
            {
              ['red','blue','red','blue','red','blue','red','blue','red','blue','red','blue'].map((o,i) => (
                <BetterView width-50 height-50 marginB-10 style={{backgroundColor: o}}>

                </BetterView>
              ))
            }
          </BetterView>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});
