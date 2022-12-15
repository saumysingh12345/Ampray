
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView, SafeAreaView, FlatList, TouchableOpacity, Image,Dimensions,ActivityIndicator } from 'react-native'
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
 
import { theme } from '../core/theme'
import { firebase } from '../../ConfigFirebase'
import { useNavigation } from '@react-navigation/native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function TrackYourOrderScreen() {
  const navigation = useNavigation()
  const [array, setArray] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [indicate, setIndicate] = useState(false)
   

 

  useEffect(() => {
    setIndicate(true)

    var currentUUIDofUser = firebase.auth().currentUser.uid;
    firebase.database().ref('Current User Data/' + currentUUIDofUser.toString() + '/' + 'Track Your Order Data/').on('value', (snapshot) => {
      var update = []
      var totalItemsss=0
      snapshot.forEach((child) => {
          //console.log(child)
        totalItemsss++;
        update.push({
          key: child.key,
          Date: child.val().Date,
          TotalPayment: child.val().TotalPayment,
          imageUrl:child.val().ProductsTaken['0']['imageUrl']
        })
      })
      console.log(totalItemsss)
      setTotalItems(totalItemsss)
      setArray(update) // i want to add the array "Update" to the array hook i initialized 
      setIndicate(false)
    })

 


  }, []);

  const goToSubCategoryScreen = (message) => {

    navigation.navigate('TrackOfLiveLocationScreen', {
      message
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

    else if (totalItems == 0) {

      return (
        <View style={{ height: windowHeight, marginBottom: 400, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name='cart-plus' size={windowWidth * 300 / 1000} color="gray" />
          <Text style={{ fontSize: windowWidth * 70 / 1000, fontWeight: '800', color: 'gray' }}>Empty Order List</Text>
          <Text style={{ fontSize: windowWidth * 40 / 1000, fontWeight: '500', color: 'gray', marginBottom: windowHeight * 60 / 1000 }}>Look like you haven't added any item yet.</Text>

          <TouchableOpacity

            onPress={() =>  navigation.navigate('ShoppingScreen')}
          >
             <Text style={{backgroundColor:theme.colors.primary,paddingHorizontal:30,paddingVertical:10,borderRadius:10, fontWeight:'800',fontSize:18}}>Shop Now</Text>

          </TouchableOpacity>
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
              <Icon name='arrow-left' size={windowWidth*60/1000} color="white" />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 6 ,paddingTop:5}}>
            <Text style={{ color: "white", fontWeight: '900', fontSize: windowWidth*60/1000, }}>Track Orders</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('CartContainerScreen')}
          >
            <View style={{ flex: 1, alignItems: 'flex-end', paddingTop: 5, paddingRight: 15 }}>
               
            </View>
          </TouchableOpacity>





        </View>
      </View>

      <View style={{ flex: 1 }}>
        {nullScreenMessage()}
        <ScrollView style={{ flex: 1 }}>
 
          <FlatList
            inverted
            data={array}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (

              <TouchableOpacity
                onPress={() => goToSubCategoryScreen(item.key.toString())}
              >
                <View style={styles.shadowContainerStyle1}>
                  <View style={{ flex: 1,justifyContent:'center' }}>
                      
                     <Text style={{fontSize: windowWidth*36/1000}}>{item.Date}</Text>
                      
                     <Text style={{fontSize: windowWidth*30/1000,color:theme.colors.secondary}} >Total: ₹{item.TotalPayment}.00</Text>
                     
                  </View>
                  <View style={{ flex: 1.5, justifyContent: 'center'  }}>
                  <Image
                      style={{ height: windowWidth * 250 / 1000, width: windowWidth * 250 / 1000, borderRadius: 12 }}
                      source={{ uri: item.imageUrl }}
                    />

                    <View style={styles.badge}></View>
                  </View>

                  <View style={{ flex: 0.3, justifyContent: 'center', }}>
                    <Icon1 style={{}} name='location' size={windowWidth*80/1000} color={theme.colors.secondary} />
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


  badge: {
    color: '#fff',
    position: 'absolute',
    zIndex: -4,
    top: 0,
    right: 80,
    padding: 1,
    paddingRight:50,
    backgroundColor: 'gray',
    borderRadius: 5,
    borderColor:'green',
    marginRight: 5,
    height:windowWidth * 250 / 1000,
    width:windowWidth * 250 / 1000
  },

  shadowContainerStyle1: {
    padding: 10,
    marginHorizontal: 10,
    height:windowHeight/7,
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