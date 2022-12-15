import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Linking, Image, StatusBar, StyleSheet } from 'react-native'
import { theme } from '../core/theme';
 
 
import { firebase } from '../../ConfigFirebase';
 
import Button from '../components/Button';

export default function IndustrialTrainingScreen() {

  const [youtubeChannelId, setUrl1] = useState('')
  const [Image1, SetImage] = useState('')
 
  
  useEffect(() => {


    const reference1 = firebase.database().ref('/YoutubeChannelId/ChannelId')
    reference1.on('value', Snapshot => {
      //console.log('User Data', Snapshot.val())
      setUrl1(Snapshot.val())
     
      // JumpToYoutubeApp(Snapshot.val());
    });

    const reference2 = firebase.database().ref('/YoutubeChannelId/ShortDescription')
    reference2.on('value', Snapshot => {
      //console.log('User Data', Snapshot.val())
      SetImage(Snapshot.val())
      // JumpToYoutubeApp(Snapshot.val());
    });



  }, []);

  

 

  return (


    <View style={styles.container}>


      <StatusBar
        barStyle="light-content"

        backgroundColor={theme.colors.primary}
      />

      <View style={styles.shadowContainerStyleForHeader}>
        <View style={{ height: 45 }}></View>
        <View style={{ flexDirection: "row", flex: 1, }}>


          <View style={{ flex: 6 }}>
            <Text style={{ color: "white", fontWeight: '900', fontSize: 25, paddingLeft: 20 }}>Industrial Training</Text>
          </View>


        </View>
      </View>

      <View style={{ paddingHorizontal: 10, flex: 1,paddingBottom:20 }}>
        <View style={{ flex: 1, paddingBottom: 50 }}>

          <TouchableOpacity style={{flex:1}}
            onPress={() => Linking.openURL('https://www.youtube.com/channel/' + youtubeChannelId)}
          >

            <Image
              style={{ height: "100%", width: '100%', borderRadius: 20, marginTop: 20, marginBottom: 20, }}
              source={{ uri: Image1 }}
            />
          </TouchableOpacity>


        </View>

        <View  >

        <Button mode="contained" onPress={() => Linking.openURL('https://www.youtube.com/channel/' + youtubeChannelId)}>
          Let's Start  
        </Button>
        </View>
 
      </View>


       


    </View>


  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F1F7F7',


  },

  badge: {
    color: '#fff',
    position: 'absolute',
    zIndex: 10,
    top: 1,
    right: 1,
    padding: 1,
    backgroundColor: 'red',
    borderRadius: 5,
    marginRight: 5
  },

  shadowContainerStyleForHeader: {
    paddingBottom: 3,
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 20,
    backgroundColor: theme.colors.primary,
    height: 100,
    borderRadius: 15


  },

  shadowContainerStyle1: {
    paddingBottom: 6,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 15,
    margin: 5,


  },

})