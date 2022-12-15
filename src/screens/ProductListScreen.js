import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView, SafeAreaView, FlatList, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header'
import { theme } from '../core/theme'
import { firebase } from '../../ConfigFirebase'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native';


export default function ProductListScreen() {
    const navigation = useNavigation()
    const [array, setArray] = useState([])
    const route = useRoute();
    const [totalItems, setTotalItems] = useState(0)
    const [indicate,setIndicat] = useState(true)
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    useEffect(() => {

        var currentUUIDofUser = firebase.auth().currentUser.uid;
        firebase.database().ref('Current User Data/' + currentUUIDofUser.toString() + '/' + 'Add To Cart Data/').on('value', (snapshot) => {
            var totalItems = 0;
            snapshot.forEach((child) => {
                totalItems++;
            })
            setTotalItems(totalItems)
        })

        firebase.database().ref('/Product of/' + route.params.ProductCategory.toString() + '/' + route.params.ProductSubCategory.toString()).on('value', (snapshot) => {
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
            
            setArray(update) // i want to add the array "Update" to the array hook i initialized 
            setIndicat(false)
        })


    }, []);

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
                <View style={{height:windowHeight,justifyContent:'center',marginBottom:200 }}>
                <ActivityIndicator
                  animating={true}
                  color='#bc2b78'
                  size='large'
                  style={{flex:1 }} />
              </View>
            )
        }
    }

    return (

        <View style={styles.container} >



            <StatusBar
                barStyle="light-content"

                backgroundColor={theme.colors.primary}
            />

            <View style={styles.shadowContainerStyleForHeader}>
                <View style={{ height: 45, flexDirection: 'row' }}></View>
                <View style={{ flexDirection: "row", flex: 1, }}>
                    <View style={{ flex: 1, paddingLeft: 10, paddingTop: 5 }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                        >
                            <Icon name='arrow-left' size={windowWidth * 60 / 1000} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 6 }}>
                        <Text style={{ color: "white", fontWeight: '900', fontSize: 22, }}>{route.params.ProductSubCategory}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('CartContainerScreen')}
                    >
                        <View style={{ flex: 1, alignItems: 'flex-end', paddingTop: 5, paddingRight: 15 }}>
                            <Icon style={{ justifyContent: 'flex-end' }} name='shopping-cart' size={30} color="white" />
                            <Text style={styles.badge}>{totalItems}</Text>
                        </View>
                    </TouchableOpacity>



                </View>
            </View>

            <View style={{ flex: 1 }}>
                {nullScreenMessage(indicate)}
                <ScrollView style={{ flex: 1 }}>

                    <FlatList

                        data={array}
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
                                <View style={styles.shadowContainerStyle1}>
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

});