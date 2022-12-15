import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
 
import { firebase } from '../../ConfigFirebase'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(false)
  const [nameErrorType, setNameErrorType] = useState('')
  const [PhoneNumber, setPhoneNumber] = useState('')
  const [PhoneNumberError, setPhoneNumberError] = useState(false)
  const [PhoneNumberErrorType, setPhoneNumberErrorType] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [indicate, setIndicat] = useState(false)
 
  const [alternatePhoneNumber,setAlternatePhoneNumber] = useState('')

   var profilePhoto= "https://firebasestorage.googleapis.com/v0/b/ampray-1ab62.appspot.com/o/profile%20default%20pic%2Fprofile%20default2.jpg?alt=media&token=746e45d0-ec9a-4c3c-b3d1-355f7000e2a4"


  const storeData = async (email, password) => {
    try {
      await AsyncStorage.setItem('@storage_Key', email)
    } catch (e) {
      console.log(e)
    }
    try {
      await AsyncStorage.setItem('@storage_Key2', password)
    } catch (e) {
      console.log(e)
    }
     onLoginPressed(email,password);
  }
 

  const onSignUpPressed = async (name, PhoneNumber, email, passward,alternatePhoneNumber,profilePhoto) => {
    if (name == '') {
      setNameError(true)
      setNameErrorType('Enter Your Full Name')
    }
    else {
      setNameError(false)
      setNameErrorType('')
      if (PhoneNumber.toString().length != 10) {
        setPhoneNumberError(true)
        setPhoneNumberErrorType('Enter your 10 digit number')
      }
      else {
        setPhoneNumberError(false)
        setPhoneNumberErrorType('')


        setIndicat(true)
        await firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(() => {
            firebase.auth().currentUser.sendEmailVerification({
              handleCodeInApp: true,
              url: 'https://ampray-1ab62.firebaseapp.com',

            })

              .then(() => {
                storeData(email,passward)
                Alert.alert(
                  'Varificaton mail sent',

                );
              })
              .catch((error) => {

                Alert.alert(
                  'Varification mail failed',
                  error.message.toString().slice(10,)
                );
              })
              .then(() => {
                firebase.firestore().collection('users')
                  .doc(firebase.auth().currentUser.uid)
                  .set({
                    name,
                    PhoneNumber,
                    email,
                    profilePhoto,
                    alternatePhoneNumber,
                  })
              })
              .catch((error) => {
                var mess = '';
                for (var i = 10; i < error.message.toString().length; i++) {
                  mess = mess + error.message.toString().slice(i, i + 1)
                  if (error.message.toString().slice(i + 1, i + 2) == '(') {
                    break;
                  }
                }
                Alert.alert(
                  'Sign Up failed',
                  mess
                );
              })

          })

          .catch((error) => {

            var mess = '';
            for (var i = 10; i < error.message.toString().length; i++) {
              mess = mess + error.message.toString().slice(i, i + 1)
              if (error.message.toString().slice(i + 1, i + 2) == '(') {
                break;
              }
            }
            Alert.alert(
              'Sign Up failed',
              mess
            );
          })
        setIndicat(false)
      }
    }


  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <View style={{ margin: 30 }}>

      </View>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(name) => setName(name)}
        errorText={nameErrorType}
        error={nameError}
      />
      <TextInput
        label="Phone Number"
        returnKeyType="next"
        value={name.value}
        onChangeText={(PhoneNumber) => setPhoneNumber(PhoneNumber)}
        error={PhoneNumberError}
        errorText={PhoneNumberErrorType}
        keyboardType='numeric'
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(email) => setEmail(email)}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(passward) => setPassword(passward)}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={() => onSignUpPressed(name, PhoneNumber, email, password,alternatePhoneNumber,profilePhoto)}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
      <View>
        <ActivityIndicator
          animating={indicate}
          color='#bc2b78'
          size='large'
          style={{}} />
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
