

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ScrollView} from 'react-native';

const getFlexLayoutStyles = () => {
  /*
    flex_方向_主轴_侧轴
  */
  // space-evenly flex容器起始边缘和第一个 flex 项之间的间距和每个相邻 flex 项之间的间距是相等
  const DIRECTIONS = ['row', 'column'],
        JUSTIFY_CONTENT_PROPVALUES = ['center', 'space-between', 'space-around', 'flex-start', 'flex-end', 'space-evenly'],
        JUSTIFY_CONTENT_NAMEVALUES = ['center', 'between', 'around', 'start', 'end', 'evenly'],
        ALIGN_ITEMMS_PROPVALUES = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
        ALIGN_ITEMMS_NAMEVALUES = ['start', 'end', 'center', 'baseline', 'stretch', 'between', 'around']
        DIVISION = '_'
        layoutStyles = {};
  let styleName = 'flex'
  DIRECTIONS.forEach((direction) => {
    // flex_row
    const nameDir = styleName + DIVISION + direction
    JUSTIFY_CONTENT_PROPVALUES.forEach((jItem, jIdx) => {
      // flex_row_center
      const nameJust = nameDir + DIVISION + JUSTIFY_CONTENT_NAMEVALUES[jIdx]
      ALIGN_ITEMMS_PROPVALUES.forEach((aItem, aIdx) => {
        // flex_row_center_center
        const nameAlig = nameJust + DIVISION + ALIGN_ITEMMS_NAMEVALUES[aIdx]
        layoutStyles[nameAlig] = {
          flexDirection: direction,
          justifyContent: jItem,
          alignItems: aItem
        }
      })
    })
  })
  console.log('layoutStyles', layoutStyles)
  return layoutStyles
}


export default class Flex extends Component {
  
  state = {
    flexlist: Object.keys(getFlexLayoutStyles())
  }

  componentWillMount(){
    
  }

