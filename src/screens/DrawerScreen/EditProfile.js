import React, { useState, useEffect } from 'react'

import { theme } from '../../core/theme'
import { Dimensions,Alert, View, Text, StyleSheet, ScrollView, Image, SafeAreaView, FlatList, TouchableOpacity, KeyboardAvoidingView,ActivityIndicator, TurboModuleRegistry } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import TextInput from '../../components/TextInput';
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '../../../ConfigFirebase'
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';


export default function EditProfile() {
  
  const navigation = useNavigation()
  const route = useRoute();
  const [imagePick, setImagePick] = useState(route.params.profilePhoto)
  const [name, setName] = useState(route.params.name)
  const [nameError, setNameError] = useState(false)
  const [nameErrorType, setNameErrorType] = useState('')
  const [PhoneNumber, setPhoneNumber] = useState(route.params.PhoneNumber)
  const [alternatePhoneNumber, setAlternatePhoneNumber] = useState(route.params.alternatePhoneNumber)
  const [PhoneNumberError, setPhoneNumberError] = useState(false)
  const [PhoneNumberErrorType, setPhoneNumberErrorType] = useState('')
  const [email, setEmail] = useState(route.params.email)
  const [password, setPassword] = useState('')
  const [indicate, setIndicat] = useState(false)
  const [uploding, setUploading] = useState(false)



  useEffect(() => {



  }, []);

  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 9],
      quality: 1,
    });

    console.log(result.uri);

    if (!result.cancelled) {
      setImagePick(result.uri);
    }
  };


  const uploadImage = async (alternatePhoneNumber, name, PhoneNumber, email) => {

    if (name == '') {
      setNameError(true)
      setNameErrorType('Enter Your Full Name')
    }
    else {
      setNameError(false)
      setNameErrorType('')

      if (PhoneNumber.length != 10) {

        setPhoneNumberError(true)
        setPhoneNumberErrorType('Enter your 10 digit number')
      }
      else {
        setPhoneNumberError(false)
        setPhoneNumberErrorType('')
        setIndicat(true)
        setUploading(true);
        const response = await fetch(imagePick);
        const blob = await response.blob();
        // const filename = email.toString();
        var ref = firebase.storage().ref().child("UserDataPics/" + 'UserProfilePics/' + route.params.email.toString()).put(blob);

        try {
          await ref;

          getUrlOfimage(alternatePhoneNumber, name, PhoneNumber, email);

        } catch (e) {
          console.log(e);
        }

        setUploading(false);
        Alert.alert('Profile Updated')


       // setImagePick(null);

      }

    }

  };



  const getUrlOfimage = async (alternatePhoneNumber, name, PhoneNumber, email) => {
    
    let imageRef = firebase.storage().ref("UserDataPics/" + 'UserProfilePics/' + route.params.email.toString());
    imageRef
      .getDownloadURL()
      .then((url) => {

        console.log(url);
        setUrlInRealTimeDataBase(url, alternatePhoneNumber, name, PhoneNumber, email);

      })
      .catch((e) => console.log('getting downloadURL of image error => ', e))
  };


  const setUrlInRealTimeDataBase = async (profilePhoto, alternatePhoneNumber, name, PhoneNumber, email) => {

    firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid)
      .set({
        name,
        PhoneNumber,
        email,
        profilePhoto,
        alternatePhoneNumber,
      })
      setIndicat(false)
  }



  return (
    < View style={styles.container}>

      <StatusBar
        barStyle="light-content"

        backgroundColor={theme.colors.primary}
      />

      <View style={styles.shadowContainerStyleForHeader}>
        <View style={{ height: 45 }}></View>
        <View style={{ flexDirection: "row", flex: 1, }}>
          <View style={{ flex: 1, paddingLeft: 10, paddingTop: 5 }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
            >
              <Icon name='arrow-left' size={25} color="white" />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 6 }}>
            <Text style={{ color: "white", fontWeight: '900', fontSize: 22, paddingTop: 5 }}>Edit Profile</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('CartContainerScreen')}
          >

            <View style={{ flex: 1, alignItems: 'flex-end', paddingTop: 5, paddingRight: 15 }}>


            </View>
          </TouchableOpacity>

        </View>
      </View>


      <KeyboardAvoidingView style={{ flex: 1, paddingHorizontal: 20 }}>
        <ScrollView>

          <View style={{ alignItems: 'center', marginTop: 100 }}>
            <TouchableOpacity
              onPress={() => pickImage()}
            >
              <Image style={{ height: 150, width: 150, borderRadius: 100, borderWidth: 3, borderColor: 'green' }} source={{ uri: imagePick }} />
            </TouchableOpacity>

          </View>

          <TextInput
            label="Name"
            returnKeyType="next"
            onChangeText={(name) => setName(name)}
            error={nameError}
            errorText={nameErrorType}
            defaultValue={route.params.name}

          />

          <TextInput
            label="Phone Number"
            returnKeyType="next"
            defaultValue={route.params.PhoneNumber}
            onChangeText={(PhoneNumber) => setPhoneNumber(PhoneNumber)}
            error={PhoneNumberError}
            errorText={PhoneNumberErrorType}
            keyboardType='numeric'
          />

          <TextInput
            label="Alternate Phone Number"
            returnKeyType="next"
            defaultValue={route.params.alternatePhoneNumber}
            onChangeText={(alternatePhoneNumber) => setAlternatePhoneNumber(alternatePhoneNumber)}

            keyboardType='numeric'
          />

          <Button
            mode="contained"
            onPress={() => uploadImage(alternatePhoneNumber, name, PhoneNumber, email)}
            style={{ marginTop: 24 }}
          >
            Update Profile
          </Button>
          <View>
      
        <ActivityIndicator
          animating={indicate}
          color='#bc2b78'
          size='large'
          style={{}} />
      </View>


        </ScrollView>

      </KeyboardAvoidingView>

    </ View>





  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F7F7',


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