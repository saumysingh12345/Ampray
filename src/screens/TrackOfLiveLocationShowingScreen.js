import React, { useEffect, useState } from 'react'
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, ScrollView, Dimensions, FlatList, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../core/theme'
import { firebase } from '../../ConfigFirebase'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import Slider from '@react-native-community/slider';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 
export default function TrackOfLiveLocation() {

    const navigation = useNavigation()
    const [allAddress, setAllAddress] = useState('')
    const [nameRead, setNameRead] = useState('')
    const [PhoneNumberRead, setPhoneNumberRead] = useState('')
    const [alternatePhoneNumberRead, setAlternatePhoneNumberRead] = useState('')
    const route = useRoute();
    const [array, setArray] = useState([])
    const [array1, setArray1] = useState([])
    const [ready,setReady] = useState(false)
    const [liveTackPosition, setlivetrackposition] = useState(5)
    const [OrderShippedDetails,setOSD] = useState("Not Shipped Yet")
    const [OutOfDeliveryDetails,setOOD] = useState("Waiting Out for Delivery")

    useEffect(() => {

        var currentUUIDofUser = firebase.auth().currentUser.uid;
        firebase.database().ref('Current User Data/' + currentUUIDofUser.toString() + '/' + 'Saved Address Data/').on('value', (snapshot) => {


            snapshot.forEach((child) => {

                setNameRead(child.val().name)
                setPhoneNumberRead(child.val().PhoneNumber)
                setAlternatePhoneNumberRead(child.val().alternatePhoneNumber)
                setAllAddress(child.val().houseName + ', ' + child.val().roadName + ', ' + child.val().localMarket + ', ' + child.val().cityName + ', ' + child.val().stateName + ' - ' + child.val().pinCode)
            })
        })



        var currentUUIDofUser = firebase.auth().currentUser.uid;
        firebase.database().ref('Current User Data/' + currentUUIDofUser.toString() + '/' + 'Track Your Order Data/' + route.params.message + '/' + 'ProductsTaken').on('value', (snapshot) => {
            var update = []
            //totalMoneyPay = 0
            //totalItemsss = 0
            snapshot.forEach((child) => {
                // totalItemsss++;
                //totalMoneyPay = totalMoneyPay + child.val().totalPayment;
                update.push({
                    key: child.key,
                    categoryType: child.val().categoryType,
                    imageUrl: child.val().imageUrl,
                    currentRate: child.val().currentRate,
                    totalPayment: child.val().totalPayment,
                    quantity: child.val().quantity,

                })
            })

            // console.log(update)
            // setTotalMoney(totalMoneyPay)
            setArray(update) // i want to add the array "Update" to the array hook i initialized 
            //setIndicate(false)
            //setTotalItems(totalItemsss)
        })



        var currentUUIDofUser = firebase.auth().currentUser.uid;
        firebase.database().ref('Current User Data/' + currentUUIDofUser.toString() + '/' + 'Track Your Order Data/' + route.params.message + '/' + 'liveTrack').on('value', (snapshot) => {
            var update = []
            //totalMoneyPay = 0
            //totalItemsss = 0
            snapshot.forEach((child) => {
                // totalItemsss++;
                //totalMoneyPay = totalMoneyPay + child.val().totalPayment;
                update.push({
                    key: child.key,
                    Delivered: child.val().Delivered,

                    OrderReceived: child.val().OrderReceived,
                    OrderConfirmed: child.val().OrderConfirmed,
                    OrderShipped: child.val().OrderShipped,
                    Outfordelivery: child.val().Outfordelivery,
                    Delivered: child.val().Delivered



                })
            })

            console.log(update)
            setReady(true)
            // setTotalMoney(totalMoneyPay)
            setArray1(update) // i want to add the array "Update" to the array hook i initialized 
            //setIndicate(false)
            //setlivetrackposition(40)
            //setTotalItems(totalItemsss)

         

            if(update[0]["OrderConfirmed"]!='False'){
                setlivetrackposition(19)
            }

             if(update[0]["OrderShipped"]!='False'){
                setlivetrackposition(40)
                setOSD(update[0]["OrderShipped"])
            }
 
            
             if(update[0]["Outfordelivery"]!='False'){
                setlivetrackposition(80)
                setOOD(update[0]["Outfordelivery"])
            }

                
             if(update[0]["Delivered"]!='False'){
                setlivetrackposition(100)
            }
        })
 
    }, []);


    const OrderConfirmedShowingView = () => {
        if(ready)
    {    if (array1[0]["OrderConfirmed"]!='False') {
            
            return (
                <Text style={{ fontSize: windowWidth * 40 / 1000, fontWeight: '700' }}>---- Order confirmed</Text>
            )
        }}
        //setReady(false)
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
                            <Icon name='arrow-left' size={windowWidth*50/1000} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 6 }}>
                        <Text style={{ color: "white", fontWeight: '900', fontSize: windowWidth*60/1000, }}>Order Tracking</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('CartContainerScreen')}
                    >


                    </TouchableOpacity>

                </View>
            </View>

            <ScrollView>


                <View style={{ backgroundColor: 'white', borderRadius: 10, margin: 10, padding: 10 }}>
                    <Text style={{ fontSize: 22, fontWeight: '600' }}>{nameRead}</Text>
                    <Text>{allAddress}</Text>
                    <Text> </Text>
                    <Text>{PhoneNumberRead}</Text>
                    <Text>{alternatePhoneNumberRead}</Text>
                </View>


                <View style={{ padding: windowWidth * 39 / 1000, flexDirection: 'row' }}>

                    <View style={{ flex: 1,justifyContent:'flex-start'}}>
                        <View style={{ flexDirection: 'column', transform: [{ rotate: "+90deg" }] }}>
                            <Slider
                                vertical={true}
                                thumbTintColor='green'
                                disabled={true}
                                style={{ width:windowHeight/1.9}}
                                minimumValue={0}
                                maximumValue={100}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor="#000000"

                                value={liveTackPosition}

                            />
                        </View>
                    </View>



                    <View style={{ flex: 5, height: windowHeight / 1.8 }}>
                        <View style={{ height: (windowHeight / 1.8) * 20 / 100 }}>
                            <Text style={{ fontSize: windowWidth * 40 / 1000, fontWeight: '700' }}>---- Order Received</Text>
                            <Text style={{ fontSize: windowWidth * 30 / 1000, color: 'gray' }}>            Please wait for our confirmation.</Text>

                            {OrderConfirmedShowingView()}

                        </View>

                        <View style={{ height: (windowHeight / 1.8) * 40 / 100 }}>
                            <Text style={{ fontSize: windowWidth * 40 / 1000, fontWeight: '700' }}>---- Order Shipped</Text>
                            <Text style={{ fontSize: windowWidth * 30 / 1000, color: 'gray' }}>            {OrderShippedDetails}.</Text>
                        </View>


                        <View style={{ height: (windowHeight / 1.8) * 20 / 100 }}>
                            <Text style={{ fontSize: windowWidth * 40 / 1000, fontWeight: '700' }}>---- Out for delivery</Text>
                            <Text style={{ fontSize: windowWidth * 30 / 1000, color: 'gray' }}>             {OutOfDeliveryDetails}.</Text>
                        </View>


                        <View style={{ height: (windowHeight / 1.8) * 20 / 100 }}>
                            <Text style={{ fontSize: windowWidth * 40 / 1000, fontWeight: '700' }}>---- Delivered</Text>
                            <Text style={{ fontSize: windowWidth * 30 / 1000, color: 'gray' }}>             Contact us, If you haven't got your order.</Text>
                        </View>
                    </View>

                </View>


                <Text style={{ color: "black", fontWeight: '500', fontSize: 20, paddingLeft: 10 }}>Your Order</Text>

                <FlatList

                    data={array}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => (


                        <View style={styles.shadowContainerStyle1}>
                            <View style={{ flex: 1 }}>
                                <Image
                                    style={{ height: windowWidth * 250 / 1000, width: windowWidth * 250 / 1000, borderRadius: 12 }}
                                    source={{ uri: item.imageUrl }}
                                />
                            </View>
                            <View style={{ flex: 2, justifyContent: 'center' }}>
                                <Text style={{ fontWeight: '600', color: theme.colors.secondary, fontSize: windowWidth * 50 / 1000 }}>{item.categoryType}</Text>
                                <Text style={{ fontWeight: '600', color: 'gray', fontSize: windowWidth * 40 / 1000 }}>Rate: ₹{item.currentRate}.00</Text>
                                <Text style={{ fontWeight: '600', color: 'gray', fontSize: windowWidth * 40 / 1000 }}>Total Quantity:{item.quantity} Pcs</Text>
                                <Text style={{ fontWeight: '600', color: theme.colors.secondary, fontSize: windowWidth * 40 / 1000 }}>Total: ₹{item.totalPayment}.00</Text>

                            </View>
                            
                        </View>


                    )}
                />
                <TouchableOpacity

                    onPress={() => console.log(array1)}
                >
                     

                </TouchableOpacity>
            </ScrollView>

        </View>

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
        padding: 10,
        marginHorizontal: 10,
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
        flexDirection: 'row'
    },




})