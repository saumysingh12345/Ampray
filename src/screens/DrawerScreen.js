import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, FlatList, TouchableOpacity, Alert, Linking, Dimensions } from 'react-native'
import { theme } from '../core/theme'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from "../../ConfigFirebase"
export default function DrawerContainerScreen() {

    const [PhoneNumber, setPhoneNumber] = useState('')
    const [alternatePhoneNumber, setAlternatePhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [profilePhoto, setProfilePhoto] = useState('')
    const [name, setName] = useState('')
    const [phoneNumber, setUrl1] = useState('')
    const [whatSAppNumber, setUrl2] = useState('')
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    useEffect(() => {


        const reference1 = firebase.database().ref('/customer care information/Call Number')
        reference1.on('value', Snapshot => {
            //console.log('User Data', Snapshot.val())
            setUrl1(Snapshot.val())
        });

        const reference2 = firebase.database().ref('/customer care information/WhatsApp')
        reference2.on('value', Snapshot => {
            //console.log('User Data', Snapshot.val())
            setUrl2(Snapshot.val())
        });

        var currentUUIDofUser = firebase.auth().currentUser.uid;
        const subscriber = firebase.firestore()
            .collection('users')
            .doc(currentUUIDofUser)
            .onSnapshot((documentSnapshot) => {

                setPhoneNumber(documentSnapshot.data().PhoneNumber)
                setAlternatePhoneNumber(documentSnapshot.data().alternatePhoneNumber)
                setEmail(documentSnapshot.data().email)
                setName(documentSnapshot.data().name)
                setProfilePhoto(documentSnapshot.data().profilePhoto)
            });
    }, []);


    const navigation = useNavigation()
    const DATA = [
        {
            id: '1',
            title: 'My Order',
            icon: 'shopping-bag',
            navigateToScreen: "OldOrderScreen",
            size: 20
        },

        {
            id: '2',
            title: 'Coupons',
            icon: 'wpforms',
            navigateToScreen: 'CategoryContainer',
            size: 20
        },

        {
            id: '3',
            title: 'Saved Address',
            icon: 'map-pin',
            navigateToScreen: "SavedAdressScreen",
            size: 20
        },

        {
            id: '4',
            title: 'Contact Us',
            icon: 'phone',
            navigateToScreen: "ContactUsScreen",
            size: 20
        },

        {
            id: '5',
            title: 'WhatsApp Us',
            icon: 'whatsapp',
            navigateToScreen: "NavigateToWhatsApp",
            size: 20
        },


        {
            id: '6',
            title: 'About Us',
            icon: 'group',
            navigateToScreen: "AboutUsScreen",
            size: 20
        },


        {
            id: '7',
            title: 'Terms & Conditions',
            icon: 'balance-scale',
            navigateToScreen: "TermAndConditionScreen",
            size: 20
        },

        {
            id: '8',
            title: 'Log Out',
            icon: 'sign-out',
            navigateToScreen: 'LogOut',
            size: 25
        },
    ];

    const GoToScreen = (navigateToScreen) => {
        if (navigateToScreen == 'LogOut') {
            storeData('', '')
        }
        else if (navigateToScreen == "NavigateToWhatsApp") {
            let url =
                'whatsapp://send?text=' +
                "Hi, I need your help." +
                '&phone=91' + whatSAppNumber.toString();
            Linking.openURL(url)
                .then((data) => {
                    console.log('WhatsApp Opened');
                })
                .catch(() => {
                    alert('Make sure Whatsapp installed on your device');
                });
        }
        else if (navigateToScreen == "ContactUsScreen") {
            console.log(whatSAppNumber)
            let phoneNumber1 = phoneNumber.toString();

            if (Platform.OS === 'android') {
                // phoneNumber =  '8888';
            }
            else {
                // phoneNumber = '88888';
            }
            Linking.openURL(phoneNumber1);
        }


        else {
            navigation.navigate(navigateToScreen)
        }

    }

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
        try {
            await firebase.auth().signOut()
             
        }
        catch (e) {
            console.log(e)
        }
    }


    const goToEditProfileScreen = (
        name,
        PhoneNumber,
        alternatePhoneNumber,
        profilePhoto,
        email
    ) => {

        navigation.navigate('EditProfileScreen', {
            name,
            PhoneNumber,
            alternatePhoneNumber,
            profilePhoto,
            email
        });
    };

    return (
        <View style={{ flex: 1 }}>

            <View style={{ flexDirection: 'row', paddingTop: 45, paddingLeft: 15, height: 170, backgroundColor: theme.colors.primary }}>
                <View style={{ flex: 2.5 }}>
                    <Image source={{ uri: profilePhoto }} style={{ height: 80, width: 80, borderRadius: 100, }} />
                    <Text style={{ fontSize: 16, fontWeight: '700' }}>{name}</Text>
                    <Text style={{ fontSize: 13 }}>+91 {PhoneNumber}</Text>
                </View>

                <View style={{ flex: 1, paddingTop: 40 }}>
                    <TouchableOpacity
                        onPress={() => goToEditProfileScreen(
                            name,
                            PhoneNumber,
                            alternatePhoneNumber,
                            profilePhoto,
                            email
                        )}
                    >
                        <Text style={{ color: 'blue', fontWeight: '700', fontSize: windowWidth * 40 / 1000 }}>Edit Profile</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, }}>

                    <FlatList style={{ borderBottomColor: 'gray', borderBottomWidth: 0.5 }}

                        data={DATA}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (

                            <TouchableOpacity
                                onPress={() => GoToScreen(item.navigateToScreen)}
                            >
                                <View style={{ flexDirection: 'row', paddingVertical: 18, borderBottomColor: 'gray', borderBottomWidth: 0.5 }}>
                                    <View style={{ flex: 1 }}>
                                        <Icon style={{ paddingTop: 5, paddingLeft: 15, paddingRight: 15 }} name={item.icon} size={item.size} color="gray" />
                                    </View>
                                    <View style={{ flex: 6, justifyContent: 'center' }}>
                                        <Text style={{ fontWeight: '600', color: '#00000F', fontSize: 17, paddingLeft: 15 }}>{item.title}</Text>

                                    </View>

                                </View>
                            </TouchableOpacity>

                        )}
                    />




                </ScrollView>

            </View>

        </View>


    )
}