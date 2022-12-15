import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView, SafeAreaView, FlatList, TouchableOpacity, Image, Dimensions, ActivityIndicator, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../core/theme'
import { firebase } from '../../ConfigFirebase'
import { useNavigation } from '@react-navigation/native'
var totalMoneyPay = 0;
var totalItemsss = 0;

export default function ShoppingSreen() {
  const navigation = useNavigation()
  const [array, setArray] = useState([])
  const [totalmoney, setTotalMoney] = useState(0)
  const [totalItemss, setTotalItems] = useState(0)
  const [indicate, setIndicate] = useState(true)
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  useEffect(() => {

    var currentUUIDofUser = firebase.auth().currentUser.uid;
    firebase.database().ref('Current User Data/' + currentUUIDofUser.toString() + '/' + 'Add To Cart Data/').on('value', (snapshot) => {
      var update = []
      totalMoneyPay = 0
      totalItemsss = 0
      snapshot.forEach((child) => {
        totalItemsss++;
        totalMoneyPay = totalMoneyPay + child.val().totalPayment;
        update.push({
          key: child.key,
          categoryType: child.val().productName,
          imageUrl: child.val().imageUrl1,
          currentRate: child.val().currentRate,
          totalPayment: child.val().totalPayment,
          quantity: child.val().quantity,

        })
      })
      setTotalMoney(totalMoneyPay)
      setArray(update) // i want to add the array "Update" to the array hook i initialized 
      setIndicate(false)
      setTotalItems(totalItemsss)
    })


  }, []);

  const deleteDatafromCartRealTimeDatabase = async (key) => {
    var currentUUIDofUser = firebase.auth().currentUser.uid;
    await firebase.database().ref('Current User Data/' + currentUUIDofUser.toString() + '/' + 'Add To Cart Data/' + key).remove();

    Alert.alert('✅ Product deleted successfully !!')
  }

  const goToPaymentScreen = (message, array) => {

    navigation.navigate('InquirySendScreen', {
      message,
      array
    });
  };





  const nullScreenMessage = (totalItems2) => {

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

    else if (totalItemss == 0) {

      return (
        <View style={{ height: windowHeight, marginBottom: 400, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name='cart-plus' size={windowWidth * 300 / 1000} color="gray" />
          <Text style={{ fontSize: windowWidth * 70 / 1000, fontWeight: '800', color: 'gray' }}>Empty Shopping Bag</Text>
          <Text style={{ fontSize: windowWidth * 40 / 1000, fontWeight: '500', color: 'gray', marginBottom: windowHeight * 60 / 1000 }}>Look like you haven't added any item yet.</Text>

          <TouchableOpacity

            onPress={() => navigation.navigate('ShoppingScreen')}
          >
            <Text style={{ backgroundColor: theme.colors.primary, paddingHorizontal: 30, paddingVertical: 10, borderRadius: 10, fontWeight: '800', fontSize: 18 }}>Shop Now</Text>

          </TouchableOpacity>
        </View>

      )
    }
  };

  return (

    <View style={styles.container} >
      <StatusBar
        barStyle="light-content"

        backgroundColor={theme.colors.primary}
      />

      <View style={styles.shadowContainerStyleForHeader}>
        <View style={{ height: 45, flexDirection: 'row' }}></View>
        <View style={{ flexDirection: "row", flex: 1, }}>

          <Text style={{ marginLeft: 20, color: "white", fontWeight: '900', fontSize: 20, flex: 10 }}>Your Cart</Text>

        </View>
      </View>

      {nullScreenMessage()}

      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>


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
                <View style={{ flex: 1.5, justifyContent: 'center' }}>
                  <Text style={{ fontWeight: '600', color: 'black', fontSize: windowWidth * 50 / 1000 }}>{item.categoryType}</Text>
                  <Text style={{ fontWeight: '600', color: 'gray', fontSize: windowWidth * 40 / 1000 }}>Rate: ₹{item.currentRate}.00</Text>
                  <Text style={{ fontWeight: '600', color: 'gray', fontSize: windowWidth * 35 / 1000 }}>Total Quantity: {item.quantity} Pcs</Text>
                  <Text style={{ fontWeight: '600', color: 'gray', fontSize: windowWidth * 40 / 1000 }}>Total: ₹{item.totalPayment}.00</Text>

                </View>
                <View style={{ flex: 0.3, justifyContent: 'center', }}>
                  <TouchableOpacity

                    onPress={() => deleteDatafromCartRealTimeDatabase(item.key)}
                  >
                    <Icon style={{}} name='trash' size={windowWidth * 60 / 1000} color='#009387' />

                  </TouchableOpacity>

                </View>
              </View>


            )}
          />
        </ScrollView>

      </View>

      <View style={{ backgroundColor: '#e6e6e6', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', paddingVertical: windowHeight / 45, paddingHorizontal: 5 }}>
          <Text style={{ flex: 1, fontWeight: '600', color: theme.colors.primary, fontSize: windowWidth * 50 / 1000, }}>Total Amount:</Text>
          <Text style={{ flex: 1, fontWeight: '600', color: theme.colors.primary, fontSize: windowWidth * 50 / 1000, textAlign: 'right' }}>₹ {parseFloat(totalmoney)}.00</Text>
        </View>


        <TouchableOpacity

          onPress={() => goToPaymentScreen(totalmoney, array)}
        >
          <Text style={{ backgroundColor: theme.colors.primary, color: 'white', fontSize: windowWidth * 70 / 1000, textAlign: 'center', fontWeight: '800', paddingVertical: 5, marginBottom: 15, borderRadius: 10 }}>Order Now</Text>
        </TouchableOpacity>
      </View>
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

  badge: {
    color: '#fff',
    position: 'absolute',
    zIndex: 10,
    top: 1,
    right: 1,
    padding: 1,
    backgroundColor: 'red',
    borderRadius: 5
  },

});