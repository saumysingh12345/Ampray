import React, { useState, useEffect } from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import TextInput from '../../components/TextInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../../core/theme';
import { useNavigation } from '@react-navigation/native'
import Button from '../../components/Button';
import { firebase } from '../../../ConfigFirebase'


export default function SavedAdressEditScreen() {

    const navigation = useNavigation()

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
    const [textError, setTextErrror] = useState(false)
    const [textErrorType, setTextErrorType] = useState('')
    const [textError1, setTextErrror1] = useState(false)
    const [textErrorType1, setTextErrorType1] = useState('')
    const [textError2, setTextErrror2] = useState(false)
    const [textErrorType2, setTextErrorType2] = useState('')
    const [textError3, setTextErrror3] = useState(false)
    const [textErrorType3, setTextErrorType3] = useState('')
    const [textError4, setTextErrror4] = useState(false)
    const [textErrorType4, setTextErrorType4] = useState('')
    const [textError5, setTextErrror5] = useState(false)
    const [textErrorType5, setTextErrorType5] = useState('')
    const [textError6, setTextErrror6] = useState(false)
    const [textErrorType6, setTextErrorType6] = useState('')
    const [textError7, setTextErrror7] = useState(false)
    const [textErrorType7, setTextErrorType7] = useState('')
    const [textError8, setTextErrror8] = useState(false)
    const [textErrorType8, setTextErrorType8] = useState('')
    const [ indicate, setIndicat] = useState(false)

    const onEditAddressPressed = async (
         
        name,
        PhoneNumber,
        alternatePhoneNumber,
        pinCode,
        stateName,
        cityName,
        localMarket,
        houseName,
        roadName,
    ) => {

         

        if (name == '') {
            setNameError(true)
            setNameErrorType('Enter Your Full Name')
        }
        else {
            setNameError(false);
            setNameErrorType('');
            if (PhoneNumber.toString().length != 10) {
                setTextErrror(true)
                setTextErrorType('Please enter 10 digit number')
            }
            else {
                setTextErrror(false);
                setTextErrorType('');

                if (pinCode.toString().length != 6) {
                    setTextErrror1(true)
                    setTextErrorType1('Please enter your 6 digit Pin Code')
                }
                else {
                    setTextErrror1(false);
                    setTextErrorType1('')
                    if (stateName == '') {
                        setTextErrror2(true)
                        setTextErrorType2('Please enter your state name')
                    }
                    else {
                        setTextErrror2(false);
                        setTextErrorType2('')
                        if (cityName == '') {
                            setTextErrror3(true)
                            setTextErrorType3('Please enter your city name')
                        }
                        else {
                            setTextErrror3(false);
                            setTextErrorType3('')
                            if (localMarket == '') {
                                setTextErrror4(true)
                                setTextErrorType4('Please enter your local market name')
                            }
                            else {
                                setTextErrror4(false);
                                setTextErrorType4('')
                                if (houseName == '') {
                                    setTextErrror5(true)
                                    setTextErrorType5('Please enter your house name')
                                }
                                else {
                                    setTextErrror5(false);
                                    setTextErrorType5('')
                                    if (roadName == '') {
                                        setTextErrror6(true)
                                        setTextErrorType6('Please enter your road name')
                                    }
                                    else {
                                        setTextErrror6(false);
                                        setTextErrorType6('')
                                        setIndicat(true)

                                        var currentUUIDofUser = firebase.auth().currentUser.uid;
                                        const dataRef = firebase.database().ref('Current User Data/' + currentUUIDofUser.toString() + '/' + 'Saved Address Data/' + '5xpXRxpamTPnnOBrTD2eqFeA8TB2/')
                                        dataRef
                                            .set({
                                                name,
                                                PhoneNumber,
                                                alternatePhoneNumber,
                                                pinCode,
                                                stateName,
                                                cityName,
                                                localMarket,
                                                houseName,
                                                roadName,
                                            })

                                            .then(() => {
                                                Alert.alert('Address Saved !!')
                                                setIndicat(false)

                                            })
                                            .catch((error) => {
                                                alert(error.message)
                                            })
                                    }
                                }
                            }
                        }
                    }
                }

            }

        }

    }

    const activityIndicatorView =()=>{
        if(indicate==true){
            return(<View style={{height:1500,paddingTop:300}}> 
                <ActivityIndicator
                 animating={true}
                 color='#bc2b78'
                 size='large'
                 style={styles.activityIndicator} />
             </View>)
        }
  
    }
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
                        <Text style={{ color: "white", fontWeight: '900', fontSize: 22, paddingTop: 3, }}>Edit Saved Address</Text>
                    </View>


                </View>
            </View>

            {activityIndicatorView()}

            <KeyboardAvoidingView style={{ flex: 1 }}>


                <ScrollView style={{ paddingHorizontal: 10 }} >

                    <TextInput
                        label="Full Name(Required)*"
                        returnKeyType="next"
                        onChangeText={(name) => setName(name)}
                        error={nameError}
                        errorText={nameErrorType}


                    />

                    <TextInput
                        label="Phone Number(Required)*"
                        returnKeyType="next"
                        // defaultValue={}
                        onChangeText={(PhoneNumber) => setPhoneNumber(PhoneNumber)}
                        error={textError}
                        errorText={textErrorType}
                        keyboardType='numeric'
                    />

                    <TextInput
                        label="Alternate Phone Number"
                        returnKeyType="next"
                        //defaultValue={ }
                        onChangeText={(alternatePhoneNumber) => setAlternatePhoneNumber(alternatePhoneNumber)}

                        keyboardType='numeric'
                    />

                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ flex: 1, marginRight: 5 }}>
                            <TextInput

                                label="Pincode(Required)*"
                                returnKeyType="next"
                                onChangeText={(pinCode) => setPinCode(pinCode)}
                                error={textError1}
                                errorText={textErrorType1}
                                keyboardType='numeric'
                            //  defaultValue={ }

                            />
                        </View>

                        <View style={{ flex: 1, marginLeft: 5 }}>
                            <TextInput

                                label="State(Required)*"
                                returnKeyType="next"
                                onChangeText={(stateName) => setStateName(stateName)}
                                error={textError2}
                                errorText={textErrorType2}
                            //  defaultValue={ }

                            />
                        </View>
                    </View>



                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ flex: 1, marginRight: 5 }}>
                            <TextInput

                                label="City(Required)*"
                                returnKeyType="next"
                                onChangeText={(cityName) => setCityName(cityName)}
                                error={textError3}
                                errorText={textErrorType3}
                            //  defaultValue={ }

                            />
                        </View>

                        <View style={{ flex: 1, marginLeft: 5 }}>
                            <TextInput

                                label="Local Market(Area)"
                                returnKeyType="next"
                                onChangeText={(localMarket) => setLocalMarketName(localMarket)}
                                error={textError4}
                                errorText={textErrorType4}
                            //  defaultValue={ }

                            />
                        </View>
                    </View>




                    <TextInput
                        label="House No., Building Name(Required)*"
                        returnKeyType="next"
                        onChangeText={(houseName) => setHouseName(houseName)}
                        error={textError5}
                        errorText={textErrorType5}
                    //  defaultValue={ }

                    />


                    <TextInput
                        label="Road Name,Area,Landmark(Required)*"
                        returnKeyType="next"
                        onChangeText={(roadName) => setRoadName(roadName)}
                        error={textError6}
                        errorText={textErrorType6}
                    //  defaultValue={ }

                    />


                    <Button
                        mode="contained"
                        onPress={() => onEditAddressPressed(
                            name,
                            PhoneNumber,
                            alternatePhoneNumber,
                            pinCode,
                            stateName,
                            cityName,
                            localMarket,
                            houseName,
                            roadName,
                        )}
                        style={{ marginTop: 24 }}
                    >
                        Update Delivery Address
                    </Button>




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