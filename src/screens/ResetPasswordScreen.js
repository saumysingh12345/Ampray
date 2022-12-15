import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import {firebase} from '../../ConfigFirebase'
import { Alert } from 'react-native'
 
export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })

  const sendResetPasswordEmail = () => {
   
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      Alert.alert(
        'Password reset link sent',
        'Check your spam email also'
      );
      navigation.navigate('LoginScreen')
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
        'Password Reset failed',
        mess
      );
    })
    
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restore Password</Header>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(email) => setEmail(email)}
        autoCapitalize = 'none'
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive email with password reset link."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Send Instructions
      </Button>
    </Background>
  )
}
