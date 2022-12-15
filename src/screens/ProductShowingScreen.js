import React, { useEffect, useState } from 'react'
import { Dimensions, View, Text, StyleSheet, StatusBar, ScrollView,  TouchableOpacity, Image, KeyboardAvoidingView,Alert,ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../core/theme';
import { useRoute } from '@react-navigation/native';
import Swiper from 'react-native-swiper'
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../../ConfigFirebase'
import AntDesign from 'react-native-vector-icons/AntDesign';


export default function ProductShowingScreen() {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [dropdownText, setDropDownText] = useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const route = useRoute();
    const [array, setArray] = useState([])
    var seriNum = 1;
    const [totalItems, setTotalItems] = useState(0)
    const navigation = useNavigation();
    const [indicate,setIndicate] = useState(false)

 

    const onAddToCartPressed = async (productName, imageUrl1, currentRate, totalPayment, quantity) => {
        
        if (totalPayment==0){
            Alert.alert(
                ' ❌ Product not added',
                'Please select quantity.'
            )
        }

        else{
            setIndicate(true)
        var currentUUIDofUser = firebase.auth().currentUser.uid;
        const dataRef = firebase.database().ref('Current User Data/' + currentUUIDofUser.toString() + '/' + 'Add To Cart Data/')
        dataRef
            .push({
                productName,
                imageUrl1,
                currentRate,
                totalPayment,
                quantity,
            })

            .then(() => {
                Alert.alert(' ✅ Product Added in Cart !', 'Click on cart icon to continue order.')
               setIndicate(false)
            })
            .catch((error) => {
                alert(error.message)
            })

        }
    }

    const goToCartContainerScreen = async () => {
        navigation.navigate('CartContainerScreen');
    }

    const ActivityIndicatorShowingScreen =  () => {
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

    

    useEffect(() => {



        var currentUUIDofUser = firebase.auth().currentUser.uid;
        firebase.database().ref('Current User Data/' + currentUUIDofUser.toString() + '/' + 'Add To Cart Data/').on('value', (snapshot) => {
            var totalItems = 0;
            snapshot.forEach((child) => {
                totalItems++;
            })
            setTotalItems(totalItems)
        })



        var update = [];
        for (var i = route.params.MOQ; i < 1000; i++) {
            update.push({
                label: i.toString(),
                value: seriNum.toString(),

            })
            seriNum++;
        }
        setArray(update) // i want to add the array "Update" to the array hook i initialized 


    }, [])

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Selected Quantity
                </Text>
            );
        }
        return null;
    };
    return (
        <KeyboardAvoidingView style={styles.container}>




            <StatusBar
                barStyle="light-content"

                backgroundColor={theme.colors.primary}
            />

            <View style={styles.shadowContainerStyleForHeader}>
                <View style={{ height: 45, flexDirection: 'row' }}></View>
                <View style={{ flexDirection: "row", flex: 1, }}>

                    <Text style={{ marginLeft: 20, color: "white", fontWeight: '900', fontSize: windowWidth*55/1000, flex: 10 }}>{route.params.productName}</Text>
                    <TouchableOpacity

                        onPress={() => goToCartContainerScreen()}
                    >
                        <Icon style={{ paddingTop: 5, paddingLeft: 10, paddingRight: 15, justifyContent: 'flex-end', flex: 1 }} name='shopping-cart' size={windowWidth*65/1000} color="white" />
                        <Text style={styles.badge}>{totalItems}</Text>
                    </TouchableOpacity>

                </View>
                 
            </View>

            {ActivityIndicatorShowingScreen()}

            <ScrollView style={{ flex: 1 }}>
                <View style={{ width: windowWidth, height: (windowWidth * (3 / 4)), backgroundColor: 'white', borderBottomColor: 'gray', borderBottomWidth: 2,  }}>
                    <Swiper Style={{}} >
                        <View style={{}}>
                            <Image
                                source={{ uri: route.params.imageUrl1 }}
                                style={{ height: '100%', width: '100%', }}

                            />
                        </View>


                        <View style={styles.slide1}>
                            <Image
                                source={{ uri: route.params.imageUrl2 }}
                                style={{ height: '100%', width: '100%', }}

                            />
                        </View>



                        <View style={styles.slide1}>
                            <Image
                                source={{ uri: route.params.imageUrl3 }}
                                style={{ height: '100%', width: '100%', }}

                            />
                        </View>

                    </Swiper>
                </View>


                <View style={{ paddingHorizontal: 20, paddingVertical: 10, borderBottomColor: 'gray',  }}>
                    <View>
                        <View>
                            <Text style={{ fontWeight: '700', fontSize: windowWidth*50/1000 }}>{route.params.productName}</Text>
                        </View>

                        <View>
                            <Text style={{ fontWeight: '500', fontSize: windowWidth*35/1000, color: 'gray',marginLeft:windowWidth*45/1000 }}>{route.params.shortDescription}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>

                            <Text style={{ fontWeight: '600',marginLeft:windowWidth*45/1000, color: 'gray', fontSize: windowWidth*40/1000, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>₹{route.params.previousRate}</Text>
                            <Text style={{ fontWeight: '600', color: 'black', fontSize: windowWidth*40/1000, marginLeft: 5 }}>₹{route.params.currentRate}</Text>
                            <Text style={{ fontWeight: '600', color: 'green', fontSize: windowWidth*40/1000, marginLeft: 10 }}>{parseInt(route.params.percentOff)}% off</Text>
                        </View>

                        <View style={{}}>
                            <Text style={{ fontWeight: '500',marginLeft:windowWidth*45/1000, fontSize: windowWidth*35/1000, color: 'gray' }}>Minimum Order Quantity(MOQ): {route.params.MOQ}</Text>
                        </View>

                        <View>
                            <Text style={{ fontWeight: '500',marginLeft:windowWidth*45/1000, fontSize: windowWidth*35/1000, color: 'green' }}>{route.params.additionaData}</Text>
                        </View>


                    </View>



                </View>


                <View style={{ paddingHorizontal: 20, paddingVertical: 10, }}>
                    <View>
                        <Text style={{ fontSize: windowWidth*45/1000, fontWeight: '700' }}>Product Discription</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: windowWidth*35/1000,marginLeft:windowWidth*45/1000 }}>{route.params.description}</Text>
                    </View>
                </View>


            </ScrollView>


            <View style={styles.shadowContainer1}>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                        <Text style={{marginLeft:5, color:theme.colors.primary ,fontSize: windowWidth*39/1000, fontWeight: '500', borderColor: 'gray', borderWidth: 2, height: 50, borderRadius: 10, marginVertical: 16, paddingStart: 10, paddingVertical: 12 }}>Total:  ₹ {(route.params.currentRate) * (dropdownText)}.00</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                        <View style={{}}>
                            <View style={styles.containerdropdown}>
                                {renderLabel()}
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={array}
                                    search
                                    
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={!isFocus ? 'Select Quantity' : '...'}
                                    searchPlaceholder="Type your Quantity..."
                                    value={value}
                                    onChangeText={(item) => setDropDownText(item.label)}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setValue(item.value);
                                        setDropDownText(item.label);
                                        setIsFocus(false);
                                    }}
                                    renderLeftIcon={() => (
                                        <AntDesign
                                            style={styles.icon}
                                            color={isFocus ? 'blue' : theme.colors.primary}
                                            name="Safety"
                                            size={ windowWidth*50/1000}
                                        />
                                    )}
                                />


                            </View>
                        </View>
                    </View>
                </View>


                <View style={{ backgroundColor: 'white' }}>
                    <TouchableOpacity

                        onPress={() => onAddToCartPressed(
                            route.params.productName,
                            route.params.imageUrl1,
                            route.params.currentRate,
                            ((route.params.currentRate) * (dropdownText)),
                            dropdownText,
                        )}
                    >
                        <Text style={{ marginBottom:6,paddingVertical: 8, backgroundColor: theme.colors.primary, fontSize: windowWidth*60/1000, textAlign: 'center', marginHorizontal: 5, borderRadius: 10, fontWeight:'800',color:'white'}}>Add To Cart</Text>
                    </TouchableOpacity>
                </View>

            </View>



        </KeyboardAvoidingView>


    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

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


    },


    shadowContainer1: {

        shadowColor: 'black',
        shadowOffset: {
            width: 20,
            height: 20,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.62,
        elevation: 20,
        backgroundColor: 'white',

       // paddingLeft: 10,
        paddingVertical: 10,
        borderTopStartRadius: 20,
        borderTopRightRadius: 20,
        borderColor: 'black'

    },

    shadowContainer2: {

        shadowColor: theme.colors.primary,
        shadowOffset: {
            width: 20,
            height: 20,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.62,
        elevation: 20,
        backgroundColor: "white",

        //paddingLeft: 10,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'black'

    },

    containerdropdown: {

        backgroundColor: 'white',
        paddingVertical: 16,
        marginHorizontal: 5

    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 3,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 15,
        color: theme.colors.primary
    },
    selectedTextStyle: {
        fontSize:  15,
        color:theme.colors.primary,
         
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

