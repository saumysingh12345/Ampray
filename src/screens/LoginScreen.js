import React, { useState,useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View, ActivityIndicator, Alert,ScrollView  } from 'react-native'
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




export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [indicate, setIndicat] = useState(false)
   


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
 

  useEffect(() => {
    
  }, []);



  const onLoginPressed = async (email, password) => {


    try {
      setIndicat(true)
      await firebase.auth().signInWithEmailAndPassword(email, password)

    }
    catch (error) {
      var mess = '';
      for (var i = 10; i < error.message.toString().length; i++) {
        mess = mess + error.message.toString().slice(i, i + 1)
        if (error.message.toString().slice(i + 1, i + 2) == '(') {
          break;
        }
      }
      Alert.alert(
        'Log in failed',
        mess
      );
    }
    setIndicat(false)
  }

  return (
    
    <Background style={{height:8000}}>
      <BackButton goBack={navigation.goBack} />
       
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(email) => setEmail(email)}
        error={false}
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
        onChangeText={(password) => setPassword(password)}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={() => storeData(email, password)}>
        Login
      </Button>

      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerActivityIndicator}>
        <ActivityIndicator
          animating={indicate}
          color='#bc2b78'
          size='large'
          style={styles.activityIndicator} />
      </View>

       

    </Background>
   
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  containerActivityIndicator: {

    justifyContent: 'center',
    alignItems: 'center',

  },
  activityIndicator: {

    justifyContent: 'center',
    alignItems: 'center',

  }
})
