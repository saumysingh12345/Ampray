import React, { useState, useEffect } from 'react'
import { theme } from '../core/theme'
import Swiper from 'react-native-swiper'
import { Dimensions, View, Text, StyleSheet, ScrollView, Image, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator,Linking } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase } from '../../ConfigFirebase'
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 
var windowWidth1






export default function HomeScreen() {


    
    const navigation = useNavigation();
    const [urlof1, setUrl1] = useState('');
    const [urlof2, setUrl2] = useState('');
    const [urlof3, setUrl3] = useState('');
    const [urlof4, setUrl4] = useState('');
    const [urlof5, setUrl5] = useState('');
    const [version, setVersion] = useState('');
    const [linkToPlayStore, setLinkToPlayStore] = useState('');
    const [array, setArray] = useState([])
    const [array1, setArray1] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [indicate, setIndicate] = useState(true)
    


    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    windowWidth1 = windowWidth
    useEffect(() => {

        firebase.database().ref('Product of BestSelling/').on('value', (snapshot) => {
            var update = []
            snapshot.forEach((child) => {
                update.push({
                    key: child.key,
                    productName: child.val().productName,
                    shortDescription: child.val().shortDescription,
                    currentRate: child.val().currentRate,
                    previousRate: child.val().previousRate,
                    availbleInStock: child.val().availbleInStock,
                    additionaData: child.val().additionaData,
                    MOQ: child.val().MOQ,
                    imageUrl1: child.val().imageUrl1,
                    imageUrl2: child.val().imageUrl2,
                    imageUrl3: child.val().imageUrl3,
                    description: child.val().description,
                    percentOff: parseInt(((parseInt(child.val().previousRate) - parseInt(child.val().currentRate)) / parseInt(child.val().previousRate)) * 100),
                })
            })

            setArray1(update) // i want to add the array "Update" to the array hook i initialized 
        })


        var currentUUIDofUser = firebase.auth().currentUser.uid;
        firebase.database().ref('Current User Data/' + currentUUIDofUser.toString() + '/' + 'Add To Cart Data/').on('value', (snapshot) => {
            var totalItems = 0;
            snapshot.forEach((child) => {
                totalItems++;
            })
            setTotalItems(totalItems)
        })

        const reference1 = firebase.database().ref('/SwiperData/1/image1')
        reference1.on('value', Snapshot => {
            //console.log('User Data', Snapshot.val())
            setUrl1(Snapshot.val())
        });

        const reference2 = firebase.database().ref('/SwiperData/2/image1')
        reference2.on('value', Snapshot => {
            //console.log('User Data', Snapshot.val())
            setUrl2(Snapshot.val())
        });

        const reference3 = firebase.database().ref('/SwiperData/3/image1')
        reference3.on('value', Snapshot => {
            //console.log('User Data', Snapshot.val())
            setUrl3(Snapshot.val())
        });

        const reference4 = firebase.database().ref('/SwiperData/4/image1')
        reference4.on('value', Snapshot => {
            //console.log('User Data', Snapshot.val())
            setUrl4(Snapshot.val())
        });

        const reference5 = firebase.database().ref('/SwiperData/5/image1')
        reference5.on('value', Snapshot => {
            //console.log('User Data', Snapshot.val())
            setUrl5(Snapshot.val())
        });

 

        const reference7 = firebase.database().ref("Update Controller/");
        reference7.on('value', Snapshot => {
           setVersion(Snapshot.val().version)
           setLinkToPlayStore(Snapshot.val().linkToApp)
        });



        firebase.database().ref('/CategoryData/').on('value', (snapshot) => {
            var update = []
            snapshot.forEach((child) => {
                update.push({
                    key: child.key,
                    categoryType: child.val().categoryType,
                    imageUrl: child.val().imageUrl,
                })
            })
            setIndicate(false)
            setArray(update) // i want to add the array "Update" to the array hook i initialized 
        })



    }, [])
 



    const goToSubCategoryScreen = (message) => {

        navigation.navigate('subCategoryScreen', {
            message
        });
    };



    const goToProductShowingScreen = (
        imageUrl1,
        imageUrl2,
        imageUrl3,
        productName,
        shortDescription,
        currentRate,
        previousRate,
        percentOff,
        MOQ,
        additionaData,
        description
    ) => {

        navigation.navigate('ProductShowScreen', {
            imageUrl1,
            imageUrl2,
            imageUrl3,
            productName,
            shortDescription,
            currentRate,
            previousRate,
            percentOff,
            MOQ,
            additionaData,
            description,
        });
    };



    const nullScreenMessage = () => {

        if (indicate) {
            return (
                <View style={{ height: windowHeight, justifyContent: 'center', marginBottom: 200, paddingBottom: windowHeight * 500 / 1000 }}>
                    <ActivityIndicator
                        animating={true}
                        color='#bc2b78'
                        size='large'
                        style={{ flex: 1 }} />
                </View>
            )
        }
    }
    
    const sendToPlayStore = ()=>{
         Linking.openURL(linkToPlayStore)
    }


    const UpdateShowingScreeen = () => {

        if (version!=0) {
            return (
                <View style={{ height: windowHeight, justifyContent: 'center', marginBottom: 200, alignItems: 'center', marginBottom: 500 }}>
                    <Icon4 name='update' size={windowWidth * 200 / 1000} color="white" />
                    <Text style={{ fontSize: windowWidth * 90 / 1000, fontWeight: '800' }}>Update Please</Text>
                    <Text style={{ fontSize: windowWidth * 40 / 1000, fontWeight: '600' }}>New version of app is released </Text>
                    <View style={{ marginVertical: 10, borderRadius: 10, justifyContent: 'flex-end', marginTop: 40 }}>

                        <TouchableOpacity

                            onPress={() => sendToPlayStore()  }
                        >
                            <Text style={{  backgroundColor: theme.colors.secondary, fontWeight: '900', fontSize: windowWidth * 60 / 1000, textAlign: 'center', borderRadius: 10,paddingHorizontal:30,paddingVertical:5 }}>UPDATE NOW</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }


    return (

        <View style={styles.container} >

            {UpdateShowingScreeen()}

            <StatusBar
                barStyle="light-content"

                backgroundColor={theme.colors.primary}
            />

            <View style={styles.shadowContainerStyleForHeader}>
                <View style={{ height: 45 }}></View>
                <View style={{ flexDirection: "row", flex: 1, }}>
                    <View style={{ flex: 1, paddingLeft: 10, paddingTop: 5 }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('DrawerContainerScreen')}
                        >
                            <Icon name='navicon' size={25} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 6 }}>
                        <Text style={{ color: "white", fontWeight: '900', fontSize: 25, }}>Ampray</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('CartContainerScreen')}
                    >

                        <View style={{ flex: 1, alignItems: 'flex-end', paddingTop: 5, paddingRight: 15 }}>
                            <Icon style={{ justifyContent: 'flex-end' }} name='shopping-cart' size={30} color="white" />
                            <Text style={styles.badge} >{totalItems}</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>



            {nullScreenMessage()}



            <ScrollView>
                <View style={styles.shadowContainerStyle2}>
                    <Swiper autoplay={'true'}  >

                        <View style={styles.slide1}>
                            <Image
                                source={{ uri: urlof1 }}
                                style={{ height: '100%', width: '100%', borderRadius: 20 }}

                            />
                        </View>


                        <View style={styles.slide1}>
                            <Image
                                source={{ uri: urlof2 }}
                                style={{ height: '100%', width: '100%', borderRadius: 20 }}

                            />
                        </View>



                        <View style={styles.slide1}>
                            <Image
                                source={{ uri: urlof3 }}
                                style={{ height: '100%', width: '100%', borderRadius: 20 }}

                            />
                        </View>



                        <View style={styles.slide1}>
                            <Image
                                source={{ uri: urlof4 }}
                                style={{ height: '100%', width: '100%', borderRadius: 20 }}

                            />
                        </View>



                        <View style={styles.slide1}>
                            <Image
                                source={{ uri: urlof5 }}
                                style={{ height: '100%', width: '100%', borderRadius: 20 }}

                            />
                        </View>
                    </Swiper>

                </View>

                <Text style={{ color: "black", fontWeight: '500', fontSize: 20, paddingTop: 20, paddingLeft: 10 }}>Categories</Text>

                <View style={{}}>
                    <SafeAreaView style={styles.container1}>
                        <FlatList
                            horizontal
                            data={array}
                            keyExtractor={(item) => item.key}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => goToSubCategoryScreen(item.categoryType.toString())}
                                >
                                    <View style={styles.shadowContainerStyle1}>

                                        <Image
                                            style={{ height: windowWidth * 300 / 1000, width: windowWidth * 300 / 1000, borderTopRightRadius: 15, borderTopLeftRadius: 15 }}
                                            source={{ uri: item.imageUrl }}
                                        />

                                        <Text style={{ margin: 5, fontSize: windowWidth * 30 / 1000, fontWeight: '400', width: windowWidth * 250 / 1000, height: windowWidth * 100 / 1000 }}>{item.categoryType}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />

                        <Text style={{ textAlign: 'center', color: theme.colors.secondary, paddingTop: windowWidth * 400 / 2000, marginLeft: 5, fontSize: windowWidth * 60 / 1000, fontWeight: '800' }}>⪼</Text>
                    </SafeAreaView>
                </View>

                <Text style={{ color: "black", fontWeight: '500', fontSize: 18, paddingTop: 25, paddingLeft: 10 }}>Newly Added Products</Text>

                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }}>

                        <FlatList
                            inverted
                            data={array1}
                            keyExtractor={(item) => item.key}
                            renderItem={({ item }) => (

                                <TouchableOpacity
                                    onPress={() => goToProductShowingScreen(
                                        item.imageUrl1,
                                        item.imageUrl2,
                                        item.imageUrl3,
                                        item.productName.toString(),
                                        item.shortDescription.toString(),
                                        parseInt(item.currentRate),
                                        parseInt(item.previousRate),
                                        item.percentOff,
                                        parseInt(item.MOQ),
                                        item.additionaData.toString(),
                                        item.description,
                                    )}
                                >
                                    <View style={styles.bestSellingshadowContainerStyle}>
                                        <View style={{ flex: 1 }}>
                                            <Image
                                                style={{ height: windowWidth * (3 / 12), width: windowWidth / 3, borderRadius: 12, borderWidth: 1, borderColor: 'gray' }}
                                                source={{ uri: item.imageUrl1 }}
                                            />


                                        </View>
                                        <View style={{ flex: 1.3, }}>
                                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                                <Text style={{ fontWeight: '700', color: 'black', fontSize: windowWidth * 40 / 1000 }}>{item.productName}</Text>
                                            </View>

                                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                                <Text style={{ fontWeight: '500', color: 'black', fontSize: windowWidth * 30 / 1000 }}>{item.shortDescription}</Text>
                                            </View>

                                            <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row' }}>

                                                <Text style={{ fontWeight: '600', color: 'gray', fontSize: windowWidth * 32 / 1000, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>₹{item.previousRate}</Text>
                                                <Text style={{ fontWeight: '600', color: 'black', fontSize: windowWidth * 32 / 1000, marginLeft: windowWidth * 10 / 1000 }}>₹{item.currentRate}</Text>
                                                <Text style={{ fontWeight: '600', color: 'green', fontSize: windowWidth * 32 / 1000, marginLeft: windowWidth * 15 / 1000 }}>{item.percentOff}% off</Text>
                                            </View>

                                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                                <Text style={{ fontWeight: '600', color: 'green', fontSize: windowWidth * 32 / 1000 }}>{item.availbleInStock}</Text>
                                            </View>

                                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                                <Text style={{ fontWeight: '600', color: 'black', fontSize: windowWidth * 32 / 1000 }}>{item.additionaData}</Text>
                                            </View>
                                        </View>

                                    </View>
                                </TouchableOpacity>

                            )}
                        />
                    </ScrollView>

                </View>
            </ScrollView>

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


    bestSellingshadowContainerStyle: {
        paddingVertical: 10,
        paddingHorizontal: 10,
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

    shadowContainerStyle2: {

        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 10,
        backgroundColor: "white",
        height: 200,
        borderRadius: 20,
        margin: 10,

    },


    image: {
        width: 30,
        height: 40,
        marginBottom: 8,
        flex: 1
    },
    image2: {
        width: 11,
        height: 11,
        marginBottom: 8,
        flex: 1
    },
    slide1: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
        height: 300
        //backgroundColor:'blue'
    },

    container1: {

        flexDirection: 'row',
        marginHorizontal: 5,
        borderRadius: 10

    },
    item: {
        backgroundColor: 'green',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flex: 1,
        flexDirection: 'row'

    },
    title: {
        fontSize: 32,
    },



})
