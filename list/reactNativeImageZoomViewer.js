

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const images = [{
    // Simplest usage.
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

    // width: number
    // height: number
    // Optional, if you know the image size, you can set the optimization performance

    // You can pass props to <Image />.
    props: {
        // headers: ...
    }
}]

export default class ReactNativeImageZoomViewer extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Button title="press" onPress={() => this.ActionSheet.show()}/>
        <Modal visible={true} transparent={true}>
                {/*<ImageViewer imageUrls={images}/>*/}
            </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});
