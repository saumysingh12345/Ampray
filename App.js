 
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
 
import { createStackNavigator } from '@react-navigation/stack'
 
import { firebase } from './ConfigFirebase'

 

import HomeScreen from './src/screens/HomeScreen'
import CategoryContainer from './src/screens/categoryContainer'
import SubCategoryScreen from './src/screens/SubCategoryScreen'
import ProductListScreen from './src/screens/ProductListScreen'
import ProductShowingScreen from './src/screens/ProductShowingScreen'
import CartContainerScreen from './src/screens/CartContainerScreen'
 
import DrawerContainerScreen from './src/screens/DrawerScreen';
import ShoppingSreen from './src/screens/shoppingScreen'
import OldOrderScreen from './src/screens/DrawerScreen/OldOrderList'
import CouponsScreen from './src/screens/DrawerScreen/Coupons'
import SavedAdressScreen from './src/screens/DrawerScreen/SavedAddresses'
import EditProfile from './src/screens/DrawerScreen/EditProfile'
import ContactScreen from './src/screens/DrawerScreen/ContactUs'
import SavedAdressEditScreen from './src/screens/DrawerScreen/savedAddressEditScreen'
 
import InquirySendScreen from './src/screens/inquirySendScreen'
import TrackOfLiveLocation from './src/screens/TrackOfLiveLocationShowingScreen'
import TrackYourOrderScreen from './src/screens/TrackYourOrderScreen'
import OldOrderDetailsScreen from './src/screens/DrawerScreen/OldOrderDetails'
import { Dashboard, LoginScreen, RegisterScreen, ResetPasswordScreen, SplashScreen, StartScreen } from './src/screens'
import AboutUsScreen from './src/screens/DrawerScreen/AboutUsScreen'
import TermAndConditionScreen from './src/screens/DrawerScreen/TermAndConditionsScreen'
 


const Stack = createStackNavigator()
 
 

export default function App() {



  const [user, setUser] = useState(null);


  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      }
      else {
        setUser(user)
      }
    })
  }, []);

  // if (initializing) return null;


  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
             
            headerShown: false,
          }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
           
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Dashboard" component={Dashboard} />
          <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeScreen} />
          <Stack.Screen options={{ headerShown: false }} name="ShoppingScreen" component={ShoppingSreen} />
          <Stack.Screen options={{ headerShown: false }} name="CategoryContainer" component={CategoryContainer} />
          <Stack.Screen options={{ headerShown: false }} name="subCategoryScreen" component={SubCategoryScreen} />
          <Stack.Screen options={{ headerShown: false }} name="ProductListScreen" component={ProductListScreen} />
          <Stack.Screen options={{ headerShown: false }} name="ProductShowScreen" component={ProductShowingScreen} />
          <Stack.Screen options={{ headerShown: false }} name="CartContainerScreen" component={CartContainerScreen} />
          <Stack.Screen options={{ headerShown: false }} name="DrawerContainerScreen" component={DrawerContainerScreen} />
          <Stack.Screen options={{ headerShown: false }} name="OldOrderScreen" component={OldOrderScreen} />
          <Stack.Screen options={{ headerShown: false }} name="OldOrderDetailsScreen" component={OldOrderDetailsScreen} />
          <Stack.Screen options={{ headerShown: false }} name="CouponsScreen" component={CouponsScreen} />
          <Stack.Screen options={{ headerShown: false }} name="SavedAdressScreen" component={SavedAdressScreen} />
          <Stack.Screen options={{ headerShown: false }} name="ContactUsScreen" component={ContactScreen} />
          <Stack.Screen options={{ headerShown: false }} name="EditProfileScreen" component={EditProfile} />
          <Stack.Screen options={{ headerShown: false }} name="SavedAddressEditScreen" component={SavedAdressEditScreen} />
           
          <Stack.Screen options={{ headerShown: false }} name="InquirySendScreen" component={InquirySendScreen} />
          <Stack.Screen options={{ headerShown: false }} name="TrackOrderScreen" component={TrackYourOrderScreen} />
          <Stack.Screen options={{ headerShown: false }} name="TrackOfLiveLocationScreen" component={TrackOfLiveLocation} />
          <Stack.Screen options={{ headerShown: false }} name="AboutUsScreen" component={AboutUsScreen} />
          <Stack.Screen options={{ headerShown: false }} name="TermAndConditionScreen" component={TermAndConditionScreen} />
          
        </Stack.Navigator>

 
        </NavigationContainer>
    );
  }
}





