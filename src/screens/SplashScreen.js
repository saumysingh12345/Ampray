
import React, { useEffect } from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    StatusBar,
    
    ActivityIndicator
} from 'react-native';

import { firebase } from '../../ConfigFirebase'
 
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {

    useEffect(() => {

        getData()

    }, []);


    const getData = async () => {
        var email, password;
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            if (value !== null) {
                email = value;
            }
        } catch (e) {

        }
        try {
            const value = await AsyncStorage.getItem('@storage_Key2')
            if (value !== null) {
                password = value;
            }
        } catch (e) {


        }

        onLoginPressed(email, password)
    }


    const onLoginPressed = async (email, password) => {


        try {

            await firebase.auth().signInWithEmailAndPassword(email, password)

        }
        catch (error) {

            navigation.navigate('StartScreen')
        }

    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                
                    <ActivityIndicator
                        animating={true}
                        color='#009387'
                        size='large'
                        style={styles.activityIndicator} />
                

            </View>
        </View>


    );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.30;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: 'black',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop: 5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
});

