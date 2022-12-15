import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView, SafeAreaView, FlatList, TouchableOpacity, Image,Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header'
import { theme } from '../core/theme'
import { firebase } from '../../ConfigFirebase'
import { useNavigation } from '@react-navigation/native'



export default function ShoppingSreen() {
  const navigation = useNavigation()
  const [array, setArray] = useState([])
  const [totalItems, setTotalItems] = useState(0)

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


    firebase.database().ref('/CategoryData/').on('value', (snapshot) => {
      var update = []
      snapshot.forEach((child) => {
        console.log(child)
        update.push({
          key: child.key,
          categoryType: child.val().categoryType,
          imageUrl: child.val().imageUrl,
        })
      })

      setArray(update) // i want to add the array "Update" to the array hook i initialized 
    })


  }, []);

  const goToSubCategoryScreen = (message) => {

    navigation.navigate('subCategoryScreen', {
      message
    });
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
              <Icon name='arrow-left' size={windowWidth*60/1000} color="white" />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 6 ,paddingTop:5}}>
            <Text style={{ color: "white", fontWeight: '900', fontSize: windowWidth*60/1000, }}>All Categories</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('CartContainerScreen')}
          >
            <View style={{ flex: 1, alignItems: 'flex-end', paddingTop: 5, paddingRight: 15 }}>
              <Icon style={{ justifyContent: 'flex-end' }} name='shopping-cart' size={windowWidth*80/1000} color="white" />
              <Text style={styles.badge}>{totalItems}</Text>

            </View>
          </TouchableOpacity>





        </View>
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>

          <FlatList

            data={array}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (

              <TouchableOpacity
                onPress={() => goToSubCategoryScreen(item.categoryType.toString())}
              >
                <View style={styles.shadowContainerStyle1}>
                  <View style={{ flex: 1 }}>
                    <Image
                      style={{ height: windowWidth*250/1000, width: windowWidth*250/1000, borderRadius: 12 }}
                      source={{ uri: item.imageUrl }}
                    />
                  </View>
                  <View style={{ flex: 1.5, justifyContent: 'center' }}>
                    <Text style={{ fontWeight: '600', color: 'gray', fontSize: windowWidth*50/1000 }}>{item.categoryType}</Text>

                  </View>

                  <View style={{ flex: 0.3, justifyContent: 'center', }}>
                    <Icon style={{}} name='cart-arrow-down' size={windowWidth*80/1000} color="gray" />
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
    marginRight:5

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