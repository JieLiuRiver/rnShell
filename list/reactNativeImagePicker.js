

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class Fs extends Component {

  state = {
    avatarSource: ''
  }

  open() {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri };
          this.setState({
            avatarSource: source,
          });
        }
      });
  }

  render() {
    return (
      <View style={styles.container}>
          <Image source={this.state.avatarSource} style={styles.uploadAvatar} />
          <Button title="press me" onPress={() => this.open.call(this)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  uploadAvatar: {
    height: 200
  }
});
