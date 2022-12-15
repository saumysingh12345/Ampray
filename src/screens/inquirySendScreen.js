import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Linking, StyleSheet, Image, ScrollView, Alert, Dimensions, ActivityIndicator,KeyboardAvoidingView } from 'react-native'
import { useRoute } from '@react-navigation/native';
 
import { firebase } from '../../ConfigFirebase'

import { theme } from '../core/theme';
import { useNavigation } from '@react-navigation/native';
import TextInput from '../components/TextInput'
import uuid from 'react-native-uuid';

export default function InquirySendScreen() {
     
    const route = useRoute()
    const [varificationCode, setvarificationcode] = useState('ak83jy')
    const [numSaveAdd, setNumSaveAdd] = useState(0)
    const navigation = useNavigation()
    const [password, setPassword] = useState('')
    const [passworderror, setPassworderror] = useState(false)
    const [passworderrortext, setPassworderrortext] = useState('')
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [indicate, setIndicate] = useState(false)
    const [savedAddress, setSavedAddress] = useState([])
    const [appHolderData, setAppHolderData] = useState([])
    const [appHolderUUID, setAppHolderUUID] = useState()
    const [orderUUID, setOrderUUID] = useState(0)

    var saveAdd = 0

    const liveTrack = [{
        'OrderReceived': 'True',
        'OrderConfirmed': 'False',
        'OrderShipped': 'False',
        'Outfordelivery': 'False',
        'Delivered': 'False'
    }]



    useEffect(() => {


        try{

            var currentUUIDofUser = firebase.auth().currentUser.uid;
            firebase.database().ref('Current User Data/' + currentUUIDofUser.toString() + '/' + 'Track Your Order Data/' ).on('value', (snapshot) => {
                var update =[{'key':0}]
                snapshot.forEach((child) => {
                    update.push({
                        key: child.key,
                        
                      })
    
                })
                 
                setOrderUUID(parseInt(update[update.length-1]['key'])+1)  
              
            })
        }
 
        catch (e) {
            console.log(e);
          }

        //console.log(update.length)
        // i want to add the array "Update" to the array hook i initialized  


        var message = uuid.v4()
        // console.log(message)

        var mess = '';
        for (var i = 0; i < message.toString().length; i++) {
            if (message.toString().slice(message.toString().length - i - 1, message.toString().length - i) == '-') {
                break;
            }
            if (i == 6) {
                break;
            }
            mess = mess + message.toString().slice(message.toString().length - i - 1, message.toString().length - i)

        }

        // console.log(mess)
        setvarificationcode(mess)

        var currentUUIDofUser = firebase.auth().currentUser.uid;
        firebase.database().ref('Current User Data/' + currentUUIDofUser.toString() + '/' + 'Saved Address Data/').on('value', (snapshot) => {

            snapshot.forEach((child) => {
                saveAdd++;

            })
            setNumSaveAdd(saveAdd)
            // console.log(saveAdd)
        })



        var currentUUIDofUser = firebase.auth().currentUser.uid;
        firebase.database().ref('Current User Data/' + currentUUIDofUser.toString() + '/' + 'Saved Address Data/').on('value', (snapshot) => {


            snapshot.forEach((child) => {
                setSavedAddress(child.val())
                //console.log(child.val())
            })
        })


        var currentUUIDofUser = firebase.auth().currentUser.uid;
        setAppHolderUUID(currentUUIDofUser)
        const subscriber = firebase.firestore()
            .collection('users')
            .doc(currentUUIDofUser)
            .onSnapshot((documentSnapshot) => {
                setAppHolderData(documentSnapshot.data())

            });

    }, []);



    const setUrlInRealTimeDataBase = async (ProductsTaken, savedAddress, appHolderData, appHolderUUID, DateAndTime, liveTrack, TotalPayment,orderUUID) => {
        var Date = '';
        for (var i = 0; i < DateAndTime.toString().length; i++) {
            Date = Date + DateAndTime.toString().slice(i, i + 1)
            if (DateAndTime.toString().slice(i + 1, i + 2) == 'T') {
                break;
            }
        }

        if (password != varificationCode) {
            setPassworderror(true)
            setPassworderrortext('Please enter correct varification code to continue.')

        }
        else {
            setPassworderror(false)
            setPassworderrortext('')
            if (numSaveAdd == 1) {
                setIndicate(true)

                var currentUUIDofUser = firebase.auth().currentUser.uid;
                var CurrentOrderUUID =  ''

                for (var i = 0; i < Date.toString().length; i++) {
                     
                    if (Date.toString().slice(i + 1, i + 2) == ' ') {
                       console.log('Space') 
                    }
                    else{
                        CurrentOrderUUID = CurrentOrderUUID + Date.toString().slice(i, i + 1)
                    }
                }

                const dataRef1 = firebase.database().ref('Current User Data/' + currentUUIDofUser.toString() + '/' + 'Track Your Order Data/' + orderUUID + '/')
                dataRef1
                    .set({
                        ProductsTaken,
                        savedAddress,
                        appHolderData,
                        appHolderUUID,
                        Date,
                        liveTrack,
                        TotalPayment
                    })

                    .then(() => {
                        var nameOfAppHolder = appHolderData['name']
                        var emailOfAppHolder = appHolderData['email']
                        var phoneNumberOfAppHolder = appHolderData['PhoneNumber']
                        var orderType = 'new'
                        const dataRef = firebase.database().ref('Ordered Products By Customers/')
                        dataRef
                            .push({
                                currentUUIDofUser,
                                orderUUID,
                                nameOfAppHolder,
                                Date,
                                TotalPayment,
                                emailOfAppHolder,
                                phoneNumberOfAppHolder,
                                orderType
                            })

                            .then(() => {
                                Alert.alert(' ✅ Order Placed', 'We are processing your order. Please wait, Our team will contact you soon.')

                                deleteDatafromCartRealTimeDatabase()


                                navigation.goBack()
                            })
                            .catch((error) => {
                                alert(error.message)
                            })



                    })
                    .catch((error) => {
                        alert(error.message)
                    })
            }
            else {
                Alert.alert(' ❌ No delivery address found', 'Please add delivery address then again order your product.')

                navigation.navigate('SavedAddressEditScreen')
            }
        }




    }

 

    const deleteDatafromCartRealTimeDatabase = async () => {
        var currentUUIDofUser = firebase.auth().currentUser.uid;
        await firebase.database().ref('Current User Data/' + currentUUIDofUser.toString() + '/' + 'Add To Cart Data').remove();
        setIndicate(false)
    }

    const activityindicatorshowingscreen = () => {

        if (indicate) {
            return (
                <View style={{ height: windowHeight, justifyContent: 'center', marginBottom: 200, }}>
                    <ActivityIndicator
                        animating={true}
                        color='#bc2b78'
                        size='large'
                        style={{ flex: 1 }} />
                </View>
            )
        }


    }


    return (


        <KeyboardAvoidingView style={{ flex: 1, padding: 10 }}>

            {activityindicatorshowingscreen()}


            <View style={{ flexDirection: 'row', marginTop: windowHeight * 45 / 1000, paddingHorizontal: 10 }}>

                <Text style={{ fontSize: windowWidth * 55 / 1000, fontWeight: '700', color: theme.colors.secondary, flex: 1 }} >Total Payment </Text>
                <Text style={{ textAlign: 'right', fontSize: windowWidth * 55 / 1000, fontWeight: '700', color: theme.colors.secondary, flex: 1 }} >₹ {route.params.message}.00</Text>

            </View>
            <Text style={{ fontSize: windowWidth * 55 / 1000, fontWeight: '700', color: theme.colors.secondary, width: windowWidth - 10, height: 30 }} >-------------------------------------------------------</Text>



            <View style={{ marginTop: windowWidth / 7, marginBottom: 20 }}>
                <Text style={{ fontSize: windowWidth * 100 / 1000, textAlign: 'center', fontWeight: '900', color: 'gray' }}>{varificationCode}</Text>
                <Text style={{ fontSize: windowWidth * 40 / 1000, textAlign: 'center', color: theme.colors.disabled, }}>Varification Code</Text>
            </View>

            <View style={{ flex:1}}>

                <TextInput
                    label="Enter varification code"
                    // style={{borderWidth:2,borderColor:theme.colors.secondary}}
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={(password) => setPassword(password)}
                    error={passworderror}
                    errorText={passworderrortext}
                    secureTextEntry
                />

                <Text style={{ fontSize: windowWidth * 35 / 1000, textAlign: 'center', color: theme.colors.disabled, }}>Please enter correct varification code to order.</Text>
            </View>

            <View style={{ marginVertical: 10, borderRadius: 10, justifyContent: 'flex-end', marginTop: 40 }}>

                <TouchableOpacity

                    onPress={() => setUrlInRealTimeDataBase(route.params.array, savedAddress, appHolderData, appHolderUUID, new Date(), liveTrack, route.params.message,orderUUID)}
                >
                    <Text style={{ height: 50, backgroundColor: theme.colors.secondary, fontWeight: '900', fontSize: 30, textAlign: 'center', borderRadius: 10 }}>Order Now</Text>
                </TouchableOpacity>



            </View>

 

        </KeyboardAvoidingView >

    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F7F7',


    },


    shadowContainerStyle1: {
        flex: 1,


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

        flexDirection: 'row'
    },

})