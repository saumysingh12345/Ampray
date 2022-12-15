import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView, ScrollView, Dimensions, View } from 'react-native'
import { theme } from '../core/theme'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Background({ children }) {
  return (
    <ScrollView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/background_dot.png')}
        resizeMode="repeat"
        style={styles.background} 
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {children}
        </KeyboardAvoidingView>
      </ImageBackground>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    height: windowHeight,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
