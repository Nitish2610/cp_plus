// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet,Alert, Image ,Dimensions} from 'react-native';

// const { width, height } = Dimensions.get('window');

// const HomePro = ({ navigation, route }) => {
//   const userData = route.params?.userData;
//   const onViewProfilePress = () => {
//     // Navigate to the Profile screen when the button is pressed
//     navigation.navigate('Profile',{ userData });
//   };

//   // const onDashboardPress = () => {
//   //   // Navigate to the Dashboard screen when the button is pressed
//   //   // You need to replace 'Dashboard' with the actual name of your Dashboard screen
//   //   navigation.navigate('Dashboard');
//   // };

//   const onDashboardPress = async ({ navigation, route }) => {
//     const usercode = route.params?.usercode;
//     const token = route.params?.token;
//     try {
//       const response = await fetch('http://devservice.adityagroup.com/aditya_service/rma/API_CPPLUS/dashboard/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: usercode,
//           token: token
//         }),
//       });

//        console.log('Response Status:', response.status);
//       const result1 = await response.json();
//        console.log('Response Content:', result1);

//       if (result1.success) {
//         //console.log(result);
//         navigation.navigate("Dashboard",{ userData1: result1 });
//       } else {
//         Alert.alert(result1.message || "Login failed");
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       Alert.alert('An error occurred. Please try again later.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.mainheadercontainer}>
//       <View style={styles.leftContainer}>
//        <Image
//         source={require('../Images/intelli_logo.jpg')} // Replace with the actual path to your logo image
//         style={styles.logo}
//       />
//        </View>
//        <View style={styles.rightContainer}>
//          <Text style={styles.rightText}>AIL-RMA TEST ID</Text>
//        </View>
//       </View>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => onDashboardPress({ navigation, route })} style={styles.headerButton}>
//           <Text style={styles.buttonText}>Dashboard</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={onViewProfilePress} style={styles.headerButton}>
//           <Text style={styles.buttonText}>View Profile</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     // justifyContent: 'center',
// //     // alignItems: 'center',
// //   },
// //   logo: {
// //     width: 100,
// //     height: 40,
// //     resizeMode: 'contain',
// //     alignSelf: 'center',
// //    // marginBottom: 10,
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     width: '100%',
// //     paddingHorizontal: 20,
// //     marginBottom: 20,
// //   },
// //   headerButton: {
// //     backgroundColor: '#4630EB',
// //     padding: 10,
// //     borderRadius: 5,
// //   },
// //   buttonText: {
// //     color: '#FFFFFF',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //       button: {
// //         marginTop: 20,
// //         backgroundColor: '#4630EB',
// //         padding: 10,
// //         borderRadius: 5,
// //       },
// //       leftContainer:{
// //         marginLeft:10
// //       },
// //       rightContainer:{
// //         marginRight:10
// //       },
// //       rightText:{
// //        fontSize:16,
// //        color:'#000000'
// //       },
// //       mainheadercontainer: {
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         alignItems: 'center',
// //         paddingHorizontal: 16,
// //         paddingTop: 16,
// //       },
// // });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//   },
//   logo: {
//     width: 100 * (width / 411.428571), // Adjusted width
//     height: 40 * (height / 826), // Adjusted height
//     resizeMode: 'contain',
//     alignSelf: 'center',
//     // marginBottom: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     paddingHorizontal: 20 * (width / 411.428571), // Adjusted paddingHorizontal
//     marginBottom: 20 * (height / 826), // Adjusted marginBottom
//   },
//   headerButton: {
//     backgroundColor: '#4630EB',
//     padding: 10 * (width / 411.428571), // Adjusted padding
//     borderRadius: 5 * (width / 411.428571), // Adjusted borderRadius
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 16 * (width / 411.428571), // Adjusted fontSize
//     fontWeight: 'bold',
//   },
//   button: {
//     marginTop: 20 * (height / 826), // Adjusted marginTop
//     backgroundColor: '#4630EB',
//     padding: 10 * (width / 411.428571), // Adjusted padding
//     borderRadius: 5 * (width / 411.428571), // Adjusted borderRadius
//   },
//   leftContainer: {
//     marginLeft: 10 * (width / 411.428571), // Adjusted marginLeft
//   },
//   rightContainer: {
//     marginRight: 10 * (width / 411.428571), // Adjusted marginRight
//   },
//   rightText: {
//     fontSize: 16 * (width / 411.428571), // Adjusted fontSize
//     color: '#000000',
//   },
//   mainheadercontainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16 * (width / 411.428571), // Adjusted paddingHorizontal
//     paddingTop: 16 * (height / 826), // Adjusted paddingTop
//   },
// });

// export default HomePro;

// main code

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   BackHandler,
//   Alert,
//   Modal,
//   TouchableWithoutFeedback,
//   Dimensions,
// } from 'react-native';

// const {width, height} = Dimensions.get('window');
// const scale = width / 411.4285;

// const HomePro = ({route, navigation}) => {
//   const {username, mobile} = route.params;
//   const displayname = username ? username : mobile;

//   const [modalVisible, setModalVisible] = useState(false);

//   const handleProfilePress = () => {
//     setModalVisible(true);
//   };

//   const handleViewProfile = () => {
//     // Handle view profile action
//     // navigation.navigate('Profile');
//   };

//   const handleChangePassword = () => {
//     // Handle change password action
//     // navigation.navigate('ChangePassword');
//   };

//   const handleLogout = () => {
//     // Handle logout action
//     // navigation.navigate('Logout');
//   };

//   useEffect(() => {
//     const backAction = () => {
//       Alert.alert('Hold on!', 'Are you sure you want to go back?', [
//         {
//           text: 'Cancel',
//           onPress: () => null,
//           style: 'cancel',
//         },
//         {text: 'YES', onPress: () => BackHandler.exitApp()},
//       ]);
//       return true;
//     };

//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       backAction,
//     );

//     return () => backHandler.remove();
//   }, []);

//   return (
//     <View style={styles.mainContainer}>
//       <View style={styles.mainheader}>
//         <View style={styles.heading}>
//           <Text style={styles.greeting}>Good Morning</Text>
//           <Text style={styles.username}>{displayname}</Text>
//         </View>
//         <View>
//           <TouchableOpacity onPress={handleProfilePress}>
//             <Image
//               style={styles.ImageSize}
//               source={require('../Images/prof_img.jpg')}
//             />
//           </TouchableOpacity>

//           <Modal
//             animationType="none"
//             transparent={true}
//             visible={modalVisible}
//             onRequestClose={() => {
//               setModalVisible(!modalVisible);
//             }}>
//             <TouchableWithoutFeedback
//               onPress={() => setModalVisible(!modalVisible)}>
//               <View style={styles.centeredView}>
//                 <View style={styles.modalView}>
//                   <TouchableOpacity
//                     onPress={handleViewProfile}
//                     style={styles.modalOption}>
//                     <Text style={styles.modalText}>View Profile</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={handleChangePassword}
//                     style={styles.modalOption}>
//                     <Text style={styles.modalText}>Change Password</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={handleLogout}
//                     style={styles.modalOption}>
//                     <Text style={styles.modalText}>Logout</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </TouchableWithoutFeedback>
//           </Modal>
//         </View>
//       </View>

//       <View style={styles.container}>
//         <TouchableOpacity onPress={() => navigation.navigate()}>
//           <View style={styles.box}>
//             <View style={styles.image}>
//               <Image
//                 source={require('../Images/myprodcuts.png')}
//                 style={styles.img}
//               />
//               <View style={styles.iconName}>
//                 <Text style={styles.iconNameSize}>My products</Text>
//               </View>
//             </View>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate()}>
//           <View style={styles.box}>
//             <View style={styles.image}>
//               <Image
//                 source={require('../Images/myplans.png')}
//                 style={styles.img}
//               />
//               <View style={styles.iconName}>
//                 <Text style={styles.iconNameSize}>My service Plans</Text>
//               </View>
//             </View>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate()}>
//           <View style={styles.box}>
//             <View style={styles.image}>
//               <Image
//                 source={require('../Images/installation.png')}
//                 style={styles.img}
//               />
//               <View style={styles.iconName}>
//                 <Text style={styles.iconNameSize}>Installation Request</Text>
//               </View>
//             </View>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate()}>
//           <View style={styles.box}>
//             <View style={styles.image}>
//               <Image
//                 source={require('../Images/servicerequest.png')}
//                 style={styles.img}
//               />
//               <View style={styles.iconName}>
//                 <Text style={styles.iconNameSize}>Service Request</Text>
//               </View>
//             </View>
//           </View>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.secondContainer}>
//         <TouchableOpacity>
//           <View style={styles.boxshape}>
//             <View style={styles.images}>
//               <Image
//                 source={require('../Images/policy_new.jpg')}
//                 style={styles.icons}
//               />
//               <View style={styles.iconNames}>
//                 <Text style={styles.iconNamesSize}>Policy</Text>
//               </View>
//             </View>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity>
//           <View style={styles.boxshape}>
//             <View style={styles.images}>
//               <Image
//                 source={require('../Images/warranty_new.jpg')}
//                 style={styles.icons}
//               />
//               <View style={styles.iconNames}>
//                 <Text style={styles.iconNamesSize}>Warranty</Text>
//               </View>
//             </View>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity>
//           <View style={styles.boxshape}>
//             <View style={styles.images}>
//               <Image
//                 source={require('../Images/location.jpg')}
//                 style={styles.icons}
//               />
//               <View style={styles.iconNames}>
//                 <Text style={styles.iconNamesSize}>Service Nearby</Text>
//               </View>
//             </View>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity>
//           <View style={styles.boxshape}>
//             <View style={styles.images}>
//               <Image
//                 source={require('../Images/feed_back.jpg')}
//                 style={styles.icons}
//               />
//               <View style={styles.iconNames}>
//                 <Text style={styles.iconNamesSize}>FeedBack</Text>
//               </View>
//             </View>
//           </View>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.lastcontainer}>
//         <TouchableOpacity>
//           <View style={styles.flatbox}>
//             {/* <View style={styles.whtsapp}> */}
//               <Image
//                 source={require('../Images/whatsapp.jpg')}
//                 style={styles.whatsppsize}
//               />
//               <Text style={styles.textSize}>Live Chat</Text>
//             {/* </View> */}
//           </View>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

//// const styles = StyleSheet.create({
//   mainContainer: {
//     height: '100%',
//   },
//   mainheader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginRight: 5,
//     marginTop: 5,
//   },
//   heading: {
//     color: 'red',
//   },
//   ImageSize: {
//     height: 40,
//     width: 40,
//     borderRadius: 50,
//   },
//   greeting: {
//     marginLeft: 5,
//   },
//   username: {
//     marginLeft: 5,
//   },
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 150,
//   },
//   box: {
//     height: 180,
//     width: 180,
//     backgroundColor: 'gray',
//     margin: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius:20
//   },
//   img: {
//     width: 140,
//     height: 140,
//     borderRadius: 100,
//     borderColor: 'white',
//     borderWidth: 2,
//   },
//   buttonsize:{
//     width:70,
//     height:20,
//     backgroundColor:'white',
//     marginTop:10,
//     marginLeft:25,
//     borderRadius:30,
//     backgroundColor:'green'
//   },
//   buttonclick:{
//    fontWeight:'bold',
//    color:'white'
//   },
//   iconName:{
//     backgroundColor:'white',
//     justifyContent:'center',
//     alignItems:'center',
//     marginTop:5,
//     borderRadius:10
//   },
//   iconNameSize:{
//     fontWeight:'bold'
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'flex-end'
//   },
//   modalView: {
//     backgroundColor: 'white',
//     padding: 20,
//     alignItems: 'flex-end',
//     elevation: 5,
//     marginRight: 5,
//     marginBottom: 20,
//   },
//   modalOption: {
//     paddingVertical: 10,
//     width: '80%',
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   modalText: {
//     fontSize: 16,
//   },
// });

// const styles = StyleSheet.create({
//   mainContainer: {
//     height: '100%',
//   },
//   mainheader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginRight: 5 * scale,
//     marginTop: 5 * scale,
//     backgroundColor: '#dcdcdc',
//   },
//   heading: {
//     color: 'red',
//   },
//   ImageSize: {
//     height: 40 * scale,
//     width: 40 * scale,
//     borderRadius: 50 * scale,
//   },
//   greeting: {
//     marginLeft: 5 * scale,
//     fontWeight: 'bold',
//   },
//   username: {
//     marginLeft: 5 * scale,
//     fontWeight: 'bold',
//   },
//   container: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 10 * scale,
//     backgroundColor: '#f0f8ff',
//   },
//   box: {
//     height: 150 * scale,
//     width: 150 * scale,
//     backgroundColor: '#dcdcdc',
//     marginLeft: 40 * scale,
//     //marginRight: 25 * scale,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 20 * scale,
//     marginBottom: 10 * scale,
//   },
//   img: {
//     width: 120 * scale,
//     height: 120 * scale,
//     borderRadius: 100 * scale,
//     borderColor: 'white',
//     borderWidth: 2 * scale,
//   },
//   buttonsize: {
//     width: 70 * scale,
//     height: 20 * scale,
//     backgroundColor: 'white',
//     marginTop: 10 * scale,
//     marginLeft: 25 * scale,
//     borderRadius: 30 * scale,
//     backgroundColor: 'green',
//   },
//   buttonclick: {
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   iconName: {
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 5 * scale,
//     borderRadius: 10 * scale,
//   },
//   iconNameSize: {
//     fontWeight: 'bold',
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'flex-end',
//   },
//   modalView: {
//     backgroundColor: 'white',
//     padding: 20 * scale,
//     alignItems: 'flex-end',
//     elevation: 5,
//     marginRight: 5 * scale,
//     marginBottom: 20 * scale,
//   },
//   modalOption: {
//     paddingVertical: 10 * scale,
//     width: '80%',
//     borderBottomWidth: 1 * scale,
//     borderColor: '#ccc',
//   },
//   modalText: {
//     fontSize: 16 * scale,
//   },
//   secondContainer: {
//     backgroundColor: '#f5f5dc',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginLeft: 40,
//     marginTop: 40,
//   },
//   boxshape: {
//     height: 140,
//     width: 140,
//     backgroundColor: '#dcdcdc',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 20,
//     marginLeft: 20,
//     marginBottom: 20,
//   },
//   images: {
//     borderRadius: 10,
//   },
//   icons: {
//     height: 120,
//     width: 120,
//     borderRadius: 100,
//     borderWidth: 2,
//     borderColor: 'white',
//   },
//   iconNames: {
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 5 * scale,
//     borderRadius: 10 * scale,
//   },
//   iconNamesSize: {
//     fontWeight: 'bold',
//   },
//   lastcontainer: {
//      flex: 1,
//      margin:20
//   },
//   flatbox:{
//   // flex:1,
//   backgroundColor:'green',
//   justifyContent:'center',
//   alignItems:'center',
//   borderRadius:10
//   },
//   whatsppsize:{
//     width:30,
//     height:30,
//     marginLeft:10
//   },
//   textSize:{
//     fontWeight:'bold'
//   }
// });

// export default HomePro;


//-----------------------------------------------------------------------------------------
//main dashboard

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   BackHandler,
//   Alert,
//   Modal,
//   TouchableWithoutFeedback,
//   Dimensions,
// } from 'react-native';
// import Swiper from 'react-native-swiper';

// const {width, height} = Dimensions.get('window');
// const scale = width / 411.4285;
// const scale1 = height / 826;

// const HomePro = ({route, navigation}) => {
//   const {username, mobile,token,password,userData} = route.params;
//   const displayname = username ? username : mobile;

//   const [modalVisible, setModalVisible] = useState(false);
//   const [count,setCount] = useState();

//   const handleProfilePress = () => {
//     setModalVisible(true);
//   };

//   // const handleViewProfile = () => {
//   //   // Handle view profile action
//   //   navigation.navigate('ViewProfile',{userData});
//   // };

//   const handleViewProfile = async () =>{
//     try{
//       const response = await fetch('http://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISGetNotify/',
//       {
//         method:'POST',
//         headers:{
//           'Content-type':'application/json'
//         },
//         body:JSON.stringify({
//          username:username,
//          token:token
//         }),
//       },
//       )
//       console.log('Response Status',response.status);
//       const result = await response.json();
//       console.log('Response Content:', result);

//       if(result.retstatus.success==1){
//         // Alert.alert(result.retstatus.message);
//         // setTimeout(() => {
//           navigation.navigate('ViewProfile',{profile:result});
//         // }, 2000);
//       }else if(result.retstatus.success==0){
//         Alert.alert(result.retstatus.message);
//       }
//     }catch(error){
//       console.error('Error:', error);
//       Alert.alert('An error occurred. Please try again later.');
//     }
//   }

//   const handleChangePassword = () => {
//     // Handle change password action
//     // navigation.navigate('ChangePassword');
//     navigation.navigate('ChangePassword',{token:token,username:username,password:password});
//   };

//   const handleLogout = () => {
//     // Handle logout action
//     // navigation.navigate('Logout');
//     navigation.navigate('Login');
//   };

//   useEffect(() => {
//     const backAction = () => {
//       Alert.alert('Hold on!', 'Are you sure you want to go back?', [
//         {
//           text: 'Cancel',
//           onPress: () => null,
//           style: 'cancel',
//         },
//         {text: 'YES', onPress: () => BackHandler.exitApp()},
//       ]);
//       return true;
//     };

//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       backAction,
//     );

//     return () => backHandler.remove();
//   }, []);


//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(
//         'http://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISDashboard/',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             username: displayname,
//             token: token
//           }),
//         },
//       );

//       const result = await response.json();
//       console.log(result);

//       if (result.success == 1) {
//         // OTP sent successfully
//         setCount(result);
//         // Navigate to the OTP screen or perform other actions
//         // Alert.alert(result.message);
//         // navigation.navigate('OTPEmail', { email: email ,usercode:usercode});
//       } else {
//         // Handle error cases, e.g., display an error message
//         console.error('Error sending OTP:', result.error);
//         // You may also want to show an alert or other UI feedback
//         Alert.alert('Error', 'Failed to send OTP. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       // Handle network errors or other exceptions
//       // You may also want to show an alert or other UI feedback
//       Alert.alert(
//         'Error',
//         'An unexpected error occurred. Please try again later.',
//       );
//     } 
//   };


//   return (
//     <View style={styles.mainContainer}>
//       <View style={styles.mainheader}>
//         <View style={styles.heading}>
//           <Text style={styles.greeting}>Good Morning</Text>
//           <Text style={styles.username}>{username}</Text>
//         </View>
//         <View>
//           <TouchableOpacity onPress={handleProfilePress}>
//             <Image
//               style={styles.ImageSize}
//               source={require('../Images/profile_icon.jpg')}
//             />
//           </TouchableOpacity>

//           <Modal
//             animationType="none"
//             transparent={true}
//             visible={modalVisible}
//             onRequestClose={() => {
//               setModalVisible(!modalVisible);
//             }}>
//             <TouchableWithoutFeedback
//               onPress={() => setModalVisible(!modalVisible)}>
//               <View style={styles.centeredView}>
//                 <View style={styles.modalView}>
//                   <TouchableOpacity
//                     onPress={handleViewProfile}
//                     style={styles.modalOption}>
//                     <Text style={styles.modalText}>View Profile</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={handleChangePassword}
//                     style={styles.modalOption}>
//                     <Text style={styles.modalText}>Change Password</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={handleLogout}
//                     style={styles.modalOption}>
//                     <Text style={styles.modalText}>Logout</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </TouchableWithoutFeedback>
//           </Modal>
//         </View>
//       </View>

//       <View style={styles.sliderContainer}>
//         <Swiper style={styles.wrapper} autoplay={true}>
//           <View style={styles.slideSize}>
//             <Image
//               source={require('../Images/slider-1-cover.jpg')}
//               style={styles.slider}
//             />
//           </View>
//           <View style={styles.slideSize}>
//             <Image
//               source={require('../Images/slider-2-cover.jpg')}
//               style={styles.slider}
//             />
//           </View>
//           <View style={styles.slideSize}>
//             <Image
//               source={require('../Images/slider-8-cover.jpg')}
//               style={styles.slider}
//             />
//           </View>
//           <View style={styles.slideSize}>
//             <Image
//               source={require('../Images/slider-11-cover.jpg')}
//               style={styles.slider}
//             />
//           </View>
//         </Swiper>
//       </View>

//       <View style={styles.container}>
//         <TouchableOpacity onPress={() => navigation.navigate('Myproduct',{token:token,username:username})}>
//           <View style={styles.box}>
//           <View style={styles.counticon}><Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{count && count.MyProductCnt}</Text></View>
//             <Image source={require('../Images/cctv1.jpg')} style={styles.img} />
//             <View style={styles.iconName}>
//               <Text style={styles.iconNameSize}>Products</Text>
//             </View>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate()}>
//           <View style={styles.box}>
//           <View style={styles.counticon}><Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{count && count.MyUnderVerifiyCnt}</Text></View>
//             <Image
//               source={require('../Images/installation1.jpg')}
//               style={styles.img}
//             />
//             <View style={styles.iconName}>
//               <Text style={styles.iconNameSize}>Under Approval</Text>
//             </View>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate()}>
//           <View style={styles.box}>
//           <View style={styles.counticon}><Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{count && count.MyServiceReqCnt}</Text></View>
//             <Image
//               source={require('../Images/service1.jpg')}
//               style={[styles.img]}
//             />
//             <View style={styles.iconName}>
//               <Text style={styles.iconNameSize}>Service Request</Text>
//             </View>
//           </View>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.reportConatiner}>
//         <View style={styles.report}>
//           <View style={styles.text}>
//             <Text style={styles.textsize}>Reports</Text>
//             <Text style={styles.secondtextSize}>Check all your requests</Text>
//             <TouchableOpacity style={styles.button}>
//                <View style={styles.buttonbackground}>
//                <Text style={styles.size}>Click Here</Text>
//                </View>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.icon}>
//             <Image
//               source={require('../Images/report.jpg')}
//               style={styles.reportSize}
//             />
//           </View>
//         </View>
//       </View>

//       <View style={styles.secondContainer}>
//         <TouchableOpacity>
//           <View style={styles.boxshape}>
//               <Image
//                 source={require('../Images/policy1.jpg')}
//                 style={styles.icons}
//               />
//               <View style={styles.iconNames}>
//                 <Text style={styles.iconNamesSize}>Policy</Text>
//               </View>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={()=>navigation.navigate('Warranty',{username:username,token:token})}>
//           <View style={styles.boxshape}>
//               <Image
//                 source={require('../Images/warranty1.jpg')}
//                 style={styles.icons}
//               />
//               <View style={styles.iconNames}>
//                 <Text style={styles.iconNamesSize}>Warranty</Text>
//               </View>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={()=>navigation.navigate('ServiceNearby',{userData:userData})}>
//           <View style={styles.boxshape}>
//               <Image
//                 source={require('../Images/location1.jpg')}
//                 style={styles.icons}
//               />
//               <View style={styles.iconNames}>
//                 <Text style={styles.iconNamesSize}>Service Nearby</Text>
//               </View>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={()=>navigation.navigate('Feedback',{userData:userData})}>
//           <View style={styles.boxshape}>
//               <Image
//                 source={require('../Images/feedback1.jpg')}
//                 style={styles.icons}
//               />
//               <View style={styles.iconNames}>
//                 <Text style={styles.iconNamesSize}>FeedBack</Text>
//               </View>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity>
//           <View style={styles.boxshape}>
//           <View style={styles.counticon}><Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{count && count.MyPlansCnt}</Text></View>
//               <Image
//                 source={require('../Images/serviceplan1.jpg')}
//                 style={styles.icons}
//               />
//               <View style={styles.iconNames}>
//                 <Text style={styles.iconNamesSize}>Service Plans</Text>
//               </View>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity>
//           <View style={styles.boxshape}>
//               <Image
//                 source={require('../Images/whatsapp.jpg')}
//                 style={styles.icons}
//               />
//               <View style={styles.iconNames}>
//                 <Text style={styles.iconNamesSize}>Live Chat</Text>
//               </View>
//           </View>
//         </TouchableOpacity>


//       </View>

//     </View>
//   );
// };

// // const styles = StyleSheet.create({
// //   mainContainer: {
// //     height: '100%',
// //   },
// //   mainheader: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginRight: 6*scale,
// //     marginTop: 6*scale1,
// //     backgroundColor: '#dcdcdc',
// //   },
// //   sliderContainer: {
// //     flexDirection: 'row',
// //     marginTop: 6*scale1,
// //   },
// //   wrapper: {
// //     height: 220*scale1,
// //   },
// //   slideSize: {
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   slider: {
// //     width: '100%',
// //     height: '100%',
// //     resizeMode: 'cover',
// //   },
// //   heading: {
// //     color: 'red',
// //   },
// //   ImageSize: {
// //     height: 40*scale1,
// //     width: 40*scale,
// //     borderRadius: 50*scale,
// //   },
// //   greeting: {
// //     marginLeft: 5*scale,
// //     fontWeight: 'bold',
// //   },
// //   username: {
// //     marginLeft: 8*scale,
// //     fontWeight: 'bold',
// //   },
// //   container: {
// //     flexDirection: 'row',
// //     flexWrap: 'wrap',
// //     marginTop: 22*scale1,
// //     backgroundColor: '#f0f8ff',
// //   },
// //   box: {
// //     height: 100*scale1,
// //     width: 120*scale,
// //     backgroundColor: '#dcdcdc',
// //     marginLeft: 13*scale,
// //     //marginRight: 25 * scale,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     borderRadius: 20*scale,
// //     marginBottom: 10*scale1,
// //   },
// //   img: {
// //     width: 70*scale,
// //     height: 70*scale1,
// //     borderRadius: 100*scale,
// //     borderColor: 'white',
// //     borderWidth: 2*scale,
// //   },
// //   buttonsize: {
// //     width: 70*scale,
// //     height: 20*scale1,
// //     backgroundColor: 'white',
// //     marginTop: 13*scale1,
// //     marginLeft: 25*scale,
// //     borderRadius: 30*scale,
// //     backgroundColor: 'green',
// //   },
// //   buttonclick: {
// //     fontWeight: 'bold',
// //     color: 'white',
// //   },
// //   iconName: {
// //     backgroundColor: 'white',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginTop: 5*scale1,
// //     borderRadius: 10*scale,
// //   },
// //   iconNameSize: {
// //     fontWeight: 'bold',
// //   },
// //   centeredView: {
// //     flex: 1,
// //     justifyContent: 'flex-start',
// //     alignItems: 'flex-end',
// //   },
// //   modalView: {
// //     backgroundColor: 'white',
// //     padding: 20*scale,
// //     alignItems: 'flex-end',
// //     elevation: 5,
// //     marginRight: 5*scale,
// //     marginBottom: 20*scale1,
// //   },
// //   modalOption: {
// //     paddingVertical: 10*scale1,
// //     width: '80%',
// //     borderBottomWidth: 1,
// //     borderColor: '#ccc',
// //   },
// //   modalText: {
// //     fontSize: 16*scale,
// //   },
// //   reportConatiner: {
// //     width: '100%',
// //     flexDirection: 'row',
// //     backgroundColor:'#f5deb3',
// //     marginTop:17*scale1
// //   },
// //   report: {
// //     height: 130*scale1,
// //     width: 130*scale,
// //     justifyContent:'space-between',
// //     flexDirection:'row'
// //   },
// //   text:{
// //     marginTop:25*scale1,
// //    marginLeft:10*scale
// //   },
// //   icon:{
// //     marginLeft:170*scale,
// //     marginTop:20*scale1,
// //   },
// //   textsize: {
// //     fontWeight: 'bold',
// //     fontSize:20*scale
// //   },
// //   secondtextSize: {
// //     fontSize: 10*scale,
// //     marginTop:5*scale1
// //   },
// //   button:{
// //   marginTop:17*scale1,
// //   width:80*scale
// //   },
// //   buttonbackground:{
// //     backgroundColor:'red',
// //     borderRadius:20*scale,
// //     justifyContent:'center',
// //     alignItems:'center',
// //     padding:4*scale
// //   },
// //   size:{
// //   color:'white'
// //   },
// //   reportSize: {
// //     width: 100*scale,
// //     height: 100*scale1,
// //     backgroundColor:'#778899',
// //     borderRadius:10*scale
// //   },
// //   secondContainer: {
// //     backgroundColor: '#f5f5dc',
// //     flexDirection: 'row',
// //     flexWrap: 'wrap',
// //     marginTop:25*scale1,
// //     marginLeft:5*scale
// //   },
// //   boxshape: {
// //     height: 105*scale1,
// //     width: 120*scale,
// //     backgroundColor: '#dcdcdc',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     borderRadius: 20*scale,
// //     marginLeft: 10*scale,
// //     marginBottom: 20*scale1,
// //   },
// //   images: {
// //     borderRadius: 10*scale,
// //   },
// //   icons: {
// //     height: 75*scale1,
// //     width: 75*scale,
// //     borderRadius: 100*scale,
// //     // borderWidth: 2 * scale,
// //     borderColor: 'white',
// //   },
// //   iconNames: {
// //     backgroundColor: 'white',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginTop: 5*scale1,
// //     borderRadius: 10*scale,
// //   },
// //   iconNamesSize: {
// //     fontWeight: 'bold',
// //     fontSize:12*scale
// //   }
// // });


// const styles = StyleSheet.create({
//   mainContainer: {
//     height: '100%',
//   },
//   mainheader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginRight: 6*scale,
//     marginTop: 6*scale1,
//     backgroundColor: '#dcdcdc',
//   },
//   sliderContainer: {
//     flexDirection: 'row',
//     marginTop: 6*scale1,
//   },
//   wrapper: {
//     height: 214*scale1,
//   },
//   slideSize: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     resizeMode:'cover'
//   },
//   slider: {
//     width: '100%',
//     height: '100%'
//   },
//   heading: {
//     color: 'red',
//   },
//   ImageSize: {
//     height: 40*scale1,
//     width: 40*scale,
//     borderRadius: 50*scale,
//   },
//   greeting: {
//     marginLeft: 5*scale,
//     fontWeight: 'bold',
//     color:'#7d7d7d'
//   },
//   username: {
//     marginLeft: 8*scale,
//     fontWeight: 'bold',
//     color:'#7d7d7d'
//   },
//   container: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 22*scale1,
//     backgroundColor: '#f0f8ff',
//   },
//   box: {
//     // position: 'relative',
//     height: 100*scale1,
//     width: 120*scale,
//     backgroundColor: '#dcdcdc',
//     marginLeft: 13*scale,
//     //marginRight: 25 * scale,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 20*scale,
//     marginBottom: 12*scale1
//   },
//   img: {
//     width: 50*scale,
//     height: 50*scale1,
//     borderRadius: 100*scale,
//     borderColor: 'white',
//     borderWidth: 2*scale,
//   },
//   buttonsize: {
//     width: 70*scale,
//     height: 20*scale1,
//     backgroundColor: 'white',
//     marginTop: 13*scale1,
//     marginLeft: 25*scale,
//     borderRadius: 30*scale,
//     backgroundColor: 'green',
//   },
//   buttonclick: {
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   iconName: {
//     // backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 5*scale1,
//     borderRadius: 10*scale,
//   },
//   iconNameSize: {
//     fontWeight: 'bold',
//     color:'#7d7d7d'
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'flex-end',
//   },
//   modalView: {
//     backgroundColor: 'white',
//     padding: 20*scale,
//     alignItems: 'flex-end',
//     elevation: 5,
//     marginRight: 5*scale,
//     marginBottom: 20*scale1,
//   },
//   modalOption: {
//     paddingVertical: 10*scale1,
//     width: '80%',
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   modalText: {
//     fontSize: 16*scale,
//     color:'#7d7d7d'
//   },
//   reportConatiner: {
//     width: '100%',
//     flexDirection: 'row',
//     backgroundColor:'#f5deb3',
//     marginTop:17*scale1
//   },
//   report: {
//     height: 130*scale1,
//     width: 130*scale,
//     justifyContent:'space-between',
//     flexDirection:'row'
//   },
//   text:{
//     marginTop:25*scale1,
//    marginLeft:10*scale
//   },
//   icon:{
//     marginLeft:170*scale,
//     marginTop:20*scale1,
//   },
//   textsize: {
//     fontWeight: 'bold',
//     fontSize:20*scale,
//     color:'#7d7d7d'
//   },
//   secondtextSize: {
//     fontSize: 10*scale1,
//     marginTop:5*scale1,
//     color:'#7d7d7d'
//   },
//   button:{
//   marginTop:17*scale1,
//   width:80*scale
//   },
//   buttonbackground:{
//     backgroundColor:'red',
//     borderRadius:20*scale,
//     justifyContent:'center',
//     alignItems:'center',
//     padding:4*scale
//   },
//   size:{
//   color:'white'
//   },
//   reportSize: {
//     width: 100*scale,
//     height: 100*scale1,
//     backgroundColor:'#778899',
//     borderRadius:10*scale
//   },
//   secondContainer: {
//     backgroundColor: '#f5f5dc',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop:25*scale1,
//     marginLeft:5*scale
//   },
//   boxshape: {
//     height: 105*scale1,
//     width: 120*scale,
//     backgroundColor: '#dcdcdc',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 20*scale,
//     marginLeft: 10*scale,
//     marginBottom: 20*scale1,
//   },
//   images: {
//     borderRadius: 10*scale,
//   },
//   icons: {
//     height: 50*scale1,
//     width: 50*scale,
//     borderRadius: 100*scale,
//     // borderWidth: 2 * scale,
//     borderColor: 'white',
//   },
//   iconNames: {
//     // backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 5*scale1,
//     borderRadius: 10*scale,
//   },
//   iconNamesSize: {
//     fontWeight: 'bold',
//     fontSize:12*scale1,
//     color:'#7d7d7d'
//   },
//   counticon:{
//     backgroundColor:'#ffa500',
//     height:35*scale1,
//     width:35*scale,
//     borderRadius:50*scale,
//     position: 'absolute',
//     top: -10*scale1,
//     right: -10*scale, 
//     justifyContent: 'center',
//     alignItems: 'center',
//   }
// });


// export default HomePro;


//----------------------------------------------

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  SafeAreaView,
  ScrollView
} from 'react-native';
import Swiper from 'react-native-swiper';

const {width, height} = Dimensions.get('window');
const scale = width / 411.4285;
const scale1 = height / 826;

const HomePro = ({route, navigation}) => {
  const {username, mobile,token,password,userData} = route.params;
  const displayname = username ? username : mobile;

  const [modalVisible, setModalVisible] = useState(false);
  const [count,setCount] = useState();

  const handleProfilePress = () => {
    setModalVisible(true);
  };

  // const handleViewProfile = () => {
  //   // Handle view profile action
  //   navigation.navigate('ViewProfile',{userData});
  // };

  const handleViewProfile = async () =>{
    try{
      const response = await fetch('https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISGetNotify/',
      {
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify({
         username:username,
         token:token
        }),
      },
      )
      console.log('Response Status',response.status);
      const result = await response.json();
      console.log('Response Content:', result);

      if(result.retstatus.success==1){
        // Alert.alert(result.retstatus.message);
        // setTimeout(() => {
          navigation.navigate('ViewProfile',{profile:result});
        // }, 2000);
      }else if(result.retstatus.success==0){
        Alert.alert(result.retstatus.message);
      }
    }catch(error){
      // console.error('Error:', error);
      Alert.alert('An error occurred. Please try again later.');
    }
  }

  const handleChangePassword = () => {
    // Handle change password action
    // navigation.navigate('ChangePassword');
    navigation.navigate('ChangePassword',{token:token,username:username,password:password});
  };

  const handleLogout = () => {
    // Handle logout action
    // navigation.navigate('Logout');
    navigation.navigate('Login');
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISDashboard/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: displayname,
            token: token
          }),
        },
      );

      const result = await response.json();
      console.log(result);

      if (result.success == 1) {
        // OTP sent successfully
        setCount(result);
        // Navigate to the OTP screen or perform other actions
        // Alert.alert(result.message);
        // navigation.navigate('OTPEmail', { email: email ,usercode:usercode});
      } else {
        // Handle error cases, e.g., display an error message
        // console.error('Error sending OTP:', result.error);
        // You may also want to show an alert or other UI feedback
        Alert.alert('Error', 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      // console.error('Error:', error);
      // Handle network errors or other exceptions
      // You may also want to show an alert or other UI feedback
      Alert.alert(
        'An unexpected error occurred. Please try again later.',
      );
    } 
  };


  return (
    <SafeAreaView style={styles.safeArea}>
       <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <View style={styles.mainContainer}>
      <View style={styles.mainheader}>
        <View style={styles.heading}>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.username}>{username}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={handleProfilePress}>
            <Image
              style={styles.ImageSize}
              source={require('../Images/profile_icon.jpg')}
            />
          </TouchableOpacity>

          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <TouchableWithoutFeedback
              onPress={() => setModalVisible(!modalVisible)}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TouchableOpacity
                    onPress={handleViewProfile}
                    style={styles.modalOption}>
                    <Text style={styles.modalText}>View Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleChangePassword}
                    style={styles.modalOption}>
                    <Text style={styles.modalText}>Change Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleLogout}
                    style={styles.modalOption}>
                    <Text style={styles.modalText}>Logout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </View>

      <View style={styles.sliderContainer}>
        <Swiper style={styles.wrapper} autoplay={true}>
          <View style={styles.slideSize}>
            <Image
              source={require('../Images/slider-1-cover.jpg')}
              style={styles.slider}
            />
          </View>
          <View style={styles.slideSize}>
            <Image
              source={require('../Images/slider-2-cover.jpg')}
              style={styles.slider}
            />
          </View>
          <View style={styles.slideSize}>
            <Image
              source={require('../Images/slider-8-cover.jpg')}
              style={styles.slider}
            />
          </View>
          <View style={styles.slideSize}>
            <Image
              source={require('../Images/slider-11-cover.jpg')}
              style={styles.slider}
            />
          </View>
        </Swiper>
      </View>

      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Myproduct',{token:token,username:username})}>
          <View style={styles.box}>
          <View style={styles.counticon}><Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{count && count.MyProductCnt}</Text></View>
            <Image source={require('../Images/cctv1.jpg')} style={styles.img} />
            <View style={styles.iconName}>
              <Text style={styles.iconNameSize}>Products</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate()}>
          <View style={styles.box}>
          <View style={styles.counticon}><Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{count && count.MyUnderVerifiyCnt}</Text></View>
            <Image
              source={require('../Images/installation1.jpg')}
              style={styles.img}
            />
            <View style={styles.iconName}>
              <Text style={styles.iconNameSize}>Under Approval</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate()}>
          <View style={styles.box}>
          <View style={styles.counticon}><Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{count && count.MyServiceReqCnt}</Text></View>
            <Image
              source={require('../Images/service1.jpg')}
              style={[styles.img]}
            />
            <View style={styles.iconName}>
              <Text style={styles.iconNameSize}>Service Request</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ViewInstallationRequest',{username:username,token:token,userData:userData})}>
          <View style={styles.box}>
            <Image
              source={require('../Images/installation_request.png')}
              style={[styles.img]}
            />
            <View style={styles.iconName}>
              <Text style={styles.iconNameSize}>Installation</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ViewOnsiteService',{username:username,token:token,userData:userData})}>
          <View style={styles.box}>
            <Image
              source={require('../Images/onsite_service.png')}
              style={[styles.img]}
            />
            <View style={styles.iconName}>
              <Text style={styles.iconNameSize}>Onsite Service</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('CarryInService',{username:username,token:token,userData:userData})}>
          <View style={styles.box}>
            <Image
              source={require('../Images/carry_in_service.png')}
              style={[styles.img]}
            />
            <View style={styles.iconName}>
              <Text style={styles.iconNameSize}>Carry in Service</Text>
            </View>
          </View>
        </TouchableOpacity>

      </View>

      <View style={styles.reportConatiner}>
        <View style={styles.report}>
          <View style={styles.text}>
            <Text style={styles.textsize}>Reports</Text>
            <Text style={styles.secondtextSize}>Check all your requests</Text>
            <TouchableOpacity style={styles.button}>
               <View style={styles.buttonbackground}>
               <Text style={styles.size}>Click Here</Text>
               </View>
            </TouchableOpacity>
          </View>
          <View style={styles.icon}>
            <Image
              source={require('../Images/report.jpg')}
              style={styles.reportSize}
            />
          </View>
        </View>
      </View>

      <View style={styles.secondContainer}>
        <TouchableOpacity>
          <View style={styles.boxshape}>
              <Image
                source={require('../Images/policy1.jpg')}
                style={styles.icons}
              />
              <View style={styles.iconNames}>
                <Text style={styles.iconNamesSize}>Policy</Text>
              </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('Warranty',{username:username,token:token})}>
          <View style={styles.boxshape}>
              <Image
                source={require('../Images/warranty1.jpg')}
                style={styles.icons}
              />
              <View style={styles.iconNames}>
                <Text style={styles.iconNamesSize}>Warranty</Text>
              </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('ServiceNearby',{userData:userData})}>
          <View style={styles.boxshape}>
              <Image
                source={require('../Images/location1.jpg')}
                style={styles.icons}
              />
              <View style={styles.iconNames}>
                <Text style={styles.iconNamesSize}>Service Nearby</Text>
              </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('Feedback',{userData:userData})}>
          <View style={styles.boxshape}>
              <Image
                source={require('../Images/feedback1.jpg')}
                style={styles.icons}
              />
              <View style={styles.iconNames}>
                <Text style={styles.iconNamesSize}>FeedBack</Text>
              </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.boxshape}>
          <View style={styles.counticon}><Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{count && count.MyPlansCnt}</Text></View>
              <Image
                source={require('../Images/serviceplan1.jpg')}
                style={styles.icons}
              />
              <View style={styles.iconNames}>
                <Text style={styles.iconNamesSize}>Service Plans</Text>
              </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.boxshape}>
              <Image
                source={require('../Images/whatsapp.jpg')}
                style={styles.icons}
              />
              <View style={styles.iconNames}>
                <Text style={styles.iconNamesSize}>Live Chat</Text>
              </View>
          </View>
        </TouchableOpacity>


      </View>

    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  mainContainer: {
    height: '100%',
  },
  mainheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 6*scale,
    marginTop: 6*scale1,
    backgroundColor: '#dcdcdc',
  },
  sliderContainer: {
    flexDirection: 'row',
    marginTop: 6*scale1,
  },
  wrapper: {
    height: 214*scale1,
  },
  slideSize: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode:'cover'
  },
  slider: {
    width: '100%',
    height: '100%'
  },
  heading: {
    color: 'red',
  },
  ImageSize: {
    height: 40*scale1,
    width: 40*scale,
    borderRadius: 50*scale,
  },
  greeting: {
    marginLeft: 5*scale,
    fontWeight: 'bold',
    color:'#7d7d7d'
  },
  username: {
    marginLeft: 8*scale,
    fontWeight: 'bold',
    color:'#7d7d7d'
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 22*scale1,
    backgroundColor: '#f0f8ff',
  },
  box: {
    // position: 'relative',
    height: 80*scale1,
    width: 100*scale,
    backgroundColor: '#dcdcdc',
    marginLeft: 27*scale,
    //marginRight: 25 * scale,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20*scale,
    marginBottom: 10*scale1
  },
  img: {
    width: 40*scale,
    height: 40*scale1,
    borderRadius: 100*scale,
    borderColor: 'white',
    borderWidth: 2*scale,
  },
  buttonsize: {
    width: 70*scale,
    height: 20*scale1,
    backgroundColor: 'white',
    marginTop: 13*scale1,
    marginLeft: 25*scale,
    borderRadius: 30*scale,
    backgroundColor: 'green',
  },
  buttonclick: {
    fontWeight: 'bold',
    color: 'white',
  },
  iconName: {
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5*scale1,
    borderRadius: 10*scale,
  },
  iconNameSize: {
    fontWeight: 'bold',
    color:'#7d7d7d',
    fontSize:12*scale
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20*scale,
    alignItems: 'flex-end',
    elevation: 5,
    marginRight: 5*scale,
    marginBottom: 20*scale1,
  },
  modalOption: {
    paddingVertical: 10*scale1,
    width: '80%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  modalText: {
    fontSize: 16*scale,
    color:'#7d7d7d'
  },
  reportConatiner: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor:'#f5deb3',
    marginTop:12*scale1
  },
  report: {
    height: 130*scale1,
    width: 130*scale,
    justifyContent:'space-between',
    flexDirection:'row'
  },
  text:{
    marginTop:25*scale1,
   marginLeft:10*scale
  },
  icon:{
    marginLeft:170*scale,
    marginTop:20*scale1,
  },
  textsize: {
    fontWeight: 'bold',
    fontSize:20*scale,
    color:'#7d7d7d'
  },
  secondtextSize: {
    fontSize: 10*scale1,
    marginTop:5*scale1,
    color:'#7d7d7d'
  },
  button:{
  marginTop:17*scale1,
  width:80*scale
  },
  buttonbackground:{
    backgroundColor:'red',
    borderRadius:20*scale,
    justifyContent:'center',
    alignItems:'center',
    padding:4*scale
  },
  size:{
  color:'white'
  },
  reportSize: {
    width: 100*scale,
    height: 100*scale1,
    backgroundColor:'#778899',
    borderRadius:10*scale
  },
  secondContainer: {
    backgroundColor: '#f5f5dc',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop:15*scale1,
    marginLeft:5*scale
  },
  boxshape: {
    height: 85*scale1,
    width: 100*scale,
    backgroundColor: '#dcdcdc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20*scale,
    marginLeft: 25*scale,
    marginBottom: 20*scale1,
  },
  images: {
    borderRadius: 10*scale,
  },
  icons: {
    height: 40*scale1,
    width: 40*scale,
    borderRadius: 100*scale,
    // borderWidth: 2 * scale,
    borderColor: 'white',
  },
  iconNames: {
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5*scale1,
    borderRadius: 10*scale,
  },
  iconNamesSize: {
    fontWeight: 'bold',
    fontSize:12*scale1,
    color:'#7d7d7d'
  },
  counticon:{
    backgroundColor:'#ffa500',
    height:35*scale1,
    width:35*scale,
    borderRadius:50*scale,
    position: 'absolute',
    top: -10*scale1,
    right: -10*scale, 
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default HomePro;

