import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView, SafeAreaView, FlatList, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header'
import { theme } from '../core/theme'
import { firebase } from '../../ConfigFirebase'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native';


export default function SubCategoryScreen() {
  const navigation = useNavigation()
  const [array, setArray] = useState(null)
  const route = useRoute();
  const [totalItems, setTotalItems] = useState(0)
  const [totalItems2, setTotalItems2] = useState(0)
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [indicate,setIndicat] = useState(true)

  useEffect(() => {

    var currentUUIDofUser = firebase.auth().currentUser.uid;
    firebase.database().ref('Current User Data/' + currentUUIDofUser.toString() + '/' + 'Add To Cart Data/').on('value', (snapshot) => {
      var totalItems = 0;
      snapshot.forEach((child) => {
        totalItems++;
      })
      setTotalItems(totalItems)
    })

    firebase.database().ref('/subCategory of/' + route.params.message).on('value', (snapshot) => {
      var update = []
      var totalItemsss = 0;
      snapshot.forEach((child) => {
        totalItemsss++;
        update.push({
          key: child.key,
          subcategoryType: child.val().subcategoryType,
          description: child.val().description,
          imageUrl: child.val().imageUrl,
        })
      })
      setTotalItems2(totalItemsss);
      setArray(update) // i want to add the array "Update" to the array hook i initialized 
      setIndicat(false)
    })


  }, [])


  const goToProductlistScreen = (ProductCategory, ProductSubCategory) => {

    navigation.navigate('ProductListScreen', {
      ProductCategory,
      ProductSubCategory
    });
  };

  const nullScreenMessage = (totalItems2) => {

    if (indicate) {
      return (
        <View style={{height:windowHeight,justifyContent:'center', }}>
          <ActivityIndicator
            animating={true}
            color='#bc2b78'
            size='large'
            style={{flex:1 }} />
        </View>

      )
    }

    else if (totalItems2 == 0) {

      return (
        <View style={{height:windowHeight-80,justifyContent:'center', alignItems:'center'}}>
          <Icon name='lock' size={windowWidth * 300 / 1000} color="gray" />
          <Text style={{fontSize:windowWidth*70/1000,fontWeight:'800',color:'gray'}}>Available Soon</Text>
          <Text style={{fontSize:windowWidth*40/1000,fontWeight:'500',color:'gray',marginBottom:windowHeight*60/1000}}>We are working on this service.</Text>
        </View>

      )
    }


    else {

      return (
        <View>
          <FlatList

            data={array}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (

              <TouchableOpacity
                onPress={() => goToProductlistScreen(route.params.message, item.subcategoryType.toString())}
              >
                <View style={styles.shadowContainerStyle1}>
                  <View style={{ flex: 1 }}>
                    <Image
                      style={{ height: windowWidth * 250 / 1000, width: windowWidth * 250 / 1000, borderRadius: 12 }}
                      source={{ uri: item.imageUrl }}
                    />
                  </View>
                  <View style={{ flex: 1.5, justifyContent: 'center' }}>
                    <Text style={{ fontWeight: '700', color: 'gray', fontSize: windowWidth * 50 / 1000 }}>{item.subcategoryType}</Text>
                    <Text style={{ fontWeight: '600', color: 'green', fontSize: windowWidth * 35 / 1000 }}>{item.description}</Text>

                  </View>

                  <View style={{ flex: 0.3, justifyContent: 'center', }}>
                    <Icon style={{}} name='cart-arrow-down' size={windowWidth * 80 / 1000} color="gray" />
                  </View>
                </View>
              </TouchableOpacity>

            )}
          />
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

          <View style={{ flex: 1, paddingLeft: 10, paddingTop: 5 }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
            >
              <Icon name='arrow-left' size={windowWidth * 60 / 1000} color="white" />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 6, paddingTop: 4 }}>
            <Text style={{ color: "white", fontWeight: '900', fontSize: windowWidth * 60 / 1000, }}>{route.params.message}</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('CartContainerScreen')}
          >
            <View style={{ flex: 1, alignItems: 'flex-end', paddingTop: 5, paddingRight: 15 }}>
              <Icon style={{ justifyContent: 'flex-end' }} name='shopping-cart' size={windowWidth * 80 / 1000} color="white" />
              <Text style={styles.badge}>{totalItems}</Text>
            </View>
          </TouchableOpacity>



        </View>
      </View>



      <View style={{ flex: 1 }}>


        <ScrollView style={{ flex: 1 }}>
          {
            nullScreenMessage(totalItems2)
          }


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