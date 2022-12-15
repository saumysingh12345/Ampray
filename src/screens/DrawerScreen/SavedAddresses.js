import React, { useState, useEffect } from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import TextInput from '../../components/TextInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../../core/theme';
import { useNavigation } from '@react-navigation/native'
import Button from '../../components/Button';
import { firebase } from '../../../ConfigFirebase'



export default function SavedAdressScreen() {


  const [array, setArray] = useState([])
  const navigation = useNavigation()
  const [imagePick, setImagePick] = useState('')
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(false)
  const [nameErrorType, setNameErrorType] = useState('')
  const [PhoneNumber, setPhoneNumber] = useState('')
  const [PhoneNumberError, setPhoneNumberError] = useState(false)
  const [PhoneNumberErrorType, setPhoneNumberErrorType] = useState('')
  const [alternatePhoneNumber, setAlternatePhoneNumber] = useState('')
  const [pinCode, setPinCode] = useState("")
  const [stateName, setStateName] = useState("")
  const [cityName, setCityName] = useState("")
  const [localMarket, setLocalMarketName] = useState("")
  const [houseName, setHouseName] = useState("")
  const [roadName, setRoadName] = useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [indicate, setIndicat] = useState(false)
  const [uploding, setUploading] = useState(false)
  const [allAddress, setAllAddress] = useState('')

  const [nameRead, setNameRead] = useState('')
  const [PhoneNumberRead, setPhoneNumberRead] = useState('')
  const [alternatePhoneNumberRead, setAlternatePhoneNumberRead] = useState('')
  const [pinCodeRead, setPinCodeRead] = useState("")
  const [stateNameRead, setStateNameRead] = useState("")
  const [cityNameRead, setCityNameRead] = useState("")
  const [localMarketRead, setLocalMarketNameRead] = useState("")
  const [houseNameRead, setHouseNameRead] = useState("")
  const [roadNameRead, setRoadNameRead] = useState("")


  useEffect(() => {

    var currentUUIDofUser = firebase.auth().currentUser.uid;
    firebase.database().ref('Current User Data/' + currentUUIDofUser.toString() + '/' + 'Saved Address Data/').on('value', (snapshot) => {


      snapshot.forEach((child) => {

        setNameRead(child.val().name)
        setPhoneNumberRead(child.val().PhoneNumber)
        setAlternatePhoneNumberRead(child.val().alternatePhoneNumber)
        setPinCodeRead(child.val().pinCode)
        setStateNameRead(child.val().stateName)
        setCityNameRead(child.val().cityName)
        setLocalMarketNameRead(child.val().localMarket)
        setHouseNameRead(child.val().houseName)
        setRoadName(child.val().roadName)
        setAllAddress(child.val().houseName + ', ' + child.val().roadName + ', ' + child.val().localMarket + ', ' + child.val().cityName + ', ' + child.val().stateName + ' - ' + child.val().pinCode)
      })
    })


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
          <View style={{ flex: 1, paddingLeft: 10, paddingTop: 5 }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
            >
              <Icon name='arrow-left' size={25} color="white" />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 6 }}>
            <Text style={{ color: "white", fontWeight: '900', fontSize: 22, paddingTop: 3, }}>Saved Address</Text>
          </View>


        </View>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }}>



        <ScrollView >


          <View style={{ backgroundColor: 'white', borderRadius: 10, margin: 10, padding: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: '600' }}>{nameRead}</Text>
            <Text>{allAddress}</Text>
            <Text> </Text>
            <Text>{PhoneNumberRead}</Text>
            <Text>{alternatePhoneNumberRead}</Text>
          </View>

          <View style={{paddingHorizontal:10}}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('SavedAddressEditScreen')}
              style={{ marginTop: 24 }}
            >
              Edit Delivery Address
            </Button>
          </View>



        </ScrollView>
      </KeyboardAvoidingView>
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
})