import React from 'react'
import HomeScreen from './HomeScreen.js'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/EvilIcons'
import Icon3 from 'react-native-vector-icons/AntDesign'
import Icon4 from 'react-native-vector-icons/Entypo'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import TrackYourOrderScreen from './TrackYourOrderScreen';
import IndustrialTrainingScreen from './IndustrialTrainingScreen';
import CartContainerScreen from './CartContainerScreen';
import ShoppingScreen from './shoppingScreen';
 
 
const Tab = createBottomTabNavigator();
 
 
export default function Dashboard() {
  return (

    <View style ={{flex:1}}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen options={{ tabBarIcon: ({ size, color }) => (<Icon3 name={"home"} color='gray' size={25} />) }} name="Home" component={HomeScreen} />
        <Tab.Screen options={{ tabBarIcon: ({ size, color }) => (<Icon2 name={"cart"} color='gray' size={32} />) }} name="Shop Now" component={ShoppingScreen} />
        <Tab.Screen options={{ tabBarIcon: ({ size, color }) => (<Icon name={"laptop"} color='gray' size={27} />) }} name="Training" component={ IndustrialTrainingScreen} />
        <Tab.Screen options={{ tabBarIcon: ({ size, color }) => (<Icon2 name={"location"} color='gray' size={32} />) }} name="Track Order" component={TrackYourOrderScreen} />
        <Tab.Screen options={{ tabBarIcon: ({ size, color }) =>  (<Icon4 name={"shopping-bag"} color='gray' size={22} />)}} name="Cart Bag" component={CartContainerScreen} />
      </Tab.Navigator>

    

    </View>
 
 
 
  
  )
}