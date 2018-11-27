

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableHighlight} from 'react-native';
import SignatureCapture from 'react-native-signature-capture';


export default class Actionsheet extends Component {
    
  saveSign() {
      this.refs["sign"].saveImage();
  }

  resetSign() {
      this.refs["sign"].resetImage();
  }

  _onSaveEvent(result) {
      //result.encoded - for the base64 encoded png
      //result.pathName - for the file path name
      console.log(result);
  }
  _onDragEvent() {
       // This callback will be called when the user enters signature
      console.log("dragged");
  }

  render() {
    const someProps = {

    }
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={{alignItems:"center",justifyContent:"center"}}>Signature Capture Extended </Text>
          <SignatureCapture
              style={[{flex:1},styles.signature]}
              ref="sign"
              onSaveEvent={this._onSaveEvent}
              onDragEvent={this._onDragEvent}
              saveImageFileInExtStorage={false}
              showNativeButtons={false}
              showTitleLabel={false}
              viewMode={"portrait"}/>

          <View style={{ flex: 1, flexDirection: "row" }}>
              <TouchableHighlight style={styles.buttonStyle}
                  onPress={() => { this.saveSign() } } >
                  <Text>Save</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.buttonStyle}
                  onPress={() => { this.resetSign() } } >
                  <Text>Reset</Text>
              </TouchableHighlight>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  signature: {
      flex: 1,
      borderColor: '#000033',
      borderWidth: 1,
  },
  buttonStyle: {
      flex: 1, justifyContent: "center", alignItems: "center", height: 50,
      backgroundColor: "#eeeeee",
      margin: 10
  }
});
