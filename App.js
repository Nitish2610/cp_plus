import React from 'react'
import AppPro from './Components/AppPro'
import HomePro from './Components/HomePro';
//import ViewProfile from './Components/ViewProfile';
//import Dashboardpage from './Components/Dashboardpage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from './Screens/ForgotPassword';
import OTPScreen from './Screens/OTPScreen';
import OTPEmail from './Screens/OTPEmail';
import SignUp from './Screens/SignUp';
import ChangePassword from './Screens/ChangePassword';
import ResetPassword from './Screens/ResetPassword';
import Myproduct from './Dashboard/Myproduct'
import Productregistration from './Dashboard/Productregistration'
import ViewProfile from './Screens/ViewProfile'
import Feedback from './Screens/Feedback';
import Warranty from './Screens/Warranty';
import ServiceNearby from './Screens/ServiceNearby';
import CarryInService from './Screens/CarryInService';
import AddCarryInService from './Screens/AddCarryInService';
import Installationrequest from './Screens/Installationrequest';
import Scanner from './Screens/Scanner';
import OnsiteService from './Screens/OnsiteService';
import ViewInstallationRequest from './Screens/ViewInstallationRequest';
import ViewOnsiteService from './Screens/ViewOnsiteService';
import ProductClaimRequest from './Dashboard/ProductClaimRequest';
// import { AuthProvider } from './Components/AuthContext';

const App = () =>{

   const Stack = createNativeStackNavigator();
   return (
    // <AuthProvider>
      <NavigationContainer>
         <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={AppPro} options={{ headerShown: false }}/>
          <Stack.Screen name="Home" component={HomePro} options={{ headerShown: false }}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{
          headerTitle: 'Back',
          // No need to specify a custom back button; the default will be shown
        }}/>
          <Stack.Screen name="OTPScreen" component={OTPScreen} options={{
          headerTitle: 'Back',
          // No need to specify a custom back button; the default will be shown
        }}/>
        <Stack.Screen name="OTPEmail" component={OTPEmail} options={{
          headerTitle: 'Back',
          // No need to specify a custom back button; the default will be shown
        }}/>
         <Stack.Screen name="SignUp" component={SignUp} options={{
          headerTitle: 'SignUp',
          // No need to specify a custom back button; the default will be shown
        }}/>
         <Stack.Screen name="ChangePassword" component={ChangePassword} options={{
          headerTitle: 'Change Password',
          // No need to specify a custom back button; the default will be shown
        }}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{
          headerTitle: 'Reset Password',
          // No need to specify a custom back button; the default will be shown
        }}/>
         <Stack.Screen name="Myproduct" component={Myproduct} options={{
          headerTitle: 'My Product',
          // No need to specify a custom back button; the default will be shown
        }}/>
        <Stack.Screen name="Productregistration" component={Productregistration} options={{
          headerTitle: 'Product Registration',
          // No need to specify a custom back button; the default will be shown
        }}/>
          <Stack.Screen name="ViewProfile" component={ViewProfile} options={{
          headerTitle: 'User Profile',
          // No need to specify a custom back button; the default will be shown
        }}/>
        <Stack.Screen name="Feedback" component={Feedback} options={{
          headerTitle: 'Feedback',
          // No need to specify a custom back button; the default will be shown
        }}/>
        <Stack.Screen name="Warranty" component={Warranty} options={{
          headerTitle: 'Warranty',
          // No need to specify a custom back button; the default will be shown
        }}/>
         <Stack.Screen name="ServiceNearby" component={ServiceNearby} options={{
          headerTitle: 'Service Nearby',
          // No need to specify a custom back button; the default will be shown
        }}/>
        <Stack.Screen name="AddCarryInService" component={AddCarryInService} options={{
          headerTitle: 'Add Carry In Service',
          // No need to specify a custom back button; the default will be shown
        }}/>
         <Stack.Screen name="CarryInService" component={CarryInService} options={{
          headerTitle: 'Carry In Service View Details',
          // No need to specify a custom back button; the default will be shown
        }}/>
        <Stack.Screen name="Installationrequest" component={Installationrequest} options={{
          headerTitle: 'Add Installation Request',
          // No need to specify a custom back button; the default will be shown
        }}/>
        <Stack.Screen name="Scanner" component={Scanner} options={{
          headerTitle: 'Scanner',
          // No need to specify a custom back button; the default will be shown
        }}/>
        <Stack.Screen name="OnsiteService" component={OnsiteService} options={{
          headerTitle: 'Onsite Service',
          // No need to specify a custom back button; the default will be shown
        }}/>
        <Stack.Screen name="ViewInstallationRequest" component={ViewInstallationRequest} options={{
          headerTitle: 'Installation Request View Details',
          // No need to specify a custom back button; the default will be shown
        }}/>
        <Stack.Screen name="ViewOnsiteService" component={ViewOnsiteService} options={{
          headerTitle: 'Onsite Service View Details',
          // No need to specify a custom back button; the default will be shown
        }}/>
         <Stack.Screen name="ProductClaimRequest" component={ProductClaimRequest} options={{
          headerTitle: 'Product Claim Details',
          // No need to specify a custom back button; the default will be shown
        }}/>
          {/* <Stack.Screen name="Profile" component={ViewProfile}/>
          <Stack.Screen name="Dashboard" component={Dashboardpage}/> */}
         </Stack.Navigator>
      </NavigationContainer>
    //</AuthProvider> 
   )
}

export default App;