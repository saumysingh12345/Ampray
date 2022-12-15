import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CategoryContainer() {
  return (


    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Icon name='lock' size={windowWidth * 300 / 1000} color="gray" />
      <Text style={{ fontSize: windowWidth * 70 / 1000, fontWeight: '800', color: 'gray' }}>Available Soon</Text>
      <Text style={{ fontSize: windowWidth * 40 / 1000, fontWeight: '500', color: 'gray', marginBottom: windowHeight * 60 / 1000 }}>We are working on this service.</Text>
    </View>

  )
}