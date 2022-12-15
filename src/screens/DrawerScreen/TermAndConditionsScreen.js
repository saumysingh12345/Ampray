
import React, { useState,useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView, SafeAreaView, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { theme } from '../../core/theme'
import { useNavigation } from '@react-navigation/native'
import {firebase}  from '../../../ConfigFirebase'
export default function TermAndConditionScreen() {

    const navigation = useNavigation()
    const [TermAndConditionText, SetTermAndConditionTexts] = useState('')
    useEffect(() => {
   
        const reference = firebase.database().ref("AboutAndTermConditionText/");
        reference.on('value', Snapshot => {
           SetTermAndConditionTexts(Snapshot.val().TermAndCondition)
           
        });

   

    }, []);
    return (


        <View style={styles.container}>
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

                    <View style={{ flex: 6, paddingTop: 5 }}>
                        <Text style={{ color: "white", fontWeight: '900', fontSize: windowWidth * 60 / 1000, }}>Terms & Conditions</Text>
                    </View>

                </View>
            </View>
            <View style={{padding:10}}>
            <Text style={{ fontSize: windowWidth * 70 / 1000, fontWeight: '800', color: 'black' }}>Terms & Conditions</Text>
            <Text style={{ fontSize: windowWidth * 40 / 1000, fontWeight: '500', color: 'gray', marginBottom: windowHeight * 60 / 1000 ,paddingHorizontal:10}}>{TermAndConditionText}</Text>
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

});