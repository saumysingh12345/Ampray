import { View, Text, Alert , StyleSheet , TextInput, TouchableOpacity} from "react-native";
import React, { useRef, useState } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../firebase";
import firebase from "firebase/compat/app";
import { globleColors } from "../globle/globle";


const Otp = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [varificationId, setVarificationId] = useState(null);
    const recptchVerifire = useRef(null);

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
            .verifyPhoneNumber(phoneNumber, recptchVerifire.current)
            .then(setVarificationId);
        setPhoneNumber('');
    };

    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            varificationId,
            code
        );
        firebase.auth().signInWithCredential(credential)

            .then(() => {
                setCode('');
            })

            .catch((error) => {
                alert(error);
            })

        Alert.alert('Login Successful',);
    }


    return (
        <View style={styles.container}>
            <View style={styles.logInView}>
                <Text style={styles.logInText}>Login</Text>

                <FirebaseRecaptchaVerifierModal 
                   ref = {recptchVerifire}
                   firebaseConfig = {firebaseConfig}
                />

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: globleColors.grey2, flex: 1, marginHorizontal: 20, paddingTop: 10, fontSize: 15, }}>Phone Number</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: "column", justifyContent: 'center', flex: 1, }}>
                        <Text style={{ color: 'black', fontSize: 15, marginLeft: 20, fontWeight: '900' }}>+ 91</Text>
                    </View>
                    <TextInput
                        style={styles.phoneNumberInputBox}
                        placeholder="Enter your 10 digits phone number"
                        keyboardType='phone-pad'
                        placeholderTextColor={globleColors.grey4}
                        color={globleColors.lightblack}
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}

                    />
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-end", marginHorizontal: 20, }}>
                        <TouchableOpacity
                            onPress ={sendVerification}
                            style={{ flex: 1, borderRadius: 10, flexDirection: 'row', backgroundColor: globleColors.headerColor, justifyContent: 'center' }}>
                            <Text style={{ color: 'white', paddingVertical: 10, fontSize: 20, fontWeight: 'bold' }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: globleColors.grey2, flex: 1, marginHorizontal: 20, paddingTop: 10, fontSize: 15, }}>Password</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        secureTextEntry
                        style={styles.passwordInputBox}
                        placeholder="Enter your passward"
                        placeholderTextColor={globleColors.grey4}
                        color={globleColors.lightblack}
                         
                        onChangeText={setCode}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-end", }}>
                        <Text style={{ color: globleColors.grey1, marginHorizontal: 20, paddingBottom: 10, fontWeight: 'bold' }}>Forget password?</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-end", marginHorizontal: 20, }}>
                        <TouchableOpacity
                            onPress={confirmCode}
                            style={{ flex: 1, borderRadius: 10, flexDirection: 'row', backgroundColor: globleColors.headerColor, justifyContent: 'center' }}>
                            <Text style={{ color: 'white', paddingVertical: 10, fontSize: 20, fontWeight: 'bold' }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    )

}

export default Otp
 
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#faf0f0',
        flex: 1,
        flexDirection: 'column',

    },

    logoView: {
        marginTop: 10,
        //height: 200,
        display: "flex",
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',

    },

    logoImage: {
        width: 150,
        height: 150,

    },

    logInView: {

        flex: 5,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    logInText: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',

    },

    phoneNumberInputBox: {
        backgroundColor: 'white',
        borderRadius: 10,
        flex: 5,
        marginHorizontal: 20,
        paddingLeft: 30,
        borderColor: 'black',
        borderWidth: 2,
    },

    passwordInputBox: {
        backgroundColor: 'white',
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 20,
        paddingLeft: 30,
        borderColor: 'black',
        borderWidth: 2,
    },

    createAccountView: {

        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

})