  render() {
    const { flexlist } = this.state
    return (
      <ScrollView style={styles.container}>




        {
          flexlist.map((o, i) => (
            <View style={[styles.demoBox, styles[o], {position: 'relative'} ]} key={i}>
                <Text style={{ position: 'absolute', color: '#fff', left: 0, top: 0, zIndex: 20}}>{ i + 1 }. {o}</Text>
                <View style={[styles.demoItemA,(o.indexOf('stretch') != -1 && o.indexOf('row') != -1) && {height: 'auto'},(o.indexOf('stretch') != -1 && o.indexOf('column') != -1) && {width: 'auto'}, (o.indexOf('baseline') != -1 && o.indexOf('row') != -1) && {height: 80}, (o.indexOf('baseline') != -1 && o.indexOf('column') != -1) && {width: 80}]}>
                  {o.indexOf('baseline') != -1 && (<Text style={{color: '#fff'}, o.indexOf('row') != -1 && {marginTop: 20}}>text</Text>)}
                </View>
                <View style={[styles.demoItemB,(o.indexOf('stretch') != -1 && o.indexOf('row') != -1) && {height: 'auto'},(o.indexOf('stretch') != -1 && o.indexOf('column') != -1) && {width: 'auto'}]}>
                  {o.indexOf('baseline') != -1 && (<Text style={{color: '#fff'}}>text</Text>)}
                </View>
            </View>
          ))
        }



        <View style={[styles.demoBox3, styles.flex_row_center_center]}>
            <View style={[styles.demoItemA, styles.demo17Item]}><Text>61</Text></View>
            <View style={[styles.demoItemB, styles.demo17Item, {alignSelf: 'flex-start'}]}></View>
        </View>

        <View style={[styles.demoBox3, styles.flex_row_center_center]}>
            <View style={[styles.demoItemA, styles.demo17Item]}><Text>62</Text></View>
            <View style={[styles.demoItemB, styles.demo17Item, {alignSelf: 'flex-end'}]}></View>
        </View>

        <View style={[styles.demoBox3, styles.flex_row_center_center]}>
            <View style={[styles.demoItemA, styles.demo17Item]}><Text>63</Text></View>
            <View style={[styles.demoItemB, styles.demo17Item, {height: 'auto', alignSelf: 'stretch'}]}></View>
        </View>



        <View style={[styles.demoBox3, styles.flex_column_center_center]}>
            <View style={[styles.demoItemA, styles.demo17Item]}><Text>64</Text></View>
            <View style={[styles.demoItemB, styles.demo17Item, {alignSelf: 'flex-start'}]}></View>
        </View>

        <View style={[styles.demoBox3, styles.flex_column_center_center]}>
            <View style={[styles.demoItemA, styles.demo17Item]}><Text>65</Text></View>
            <View style={[styles.demoItemB, styles.demo17Item, {alignSelf: 'flex-end'}]}></View>
        </View>

        <View style={[styles.demoBox3, styles.flex_column_center_center]}>
            <View style={[styles.demoItemA, styles.demo17Item]}><Text>66</Text></View>
            <View style={[styles.demoItemB, styles.demo17Item, {width: 'auto', alignSelf: 'stretch'}]}></View>
        </View>


        <View style={[styles.demoBox, styles.flex_row_start_center, {flexWrap: 'wrap'}]}>
            <View style={[styles.demoItemA]}><Text>67</Text></View>
            <View style={[styles.demoItemB]}></View>
            <View style={[styles.demoItemA]}></View>
            <View style={[styles.demoItemB]}></View>
            <View style={[styles.demoItemA]}></View>
            <View style={[styles.demoItemB]}></View>
            <View style={[styles.demoItemA]}></View>
            <View style={[styles.demoItemB]}></View>
            <View style={[styles.demoItemA]}></View>
            <View style={[styles.demoItemB]}></View>
        </View>

        <View style={[styles.demoBox, styles.flex_row_start_center]}>
            <View style={[styles.demoItemA, {flex: 1}]}><Text>68</Text></View>
            <View style={[styles.demoItemB, {flex: 2}]}></View>
            <View style={[styles.demoItemA, {flex: 1}]}></View>
            <View style={[styles.demoItemB, {flex: 2}]}></View>
            <View style={[styles.demoItemA, {flex: 1}]}></View>
        </View>


        <View style={[styles.demoBox, styles.flex_column_center_start, {height: 200, flexWrap: 'wrap'}]}>
            <View style={[styles.demoItemA]}><Text>69</Text></View>
            <View style={[styles.demoItemB]}></View>
            <View style={[styles.demoItemA]}></View>
            <View style={[styles.demoItemB]}></View>
            <View style={[styles.demoItemA]}></View>
            <View style={[styles.demoItemB]}></View>
        </View>

        <View style={[styles.demoBox, styles.flex_column_center_center]}>
            <View style={[styles.demoItemA, {flex: 1}]}><Text>70</Text></View>
            <View style={[styles.demoItemB, {flex: 2}]}></View>
            <View style={[styles.demoItemA, {flex: 1}]}></View>
            <View style={[styles.demoItemB, {flex: 2}]}></View>
            <View style={[styles.demoItemA, {flex: 1}]}></View>
        </View>

      </ScrollView>
    );
  }
}




const styles = StyleSheet.create({
  container: {
  },
  ...getFlexLayoutStyles(),
  demoBox: {
    height: 200,
    width: '100%',
    backgroundColor: 'grey',
    marginBottom: 20
  },
  demoBox2: {
    height: 150,
    width: '100%',
    backgroundColor: 'green',
    marginBottom: 20
  },
  demoBox3: {
    height: 150,
    width: '100%',
    backgroundColor: 'blue',
    marginBottom: 20
  },
  demoItemA: {
    width: 50,
    height: 50,
    backgroundColor: 'red'
  },
  demoItemB: {
    width: 50,
    height: 50,
    backgroundColor: '#000'
  }

});
