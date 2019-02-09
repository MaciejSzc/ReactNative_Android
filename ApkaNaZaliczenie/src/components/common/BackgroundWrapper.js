import React from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export class BackgroundWrapper extends React.Component {
  render() {
    return (
      <ImageBackground
        source={require('../../../images/background-gradient.png')}
        style={styles.backgroundImage}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
        >
          {this.props.children}
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    marginTop: 30
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  }
});
