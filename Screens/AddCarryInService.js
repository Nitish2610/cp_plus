// import React, {useState, useContext, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
//   ActivityIndicator,
//   Alert,
//   Image,
//   FlatList,
// } from 'react-native';
// // import {Picker} from '@react-native-picker/picker';
// // import { AuthContext } from '../Components/AuthContext';
// import * as ImagePicker from 'react-native-image-picker';
// import ImageResizer from 'react-native-image-resizer';
// import {RadioButton} from 'react-native-paper';
// import RNFS from 'react-native-fs';

// const {width, height} = Dimensions.get('window');
// const scale = width / 411.4285;
// const scale1 = height / 826;

// const AddCarryInService = ({navigation,route}) => {
//   const {username,token} = route.params;
//   const [activeSection, setActiveSection] = useState('AddRequest');

//   const [serialNumber, setSerialNumber] = useState('');

//   const [productDescription, setProductDescription] = useState('');
//   const [problem,setProblem] = useState('');
//   const [productName,setProductName] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const [loading, setLoading] = useState(false);

//   const [productImage, setProductImage] = useState(null);
//   const [proofImage, setProofImage] = useState(null);
//   const [itemCode,setItemCode] = useState(false);
//   const [isExist,setIsExist] = useState('yes');
//   // const [modalVisible,setModalVisible] = useState('false');

//   useEffect(()=>{
//     handleFocus();
//   },[]);

//   const handleSelectProduct = (product) => {
//     setProductDescription(product.materialdescription); // Adjust based on the actual structure of your data
//     setShowDropdown(false);
//   };

//   const handleRadioChange = (value) =>{
//     setIsExist(value);
//  }
//   const handleFocus = async () =>{
//     try {
//       const response = await fetch(
//         'http://devservice.adityagroup.com/aditya_service/rma/CPPartner/GetProductList/',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//            username:username,
//            token:token
//           }),
//         },
//       );
//       const result = await response.json();
//       console.log(result);
//       if (result.retstatus.success == 1) {
//         Alert.alert(result.retstatus.message);
//         setProductName(result.Listdate);
//       } else if (result.retstatus.success == 0) {
//         Alert.alert(result.retstatus.message);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       Alert.alert(
//         'Error',
//         'An unexpected error occurred. Please try again later.',
//       );
//     }
//   }
//   const filterproductName = productName.filter(item=>
//     item.materialdescription.toLowerCase().includes(productDescription.toLowerCase()),
//   )

//  const convertFileToBase64 = async (uri) => {
//   try {
//     if (!uri) {
//       throw new Error('URI is undefined');
//     }

//     const resizedImageUri = await ImageResizer.createResizedImage(uri, 800, 600, 'JPEG', 80);
//     const fileContent = await RNFS.readFile(resizedImageUri.uri, 'base64');
//     if (!fileContent) {
//       throw new Error('File content is empty');
//     }

//     const base64DataUri = `data:image/jpeg;base64,${fileContent}`;
//     return base64DataUri;
//   } catch (error) {
//     console.error('Error converting file to base64:', error);
//     return null;
//   }
// };

// const selectImage = fieldName => {
//   const options = {
//     mediaType: 'photo',
//     includeBase64: true,
//     maxHeight: 2000,
//     maxWidth: 2000,
//   };

//   ImagePicker.launchImageLibrary(options, async response => {
//     if (response.didCancel) {
//       console.log('User cancelled image picker');
//     } else if (response.error) {
//       console.log('ImagePicker Error: ', response.error);
//     } else {
//       const uri = response.assets[0].uri;
//       const base64Image=await convertFileToBase64(uri);
//       await checkImageSize(uri, fieldName,base64Image);
//     }
//   });
// };

// const handleCameraLaunch = fieldName => {
//   const options = {
//     mediaType: 'photo',
//     includeBase64: true,
//     maxHeight: 2000,
//     maxWidth: 2000,
//   };

//   ImagePicker.launchCamera(options, async response => {
//     if (response.didCancel) {
//       console.log('User cancelled camera');
//     } else if (response.error) {
//       console.log('Camera Error: ', response.error);
//     } else {
//       const uri = response.assets[0].uri;
//       const base64Image=await convertFileToBase64(uri);
//       await checkImageSize(uri, fieldName,base64Image);
//     }
//   });
// };

// const checkImageSize = async (uri, fieldName,base64Image) => {
//   try {
//     const fileInfo = await RNFS.stat(uri);
//     const fileSizeInMB = fileInfo.size / (1024 * 1024); // Convert bytes to MB
//     if (fileSizeInMB > 2) {
//       Alert.alert('Image size exceeds 2MB. Please select another image.');
//       // Optionally, you can reset the image state here
//       // setProductImage(null);
//     } else {
//       // Set the selected image based on the field name
//       switch (fieldName) {
//         case 'product':
//             setProductImage({uri,base64: base64Image});
//           break;
//         case 'proof':
//           setProofImage({ uri, base64: base64Image });
//           break;
//         default:
//           break;
//       }
//     }
//   } catch (error) {
//     console.log('Error checking image size:', error);
//   }
// };

// // const selectMedia = async (fieldName, mediaType, source) => {
// //   const options = {
// //     mediaType,
// //     includeBase64: true,
// //     maxHeight: 2000,
// //     maxWidth: 2000,
// //   };

// //   const handleResponse = async response => {
// //     if (response.didCancel) {
// //       console.log('User cancelled media picker');
// //     } else if (response.error) {
// //       console.log('MediaPicker Error: ', response.error);
// //     } else {
// //       const uri = response.assets[0].uri;
// //       const base64Media = await convertFileToBase64(uri, mediaType);
// //       await checkMediaSize(uri, fieldName, base64Media, mediaType);
// //     }
// //   };

// //   if (source === 'gallery') {
// //     ImagePicker.launchImageLibrary(options, handleResponse);
// //   } else if (source === 'camera') {
// //     ImagePicker.launchCamera(options, handleResponse);
// //   } else if (source === 'recorder') {
// //     // Implement recording audio functionality here using a suitable library
// //     console.log('Audio recording is not implemented yet');
// //   }
// // };

// // const handleCameraLaunch = fieldName => {
// //   selectMedia(fieldName, 'photo', 'camera');
// // };

// // const convertFileToBase64 = async (uri, mediaType) => {
// //   try {
// //     if (!uri) {
// //       throw new Error('URI is undefined');
// //     }

// //     let resizedUri = uri;
// //     if (mediaType === 'photo') {
// //       const resizedImageUri = await ImageResizer.createResizedImage(uri, 800, 600, 'JPEG', 80);
// //       resizedUri = resizedImageUri.uri;
// //     }

// //     const fileContent = await RNFS.readFile(resizedUri, 'base64');
// //     if (!fileContent) {
// //       throw new Error('File content is empty');
// //     }

// //     let base64DataUri;
// //     switch (mediaType) {
// //       case 'photo':
// //         base64DataUri = `data:image/jpeg;base64,${fileContent}`;
// //         break;
// //       case 'video':
// //         base64DataUri = `data:video/mp4;base64,${fileContent}`;
// //         break;
// //       case 'audio':
// //         base64DataUri = `data:audio/mp3;base64,${fileContent}`;
// //         break;
// //       default:
// //         throw new Error('Unsupported media type');
// //     }

// //     return base64DataUri;
// //   } catch (error) {
// //     console.error('Error converting file to base64:', error);
// //     return null;
// //   }
// // };
// // const checkMediaSize = async (uri, fieldName, base64Media, mediaType) => {
// //   try {
// //     const fileInfo = await RNFS.stat(uri);
// //     const fileSizeInMB = fileInfo.size / (1024 * 1024); // Convert bytes to MB
// //     if (fileSizeInMB > 2) { // Adjust the size limit as needed
// //       Alert.alert('File size exceeds 2MB. Please select another file.');
// //     } else {
// //       // Set the selected media based on the field name
// //       switch (fieldName) {
// //         case 'product':
// //           setProductImage({ uri, base64: base64Media, type: mediaType });
// //           break;
// //         case 'proof':
// //           setProofImage({ uri, base64: base64Media, type: mediaType });
// //           break;
// //         default:
// //           break;
// //       }
// //     }
// //   } catch (error) {
// //     console.log('Error checking media size:', error);
// //   }
// // };

// const handleSubmit = async () => {

//   if (isExist==='yes' && !serialNumber) {
//     Alert.alert('Serial number is required');
//   }
//   if (!productImage) {
//     Alert.alert('Please select a photo');
//   }
//   if (!proofImage) {
//     Alert.alert('Please select proof of image');
//   }
//   else{

//     try{
//       setLoading(true);
//       const response = await fetch('http://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISCarryInProductAdd/',
//       {
//         method:'POST',
//         headers:{
//           'Content-type':'application/json'
//         },
//         body:JSON.stringify({
//           // username:username,
//           // sub_user_id:,
//           // token:token,
//           // serialflag:,
//           // serial:,
//           // itemcode:,
//           // itemdescription:,
//           // fault:,
//           // customer_id:,
//           // warrantycode:,
//           // accessory:,
//           // fileext:,
//           // faultfiledata:,
//           // filename:
//         }),
//       },
//       )
//       console.log('Response Status',response.status);
//       const result = await response.json();
//       console.log('Response Content:', result);

//       if(result.retstatus.success==1){
//         Alert.alert(result.retstatus.message);
//         // setTimeout(() => {
//            navigation.navigate('Myproduct',{username:username,token:token});
//         // }, 2000);
//       }else if(result.retstatus.success==0){
//         Alert.alert(result.retstatus.message);
//       }
//     }catch(error){
//       console.error('Error:', error);
//       Alert.alert('An error occurred. Please try again later.');
//     }finally{
//       setLoading(false);
//     }
// }

// };

// const handlesearch = async () => {
//   try {
//     setLoading(true);
//     const response = await fetch(
//       'http://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISGetSerialData/',
//       {
//         method: 'POST',
//         headers: {
//           'Content-type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: username,
//           token: token,
//           serial: serialNumber,
//         }),
//       },
//     );
//     console.log('Response Status', response.status);
//     const result = await response.json();
//     console.log('Response Content:', result);
//     //  console.log(result.Listdate[0].materialdescription);
//     if (result.retstatus.status == 1) {
//       setProductDescription(result.Listdate[0].materialdescription);
//       setItemCode(result.Listdate[0].materialcode);
//       console.log(result.Listdate[0].materialcode);
//     } else if (result.retstatus.status == 222) {
//       setProductDescription('');
//       Alert.alert(result.retstatus.message);
//     }
//   } catch (error) {
//     console.log('Error fetching data', error);
//   } finally {
//     setLoading(false);
//   }
// };

// const showImageOptions = fieldName => {
//   Alert.alert(
//     'Choose Image Source',
//     'Select the source of the image',
//     [
//       {
//         text: 'Choose from Gallery',
//         onPress: () => selectImage(fieldName),
//       },
//       {
//         text: 'Take Photo',
//         onPress: () => handleCameraLaunch(fieldName),
//       },
//       {
//         text: 'Cancel',
//         style: 'cancel',
//       },
//     ],
//     {cancelable: false},
//   );
// };

// // const showImageOptions = fieldName => {
// //   Alert.alert(
// //     'Choose Media Source',
// //     'Select the source of the media',
// //     [
// //       {
// //         text: 'Choose Image from Gallery',
// //         onPress: () => selectMedia(fieldName, 'photo', 'gallery'),
// //       },
// //       {
// //         text: 'Take Photo',
// //         onPress: () => selectMedia(fieldName, 'photo', 'camera'),
// //       },
// //       {
// //         text: 'Choose Video from Gallery',
// //         onPress: () => selectMedia(fieldName, 'video', 'gallery'),
// //       },
// //       {
// //         text: 'Record Video',
// //         onPress: () => selectMedia(fieldName, 'video', 'camera'),
// //       },
// //       {
// //         text: 'Choose Audio from Gallery',
// //         onPress: () => selectMedia(fieldName, 'audio', 'gallery'),
// //       },
// //       {
// //         text: 'Record Audio',
// //         onPress: () => selectMedia(fieldName, 'audio', 'recorder'),
// //       },
// //       {
// //         text: 'Cancel',
// //         style: 'cancel',
// //       },
// //     ],
// //     { cancelable: false },
// //   );
// // };

//   const handleLoginDetailsSubmit = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         'http://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISGetRegOTPEU/',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             mobile: loginDetails.contact_no,
//             email: loginDetails.email_address,
//             newpwd: loginDetails.password,
//             confirmpwd: loginDetails.re_password,
//           }),
//         },
//       );
//       const result = await response.json();
//       console.log(result);
//       if (result.success == 1) {
//         Alert.alert(result.message);
//         setIsLoginDetailsValid(true);

//         setActiveSection('otp');
//       } else if (result.success == 0) {
//         Alert.alert(result.message);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       Alert.alert(
//         'Error',
//         'An unexpected error occurred. Please try again later.',
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOTPEnter = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         'http://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISValidateRegOTPEU/',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             email: loginDetails.email_address,
//             email_otp: otp.email_otp,
//             mobile: loginDetails.contact_no,
//             mobile_otp: otp.mobile_otp,
//           }),
//         },
//       );
//       const result = await response.json();
//       console.log(result);
//       if (result.success == 1) {
//         Alert.alert(result.message);
//         clearInterval(interval);
//         setIsOtpValid(true);
//         setActiveSection('contact');
//       } else {
//         console.error('Error while doing registration:', result.error);
//         Alert.alert('Error', 'Failed to register. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       Alert.alert(
//         'Error',
//         'An unexpected error occurred. Please try again later.',
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleContactDetailsSubmit = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         'http://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISRegSaveEU/',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             customer_name: contactDetails.customer_name,
//             mobile_no: loginDetails.contact_no,
//             email_id: loginDetails.email_address,
//             pwd: loginDetails.password,
//             contact_person: contactDetails.contact_person,
//             alt_email_id: contactDetails.alternate_email_id,
//             alt_mobile_no: contactDetails.alternate_contact_no,
//             customer_type: contactDetails.customer_type,
//             city: contactDetails.city,
//             cityflag: 0,
//             state: contactDetails.state,
//             pincode: contactDetails.pincode,
//             address1: contactDetails.address_line1,
//             address2: contactDetails.address_line2,
//           }),
//         },
//       );

//       const result = await response.json();
//       console.log(result);

//       if (result.success == 1) {
//         Alert.alert(result.message);
//       } else {
//         console.error('Error sending OTP:', result.error);
//         Alert.alert('Error', 'Failed to send OTP. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       Alert.alert(
//         'Error',
//         'An unexpected error occurred. Please try again later.',
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         'http://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISGetRegOTPEU/',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             mobile: loginDetails.contact_no,
//             email: loginDetails.email_address,
//             newpwd: loginDetails.password,
//             confirmpwd: loginDetails.re_password,
//           }),
//         },
//       );

//       const result = await response.json();
//       console.log(result);

//       if (result.success == 1) {
//         setTimer(60);
//         setResendDisabled(true);
//         // OTP sent successfully
//         // Navigate to the OTP screen or perform other actions
//         Alert.alert(result.message);
//         // navigation.navigate('OTPEmail', { email: email ,usercode:usercode});
//       } else if (result.success == 0) {
//         Alert.alert(result.message);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       // Handle network errors or other exceptions
//       // You may also want to show an alert or other UI feedback
//       Alert.alert(
//         'Error',
//         'An unexpected error occurred. Please try again later.',
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchLocation = async pincode => {
//     try {
//       const response = await fetch(
//         'http://devservice.adityagroup.com/aditya_service/rma/CPPartner/GetCityStatePincode/',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             pincode: contactDetails.pincode,
//           }),
//         },
//       );

//       const result = await response.json();
//       console.log(result);

//       if (result.retstatus.success == 1) {
//         Alert.alert(result.retstatus.message);
//         //  setContactDetails.city(result.Listdate[0].city);
//         //  setContactDetails.state(result.Listdate[0].state);
//         setContactDetails({
//           ...contactDetails,
//           city: result.Listdate[0].city,
//           state: result.Listdate[0].state,
//         });
//       } else {
//         console.error('Error sending OTP:', result.error);
//         Alert.alert('Error', 'Failed to send OTP. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       Alert.alert(
//         'Error',
//         'An unexpected error occurred. Please try again later.',
//       );
//     }
//   };
//   return (
//     <View style={styles.container}>
//       {loading && (
//         <View style={styles.loader}>
//           <ActivityIndicator size="large" color="#0000ff" />
//         </View>
//       )}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={[
//             styles.headerItem,
//             activeSection === 'AddRequest' && styles.activeHeaderItem,
//           ]}
//            onPress={() => setActiveSection('login')}
//         >
//           <Text
//             style={[
//               styles.headerText,
//               activeSection === 'AddRequest' && styles.activeHeaderText,
//             ]}>
//             +Add Request
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.headerItem,
//             activeSection === 'Overview' && styles.activeHeaderItem,
//           ]}
//           onPress={() =>setActiveSection('Overview')}
//         >
//           <Text
//             style={[
//               styles.headerText,
//               activeSection === 'Overview' && styles.activeHeaderText,
//             ]}>
//             Overview
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.headerItem,
//             activeSection === 'RequestStatus' && styles.activeHeaderItem,
//           ]}
//           onPress={() => setActiveSection('RequestStatus')}
//         >
//           <Text
//             style={[
//               styles.headerText,
//               activeSection === 'RequestStatus' && styles.activeHeaderText,
//             ]}>
//             Request Status
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {activeSection === 'AddRequest' && (
//         <ScrollView>
//          <View>

// {/* <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(!modalVisible)}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>Choose Media Source</Text>
//             <TouchableOpacity
//               style={styles.button1}
//               onPress={() => {
//                 setModalVisible(false);
//                 selectMedia('product', 'photo', 'gallery');
//               }}
//             >
//               <Text style={styles.textStyle}>Choose Image from Gallery</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.button1}
//               onPress={() => {
//                 setModalVisible(false);
//                 selectMedia('product', 'photo', 'camera');
//               }}
//             >
//               <Text style={styles.textStyle}>Take Photo</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.button1}
//               onPress={() => {
//                 setModalVisible(false);
//                 selectMedia('product', 'video', 'gallery');
//               }}
//             >
//               <Text style={styles.textStyle}>Choose Video from Gallery</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.button1}
//               onPress={() => {
//                 setModalVisible(false);
//                 selectMedia('product', 'video', 'camera');
//               }}
//             >
//               <Text style={styles.textStyle}>Record Video</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.button1}
//               onPress={() => {
//                 setModalVisible(false);
//                 selectMedia('product', 'audio', 'gallery');
//               }}
//             >
//               <Text style={styles.textStyle}>Choose Audio from Gallery</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.button1}
//               onPress={() => {
//                 setModalVisible(false);
//                 selectMedia('product', 'audio', 'recorder');
//               }}
//             >
//               <Text style={styles.textStyle}>Record Audio</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.button1, styles.buttonClose]}
//               onPress={() => setModalVisible(!modalVisible)}
//             >
//               <Text style={styles.textStyle}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal> */}

//        <View
//                style={{
//                  flexDirection: 'row',
//                  alignItems: 'center'
//                }}>
//                  <Text style={{fontSize:18}}>Is Serial Number Exist:</Text>
//                <RadioButton
//                  value="yes"
//                  status={isExist=== 'yes' ? 'checked' : 'unchecked'}
//                  onPress={() => handleRadioChange('yes')}
//                />
//                <Text onPress={() => handleRadioChange('yes')}>Yes</Text>
//                <RadioButton
//                  value="no"
//                  status={isExist === 'no' ? 'checked' : 'unchecked'}
//                  onPress={() => handleRadioChange('no')}
//                />
//                <Text onPress={() => handleRadioChange('no')}>No</Text>
//              </View>
//             {isExist==='yes' && (
//               <View>
//               <Text style={styles.label}>Serial Number:</Text>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   style={styles.input1}
//                   value={serialNumber}
//                   onChangeText={text => setSerialNumber(text)}
//                 />
//                 <TouchableOpacity onPress={handlesearch} style={styles.searchbutton}>
//                   <Text style={styles.searchbuttontext}>Search</Text>
//                 </TouchableOpacity>
//               </View>
//               </View>
//             )}

//          {isExist==='yes' && (
//           <View>
//           <Text style={styles.label}>Product Name:</Text>
//          <TextInput
//            style={styles.input}
//            value={productDescription}
//            onChangeText={setProductDescription}
//          />
//          </View>
//          )}

//          {isExist==='no' && (
//           <View>
//           <Text style={styles.label}>Product Name:</Text>
//          <TextInput
//            style={styles.input}
//            placeholder="Select Product Name"
//            value={productDescription}
//            onChangeText={setProductDescription}
//            onFocus={() => setShowDropdown(true)}
//          />
//          {showDropdown && (
//             <FlatList
//               style={styles.dropdown}
//               data={filterproductName}
//               keyExtractor={(item) => item.materialcode}
//               renderItem={({ item }) => (
//                 <TouchableOpacity onPress={() => handleSelectProduct(item)}>
//                   <Text style={styles.dropdownItem}>{item.materialdescription}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           )}
//          </View>
//          )}

//          <Text style={styles.label}>Problem:</Text>
//          <TextInput
//            style={styles.input}
//            value={problem}
//            onChangeText={setProblem}
//          />
//          <TouchableOpacity
//            style={styles.button}
//            onPress={() => showImageOptions('product')}>
//            <Text style={styles.buttonText}>Upload defect(photo/video/audio)</Text>
//          </TouchableOpacity>
//          {productImage && (
//            <Image source={{uri: productImage.uri}} style={styles.image} />
//          )}
//           {/* {productImage && productImage.type === 'photo' && (
//         <Image source={{ uri: productImage.uri }} style={styles.image} />
//       )} */}
//       {/* {productImage && productImage.type === 'video' && (
//         <Video source={{ uri: productImage.uri }} style={styles.image} />
//       )}
//       {productImage && productImage.type === 'audio' && (
//         <AudioPlayer source={{ uri: productImage.uri }} />
//       )} */}
//          <TouchableOpacity
//            style={styles.button}
//            onPress={() => showImageOptions('proof')}>
//            <Text style={styles.buttonText}>Add Proof of Purchase</Text>
//          </TouchableOpacity>
//          {proofImage && (
//            <Image source={{uri: proofImage.uri}} style={styles.image} />
//          )}
//          <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
//            <Text style={styles.submitText}>Submit</Text>
//          </TouchableOpacity>
//        </View>
//        </ScrollView>
//       )}

//       {activeSection === 'Overview' && (
//         <View style={styles.section}>
//           <View style={styles.inputContainer}>
//             <Text
//               style={[
//                 styles.placeholder,
//                 loginDetails.contact_no ? styles.placeholderActive : '',
//               ]}>
//               Mobile Number
//             </Text>
//             <TextInput
//               style={styles.input}
//               editable={false}
//               // placeholder=""
//               value={loginDetails.contact_no}
//               // onChangeText={(text) =>
//               //   setLoginDetails({ ...loginDetails, contact_no: text })}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text
//               style={[
//                 styles.placeholder,
//                 loginDetails.email_address ? styles.placeholderActive : '',
//               ]}>
//               Email Id
//             </Text>
//             <TextInput
//               style={styles.input}
//               editable={false}
//               // placeholder=""
//               value={loginDetails.email_address}
//               // onChangeText={(text) =>
//               //   setLoginDetails({ ...loginDetails, email_address: text })
//               // }
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text
//               style={[
//                 styles.placeholder,
//                 otp.email_otp ? styles.placeholderActive : '',
//               ]}>
//               Enter Email OTP
//             </Text>
//             <TextInput
//               style={styles.input}
//               placeholder=""
//               keyboardType="phone-pad"
//               value={otp.email_otp}
//               onChangeText={text =>
//                 setOtp(prevState => ({...prevState, email_otp: text}))
//               }
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text
//               style={[
//                 styles.placeholder,
//                 otp.mobile_otp ? styles.placeholderActive : '',
//               ]}>
//               Enter Mobile OTP
//             </Text>
//             <TextInput
//               style={styles.input}
//               placeholder=""
//               keyboardType="phone-pad"
//               value={otp.mobile_otp}
//               onChangeText={text =>
//                 setOtp(prevState => ({...prevState, mobile_otp: text}))
//               }
//             />
//           </View>

//           {resendDisabled ? (
//             <Text style={styles.resendText}>Resend OTP in {timer} seconds</Text>
//           ) : (
//             <TouchableOpacity
//               style={styles.resendButton}
//               onPress={handleResendOTP}
//               disabled={resendDisabled}>
//               <Text style={styles.resendButtonText}>Resend OTP</Text>
//             </TouchableOpacity>
//           )}

//           <TouchableOpacity style={styles.button} onPress={handleOTPEnter}>
//             <Text style={styles.buttonText}>Next</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       <ScrollView>
//         {activeSection === 'RequestStatus' && (
//           <View style={styles.section}>
//             {/* <View style={styles.inputContainer1}>
//               <View style={styles.picker}>
//                 <Picker
//                   selectedValue={contactDetails.customer_type}
//                   style={styles.input1}
//                   onValueChange={itemValue =>
//                     setContactDetails({
//                       ...contactDetails,
//                       customer_type: itemValue,
//                     })
//                   }>
//                   <Picker.Item label="Select Customer Type" value="" />
//                   <Picker.Item label="End Customer" value="End Customer" />
//                   <Picker.Item
//                     label="SPP/Distributor/Partner"
//                     value="Distributor"
//                   />
//                   <Picker.Item
//                     label="System Integrator"
//                     value="System Integrator"
//                   />
//                   <Picker.Item label="Retailer/Dealer" value="Dealer" />
//                 </Picker>
//               </View>
//             </View> */}

//             <View style={styles.inputContainer}>
//               <Text
//                 style={[
//                   styles.placeholder,
//                   contactDetails.customer_name ? styles.placeholderActive : '',
//                 ]}>
//                 {/* Customer Type */}
//               </Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder=""
//                 value={contactDetails.customer_type}
//                 editable={false}
//                 // onChangeText={text =>
//                 //   setContactDetails({...contactDetails, customer_type: text})
//                 // }
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <Text
//                 style={[
//                   styles.placeholder,
//                   contactDetails.customer_name ? styles.placeholderActive : '',
//                 ]}>
//                 Customer/Company Name
//               </Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder=""
//                 value={contactDetails.customer_name}
//                 onChangeText={text =>
//                   setContactDetails({...contactDetails, customer_name: text})
//                 }
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <Text
//                 style={[
//                   styles.placeholder,
//                   contactDetails.contact_person ? styles.placeholderActive : '',
//                 ]}>
//                 Contact Person*
//               </Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder=""
//                 value={contactDetails.contact_person}
//                 onChangeText={text =>
//                   setContactDetails({...contactDetails, contact_person: text})
//                 }
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <Text
//                 style={[
//                   styles.placeholder,
//                   contactDetails.alternate_contact_no
//                     ? styles.placeholderActive
//                     : '',
//                 ]}>
//                 Alternate Contact Number
//               </Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder=""
//                 keyboardType="phone-pad"
//                 value={contactDetails.alternate_contact_no}
//                 onChangeText={text =>
//                   setContactDetails({
//                     ...contactDetails,
//                     alternate_contact_no: text,
//                   })
//                 }
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <Text
//                 style={[
//                   styles.placeholder,
//                   contactDetails.alternate_email_id
//                     ? styles.placeholderActive
//                     : '',
//                 ]}>
//                 Alternate Email Id*
//               </Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder=""
//                 value={contactDetails.alternate_email_id}
//                 onChangeText={text =>
//                   setContactDetails({
//                     ...contactDetails,
//                     alternate_email_id: text,
//                   })
//                 }
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <Text
//                 style={[
//                   styles.placeholder,
//                   contactDetails.pincode ? styles.placeholderActive : '',
//                 ]}>
//                 Pincode*
//               </Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder=""
//                 keyboardType="phone-pad"
//                 value={contactDetails.pincode}
//                 // onChangeText={text =>
//                 //   setContactDetails({...contactDetails, pincode: text})
//                 // }
//                 onChangeText={handlePincodeChange}
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <Text
//                 style={[
//                   styles.placeholder,
//                   contactDetails.city ? styles.placeholderActive : '',
//                 ]}>
//                 City*
//               </Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder=""
//                 value={contactDetails.city}
//                 editable={false}
//                 // onChangeText={text =>
//                 //   setContactDetails({...contactDetails, city: text})
//                 // }
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <Text
//                 style={[
//                   styles.placeholder,
//                   contactDetails.state ? styles.placeholderActive : '',
//                 ]}>
//                 State*
//               </Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder=""
//                 value={contactDetails.state}
//                 editable={false}
//                 // onChangeText={text =>
//                 //   setContactDetails({...contactDetails, state: text})
//                 // }
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <Text
//                 style={[
//                   styles.placeholder,
//                   contactDetails.address_line1 ? styles.placeholderActive : '',
//                 ]}>
//                 Address Line 1*
//               </Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder=""
//                 value={contactDetails.address_line1}
//                 onChangeText={text =>
//                   setContactDetails({...contactDetails, address_line1: text})
//                 }
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <Text
//                 style={[
//                   styles.placeholder,
//                   contactDetails.address_line2 ? styles.placeholderActive : '',
//                 ]}>
//                 Address Line 2
//               </Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder=""
//                 value={contactDetails.address_line2}
//                 onChangeText={text =>
//                   setContactDetails({...contactDetails, address_line2: text})
//                 }
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <Text
//                 style={[
//                   styles.placeholder,
//                   loginDetails.contact_no ? styles.placeholderActive : '',
//                 ]}>
//                 Mobile Number*
//               </Text>
//               <TextInput
//                 style={styles.input}
//                 editable={false}
//                 // placeholder=""
//                 value={loginDetails.contact_no}
//                 // onChangeText={(text) =>
//                 //   setLoginDetails({ ...loginDetails, contact_no: text })}
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <Text
//                 style={[
//                   styles.placeholder,
//                   loginDetails.email_address ? styles.placeholderActive : '',
//                 ]}>
//                 Primary Email Id*
//               </Text>
//               <TextInput
//                 style={styles.input}
//                 editable={false}
//                 // placeholder=""
//                 value={loginDetails.email_address}
//                 // onChangeText={(text) =>
//                 //   setLoginDetails({ ...loginDetails, email_address: text })
//                 // }
//               />
//             </View>

//             <TouchableOpacity
//               style={styles.button}
//               onPress={handleContactDetailsSubmit}>
//               <Text style={styles.buttonText}>Save</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   mainradio: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10 * scale1,
//   },
//   radiotype: {
//     fontSize: 16 * scale,
//     fontWeight: 'bold',
//     marginRight: 10 * scale,
//     color: '#7d7d7d',
//   },
//   radioOptions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   radioButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 10 * scale,
//   },
//   radioText: {
//     marginLeft: 1 * scale,
//     color: '#7d7d7d',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20 * scale1,
//   },
//   headerItem: {
//     flex: 1,
//     alignItems: 'center',
//     paddingBottom: 5 * scale1,
//   },
//   headerText: {
//     fontSize: 16 * scale,
//     fontWeight: 'bold',
//     color: 'black',
//     // borderWidth:1,
//     // padding:2
//   },
//   activeHeaderItem: {
//     // borderBottomWidth: 2 * scale,
//     borderColor: 'red',
//     borderWidth: 1,
//   },
//   activeHeaderText: {
//     color: 'red',
//   },
//   section: {
//     marginBottom: 10 * scale1,
//   },

//   inputContainer: {
//     position: 'relative',
//     marginBottom: 12 * scale1,
//   },

//   input: {
//     borderBottomWidth: 1 * scale,
//     borderColor: '#a9a9a9',
//     padding: 5 * scale,
//     paddingLeft: 0,
//     fontSize: 16 * scale,
//     paddingTop: 12 * scale1,
//     color: 'black',
//   },
//   placeholder: {
//     position: 'absolute',
//     left: 0,
//     top: 15 * scale1,
//     fontSize: 16 * scale,
//     color: '#999',
//     zIndex: -1,
//   },
//   placeholderActive: {
//     top: -3 * scale1,
//     fontSize: 12 * scale,
//     color: '#333',
//   },
//   button: {
//     backgroundColor: 'red',
//     padding: 10 * scale,
//     borderRadius: 5 * scale,
//     alignItems: 'center',
//     marginTop: 10 * scale1,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   showButton: {
//     position: 'absolute',
//     right: 0,
//     top: 15 * scale1,
//   },
//   resendButton: {
//     backgroundColor: 'blue',
//     padding: 8 * scale,
//     borderRadius: 5 * scale,
//     marginTop: 10 * scale1,
//   },
//   resendButtonText: {
//     color: 'white',
//     fontSize: 16 * scale,
//     textAlign: 'center',
//   },
//   resendText: {
//     textAlign: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     flex: 1,
//     padding: 20 * scale1,
//   },
//   label: {
//     fontSize: 16 * scale,
//     marginBottom: 5 * scale1,
//     marginTop:10*scale1
//   },
//   input1: {
//     color: 'black',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5 * scale,
//     padding: 10 * scale1,
//     marginBottom: 10 * scale1,
//     width: 300 * scale,
//   },
//   input: {
//     color: 'black',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5 * scale,
//     padding: 10 * scale1,
//     marginBottom: 10 * scale1,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   searchbutton: {
//     backgroundColor: '#00bfff',
//     paddingVertical: 12 * scale1,
//     paddingHorizontal: 12 * scale,
//     borderRadius: 5 * scale,
//     marginLeft: 4 * scale,
//     marginBottom: 8 * scale1,
//   },
//   searchbuttontext: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   image: {
//     width: '100%',
//     height: 200*scale1,
//     resizeMode: 'cover',
//     marginBottom: 10*scale1,
//   },
//   button: {
//     backgroundColor: '#00bfff',
//     paddingVertical: 12*scale1,
//     paddingHorizontal: 12*scale,
//     borderRadius: 5*scale,
//     marginBottom: 10*scale1,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   submit: {
//     backgroundColor: '#008000',
//     paddingVertical: 12*scale1,
//     paddingHorizontal: 12*scale,
//     borderRadius: 5*scale,
//     marginBottom: 10*scale1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   submitText: {
//     fontSize: 16*scale1,
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   radioGroup: {
//     flexDirection: 'row',
//   },
//   radioButton: {
//     backgroundColor: '#eee',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   radioText: {
//     fontSize: 16,
//   },
//   selected: {
//     backgroundColor: 'lightblue',
//   },
//   dropdown: {
//     maxHeight: 200,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginTop: 8,
//   },
//   dropdownItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: 'gray',
//   },
//   // centeredView: {
//   //   flex: 1,
//   //   justifyContent: 'center',
//   //   alignItems: 'center',
//   //   marginTop: 22
//   // },
//   // modalView: {
//   //   margin: 20,
//   //   backgroundColor: 'white',
//   //   borderRadius: 20,
//   //   padding: 35,
//   //   alignItems: 'center',
//   //   shadowColor: '#000',
//   //   shadowOffset: {
//   //     width: 0,
//   //     height: 2,
//   //   },
//   //   shadowOpacity: 0.25,
//   //   shadowRadius: 4,
//   //   elevation: 5,
//   // },
//   // button1: {
//   //   borderRadius: 20,
//   //   padding: 10,
//   //   elevation: 2,
//   //   backgroundColor: '#2196F3'
//   // },
//   // buttonClose: {
//   //   backgroundColor: 'red',
//   //   marginTop:5
//   // },
//   // textStyle: {
//   //   color: 'white',
//   //   fontWeight: 'bold',
//   //   textAlign: 'center',
//   // },
//   // modalText: {
//   //   marginBottom: 15,
//   //   textAlign: 'center',
//   //   fontWeight:'bold',
//   //   fontSize:16
//   // }
// });

// export default AddCarryInService;

import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
  Image,
  FlatList,
  Modal,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {RadioButton} from 'react-native-paper';
import RNFS from 'react-native-fs';
import CheckBox from '@react-native-community/checkbox';
import PaytmRouterSDK from 'paytm-routersdk-react-native';

const {width, height} = Dimensions.get('window');
const scale = width / 411.4285;
const scale1 = height / 826;

const AddCarryInService = ({navigation, route}) => {
  const {username, token, userData} = route.params;
  const [activeSection, setActiveSection] = useState('AddRequest');

  const [serialNumber, setSerialNumber] = useState('');

  const [productDescription, setProductDescription] = useState('');
  const [problem, setProblem] = useState('');
  const [productName, setProductName] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [serialNumbers, setSerialNumbers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [productImage, setProductImage] = useState(null);
  const [proofImage, setProofImage] = useState(null);
  const [itemCode, setItemCode] = useState(false);
  // const [isExist, setIsExist] = useState('yes');
  const [warranty, setWarranty] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  // const [isSelected, setIsSelected] = useState(false);
  const [isSelected, setIsSelected] = useState('');

  const [showCityList, setShowCityList] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [address, setAddress] = useState();
  const [depositOption, setDepositOption] = useState('self');
  const [personCourierName, setPersonCourierName] = useState('');
  const [contactDocketNumber, setContactDocketNumber] = useState('');
  const [remarks, setRemarks] = useState('');
  const [filteredSerialNumbers, setFilteredSerialNumbers] = useState([]);
  const [overviewData, setOverviewData] = useState(null);
  // const [remarks, setRemarks] = useState('');

  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [showdeletedetails, setShowdeletedetails] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteReason, setDeleteReason] = useState('');
  const [paidVisible,setPaidVisible] = useState(false);

  useEffect(() => {
    handleFocus();
    citydropdown();
    fetchOverviewData();
    showaddress(userData.pincode);
  }, []);

  const showaddress = async pincode => {
    try {
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISGetSCInfo/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            Pincode: pincode,
            State: '',
            City: '',
            token: userData.token,
          }),
        },
      );

      const result = await response.json();
      console.log(result);

      if (result.success == 1) {
        // Alert.alert(result.message);
        setAddress(result.Listdate);
        setSelectedCity(result.Listdate[0]);
      } else {
        // console.error('Error', result.error);
        Alert.alert('Error', 'No data found');
      }
    } catch (error) {
      // console.error('Error:', error);
      Alert.alert('An unexpected error occurred. Please try again later.');
    }
  };

  const citydropdown = async () => {
    try {
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISGetSCInfo/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: userData.usercode,
            Pincode: '',
            State: userData.state,
            City: '',
            token: userData.token,
          }),
        },
      );

      const result = await response.json();
      console.log(result);

      if (result.success === 1) {
        // Alert.alert(result.message);
        setCityList(result.Listdate);
      } else {
        // console.error('Error fetching city list:', result.error);
        Alert.alert('Error', 'Failed to fetch city list. Please try again.');
      }
    } catch (error) {
      // console.error('Error:', error);
      Alert.alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handleSelectProduct = product => {
    setProductDescription(product.materialdescription);
    setShowDropdown(false);
  };

  const handleFocus = async () => {
    try {
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/GetProductList/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            token: token,
          }),
        },
      );
      const result = await response.json();
      console.log(result);
      if (result.retstatus.success == 1) {
        // Alert.alert(result.retstatus.message);
        setProductName(result.Listdate);
        setItemCode('');
        setSerialNumber('');
        setWarranty('');
      } else if (result.retstatus.success == 0) {
        Alert.alert(result.retstatus.message);
      }
    } catch (error) {
      Alert.alert('An unexpected error occurred. Please try again later.');
    }
  };
  const filterproductName = productName.filter(item =>
    item.materialdescription
      .toLowerCase()
      .includes(productDescription.toLowerCase()),
  );

  const convertFileToBase64 = async uri => {
    try {
      if (!uri) {
        throw new Error('URI is undefined');
      }

      const resizedImageUri = await ImageResizer.createResizedImage(
        uri,
        800,
        600,
        'JPEG',
        80,
      );
      const fileContent = await RNFS.readFile(resizedImageUri.uri, 'base64');
      if (!fileContent) {
        throw new Error('File content is empty');
      }

      const base64DataUri = `data:image/jpeg;base64,${fileContent}`;
      return base64DataUri;
    } catch (error) {
      console.error('Error converting file to base64:', error);
      return null;
    }
  };

  const selectImage = fieldName => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    ImagePicker.launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        const base64Image = await convertFileToBase64(uri);
        if (base64Image) {
          const {extension, base64Data} = extractBase64Parts(base64Image);
          await checkImageSize(
            uri,
            fieldName,
            base64Image,
            extension,
            base64Data,
          );
        }
      }
    });
  };

  const handleCameraLaunch = fieldName => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    ImagePicker.launchCamera(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        const base64Image = await convertFileToBase64(uri);
        if (base64Image) {
          const {extension, base64Data} = extractBase64Parts(base64Image);
          await checkImageSize(
            uri,
            fieldName,
            base64Image,
            extension,
            base64Data,
          );
        }
      }
    });
  };

  const checkImageSize = async (
    uri,
    fieldName,
    base64Image,
    extension,
    base64Data,
  ) => {
    try {
      const fileInfo = await RNFS.stat(uri);
      const fileSizeInMB = fileInfo.size / (1024 * 1024); // Convert bytes to MB
      if (fileSizeInMB > 2) {
        Alert.alert('Image size exceeds 2MB. Please select another image.');
        // Optionally, you can reset the image state here
        // setProductImage(null);
      } else {
        // Set the selected image based on the field name
        switch (fieldName) {
          case 'product':
            setProductImage({uri, base64: base64Image, extension, base64Data});
            break;
          case 'proof':
            setProofImage({uri, base64: base64Image, extension, base64Data});
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.log('Error checking image size:', error);
    }
  };

  const extractBase64Parts = base64DataUri => {
    const extensionMatch = base64DataUri.match(/^data:image\/(.*?);base64,/);
    const extension = extensionMatch ? extensionMatch[1] : null;
    const base64Data = base64DataUri.split(',')[1];
    return {extension, base64Data};
  };

  const handleSubmit = async () => {
    if (!serialNumber) {
      Alert.alert('Serial number is required');
    }
    if (!productImage) {
      Alert.alert('Please select a photo');
    }
    if (!proofImage) {
      Alert.alert('Please select proof of image');
    } else {
      try {
        console.log({
          username: username,
          sub_user_id: username,
          token: token,
          serialflag: 'yes',
          serial: serialNumber,
          itemcode: itemCode,
          itemdescription: productDescription,
          fault: problem,
          customer_id: username,
          warrantycode: warranty,
          accessory: '',
        });

        setLoading(true);
        const response = await fetch(
          'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISCarryInProductAdd/',
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              sub_user_id: username,
              token: token,
              serialflag: 'YES',
              serial: serialNumber,
              itemcode: itemCode,
              itemdescription: productDescription,
              fault: problem,
              customer_id: username,
              warrantycode: warranty,
              accessory: '',
              fileext: productImage.extension,
              faultfiledata: productImage.base64Data,
              filename: proofImage.base64Image,
            }),
          },
        );
        console.log('Response Status', response.status);
        const result = await response.json();
        console.log('Response Content:', result);

        if (result.retstatus.success == 1) {
          Alert.alert(
            result.retstatus.message,
            'Would you like to add more products?',
            [
              {
                text: 'No',
                onPress: () => {
                  setActiveSection('Overview');
                },
              },
              {
                text: 'Yes',
                onPress: () => {
                  // Stay on the current page or reset the form for adding more products
                  // Example: resetForm();
                },
              },
            ],
            {cancelable: false},
          );
        } else if (result.retstatus.success == 0) {
          Alert.alert(result.retstatus.message);
        }
      } catch (error) {
        // console.error('Error:', error);
        Alert.alert('An error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handlesearch = async () => {
    navigation.navigate('Productregistration', {
      token: token,
      username: username,
    });
  };

  const showImageOptions = fieldName => {
    Alert.alert(
      'Choose Image Source',
      'Select the source of the image',
      [
        {
          text: 'Choose from Gallery',
          onPress: () => selectImage(fieldName),
        },
        {
          text: 'Take Photo',
          onPress: () => handleCameraLaunch(fieldName),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  // const onSelect = () => {
  //   setIsSelected(prevSelected => !prevSelected);
  // };
  const onSelect = index => {
    const newSelection = [...isSelected];
    newSelection[index] = !newSelection[index];
    setIsSelected(newSelection);

    setShowDeleteIcon(newSelection[index]);
    setDeleteIndex(index);
  };

  // const filteredCityList = cityList.filter(city =>
  //   city.city.toLowerCase().includes(selectedCity.toLowerCase()),
  // );

  const renderCityItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => handleCityChange(item)}
        style={styles.itemContainer}>
        <Text style={styles.itemText}>
          {item.SCName} | {item.SCCity} | {item.SCPincode}
        </Text>
      </TouchableOpacity>
    );
  };
  const handleCityChange = item => {
    setSelectedCity(item);
    showaddress(item.SCPincode);
    setShowCityList(false);
  };

  const handleRadioChange = value => {
    setDepositOption(value);
    // Reset remarks when switching between options
    // if (value === 'yes') {
    //   setRemarks('');
    // }
  };

  const handleSave = () => {
    // Handle save action
    console.log('Save button pressed');
  };

  const fetchSerialNumbers = async () => {
    try {
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISGetUserSerialList/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            token: token,
            query: '',
          }),
        },
      );
      const result = await response.json();
      console.log(result);
      if (result.retstatus.success == 1) {
        // Alert.alert(result.retstatus.message);
        setSerialNumbers(result.Listdate);
        setFilteredSerialNumbers(result.Listdate);
      } else {
        Alert.alert(result.retstatus.message);
      }
    } catch (error) {
      Alert.alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handleSerialNumberSelect = async serialNumber => {
    setSerialNumber(serialNumber);

    setShowWarning(false);

    try {
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISGetSerialData/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            token: token,
            serial: serialNumber,
          }),
        },
      );
      const result = await response.json();
      console.log(result);
      if (result.retstatus.success == 1) {
        // Alert.alert(result.retstatus.message);
        setWarranty(result.Listdate[0].warrantystatus);
        setProductDescription(result.Listdate[0].materialdescription);
        setItemCode(result.Listdate[0].materialcode);
      } else {
        Alert.alert(result.retstatus.message);
      }
    } catch (error) {
      // console.error('Error:', error);
      Alert.alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handleserialnumbersearch = text => {
    setSerialNumber(text);
    const filteredList = serialNumbers.filter(item =>
      item.SerialNo.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredSerialNumbers(filteredList);
  };

  const fetchOverviewData = async () => {
    try {
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISGetPendingForOrder/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            token: token,
          }),
        },
      );
      const result = await response.json();
      console.log(result);
      if (result.retstatus.success == 1) {
        setOverviewData(result.Listdate);
      } else {
        Alert.alert(result.retstatus.message);
      }
    } catch (error) {
      // console.error('Error fetching overview data:', error);
      Alert.alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handleNext = () => {
    setActiveSection('RequestStatus');
  };

  const handleDelete = () => {
    if (deleteIndex !== null) {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete the selected item?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => {
              const updatedData = [...overviewData];
              updatedData.splice(deleteIndex, 1); // Remove item from array
              // Perform delete operation or update state as needed
              console.log('Deleted item:', overviewData[deleteIndex]);
              setIsSelected(isSelected.filter((_, i) => i !== deleteIndex));
              setOverviewData(updatedData);
              setShowDeleteIcon(false);
              setShowdeletedetails(false);
            },
            style: 'destructive',
          },
        ],
        {cancelable: false},
      );
    }
  };

  const handleScan = () => {
    navigation.navigate('Scanner', {
      onScanComplete: scannedSerialNumber => {
        setSerialNumber(scannedSerialNumber);
      },
    });
  };

  const orderDetails = {
    orderId:'TestOrder_5',
      mid:'216820000000000014719',
      txnToken:'85286055-ff9f-4a3c-9e02-024cf4015b21',
      amount:'1',
      callbackUrl:'https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=TestOrder_5',
      isStaging:true
  }

  const handlePay = () => {
    // Handle pay button press
    try {
    PaytmRouterSDK.startTransaction(
      orderDetails.orderId,
      orderDetails.mid,
      orderDetails.txnToken,
      orderDetails.amount,
      orderDetails.callbackUrl,
      orderDetails.isStaging
      ).then((result) => {
      updateUI(result);
      })
      .catch((err) => {
      handleError(err);
      })
    }catch(error){
      console.log("try catch error",error);
    }
  };

  const handleToggleDetails = () => {
    setPaidVisible(!paidVisible);
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.headerItem,
            activeSection === 'AddRequest' && styles.activeHeaderItem,
          ]}
          onPress={() => setActiveSection('AddRequest')}>
          <Text
            style={[
              styles.headerText,
              activeSection === 'AddRequest' && styles.activeHeaderText,
            ]}>
            Add Request
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.headerItem,
            activeSection === 'Overview' && styles.activeHeaderItem,
          ]}
          onPress={() => setActiveSection('Overview')}>
          <Text
            style={[
              styles.headerText,
              activeSection === 'Overview' && styles.activeHeaderText,
            ]}>
            Overview
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.headerItem,
            activeSection === 'RequestStatus' && styles.activeHeaderItem,
          ]}
          onPress={() => setActiveSection('RequestStatus')}>
          <Text
            style={[
              styles.headerText,
              activeSection === 'RequestStatus' && styles.activeHeaderText,
            ]}>
            Request Status
          </Text>
        </TouchableOpacity>
      </View>

      {activeSection === 'AddRequest' && (
        <View>
          <View>
            <Text style={styles.label}>Serial Number:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input1}
                value={serialNumber}
                onChangeText={handleserialnumbersearch}
                onFocus={() => {
                  setShowWarning(true);
                  fetchSerialNumbers();
                }}
              />
              {showWarning && filteredSerialNumbers.length > 0 && (
                <View style={styles.dropdownContainer}>
                  <FlatList
                    data={serialNumbers}
                    keyExtractor={item => item.Sno.toString()}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() => handleSerialNumberSelect(item.SerialNo)}>
                        <Text style={styles.serialNumberItem}>
                          {item.SerialNo}
                        </Text>
                      </TouchableOpacity>
                    )}
                    style={styles.flatList}
                  />
                  {showWarning && filteredSerialNumbers.length === 0 && (
                    <Text style={styles.noDataText}>
                      No serial numbers found.
                    </Text>
                  )}
                </View>
              )}
              <TouchableOpacity onPress={handleScan} style={styles.scanbutton}>
                <Image
                  source={require('../Images/scanner_icon.png')}
                  style={styles.scanIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlesearch}
                style={styles.searchbutton}>
                <Text style={styles.searchbuttontext}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* {showWarning && serialNumber.length < 6 && (
            <Text style={styles.warningText}>
              Enter a minimum of six digits
            </Text>
          )} */}

          <View>
            <Text style={styles.label}>Warranty:</Text>
            <TextInput
              style={[styles.input, {backgroundColor: '#f0f8ff'}]}
              editable={false}
              value={warranty}
              onChangeText={setWarranty}
            />
          </View>

          <View>
            <Text style={styles.label}>Product Name:</Text>
            <TextInput
              style={[styles.input, {backgroundColor: '#f0f8ff'}]}
              editable={false}
              value={productDescription}
              onChangeText={setProductDescription}
            />
          </View>

          <Text style={styles.label}>Problem:</Text>
          <TextInput
            style={styles.input}
            value={problem}
            onChangeText={setProblem}
          />
          <TouchableOpacity
            style={[
              styles.button,
              productImage ? styles.uploadedText : styles.uploadText,
            ]}
            onPress={() => showImageOptions('product')}>
            <Text style={styles.buttonText}>
              {productImage ? 'Defect photo uploaded' : 'Upload defect photo'}
            </Text>
          </TouchableOpacity>
          {/* {productImage && (
              <Image source={{uri: productImage.uri}} style={styles.image} />
            )} */}
          <TouchableOpacity
            style={[
              styles.button,
              proofImage ? styles.uploadedText1 : styles.uploadText1,
            ]}
            onPress={() => showImageOptions('proof')}>
            <Text style={styles.buttonText}>
              {proofImage
                ? 'Proof of Purchase uploaded'
                : 'Upload proof of purchase'}
            </Text>
          </TouchableOpacity>
          {/* {proofImage && (
              <Image source={{uri: proofImage.uri}} style={styles.image} />
            )} */}
          <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}

      {activeSection === 'Overview' && (
        <View style={{flex: 2}}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View>
              {overviewData &&
                overviewData.map((item, index) => (
                  <View style={styles.container1} key={index}>
                    <View style={{flexDirection: 'column'}}>
                      <CheckBox
                        value={isSelected[index]}
                        onValueChange={() => {
                          onSelect(index);
                          setShowDeleteIcon(true);
                        }}
                        style={styles.checkbox}
                      />
                      {isSelected[index] && (
                        <TouchableOpacity
                          onPress={() => setShowdeletedetails(true)}>
                          <Image
                            source={require('../Images/delete1.png')}
                            style={styles.icon}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                    <View style={styles.detailsContainer}>
                      <View style={styles.leftColumn}>
                        <Text style={styles.label}>ID:</Text>
                        <Text style={styles.label}>Product Name:</Text>
                        <Text style={styles.label}>Warranty:</Text>
                        <Text style={styles.label}>Serial Number:</Text>
                      </View>
                      <View style={styles.rightColumn}>
                        <Text style={styles.detail}>{item.TagId}</Text>
                        <Text style={styles.detail}>{item.ProductName}</Text>
                        <Text style={styles.detail}>{item.WarrantyStatus}</Text>
                        <Text style={styles.detail}>{item.Serial}</Text>
                      </View>
                    </View>
                  </View>
                ))}
            </View>
          </ScrollView>
          {/* {showdeletedetails && (
        <View style={styles.deleteContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete Item</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.reasonInput}
            placeholder="Enter reason for deletion"
            value={deleteReason}
            onChangeText={setDeleteReason}
          />
        </View>
      )} */}

          {showdeletedetails && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={showdeletedetails}
              onRequestClose={() => setShowdeletedetails(false)}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Confirm Delete</Text>
                  <TextInput
                    style={styles.reasonInput}
                    placeholder="Enter reason for deletion"
                    value={deleteReason}
                    onChangeText={setDeleteReason}
                  />
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => setShowdeletedetails(false)}>
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={handleDelete}>
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.submit} onPress={handleNext}>
              <Text style={styles.submitText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {activeSection === 'RequestStatus' && (
        <View>
          <View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  marginLeft: 10,
                }}>
                Select Repair location
              </Text>
            </View>
            <View style={styles.inputRow}>
              <TouchableOpacity onPress={() => setShowCityList(true)}>
                <View pointerEvents="none">
                  <TextInput
                    style={styles.textinput2}
                    placeholder="Select City"
                    value={
                      selectedCity
                        ? `${selectedCity.SCName} | ${selectedCity.SCCity} | ${selectedCity.SCPincode}`
                        : ''
                    }
                    editable={false}
                  />
                </View>
              </TouchableOpacity>
              {showCityList && cityList.length > 0 && (
                <View
                  style={[
                    styles.stateListContainer,
                    {
                      position: 'absolute',
                      top: 60,
                      left: 0,
                      right: 0,
                      zIndex: 999,
                    },
                  ]}>
                  <FlatList
                    data={cityList}
                    renderItem={renderCityItem}
                    keyExtractor={item => item.Id}
                  />
                </View>
              )}
            </View>
          </View>

          <View>
            <View style={styles.contentContainer}>
              {address &&
                address.map(item => (
                  <View key={item.Id}>
                    <Text
                      style={[
                        styles.contentText,
                        {fontSize: 18, color: 'black'},
                      ]}>
                      {item.SCName}
                    </Text>
                    <Text style={[styles.contentText, {color: 'black'}]}>
                      {item.SCAddress}
                    </Text>
                    <Text style={[styles.contentText,{color:'black'}]}>{item.SCPhone}</Text>
                    <Text style={[styles.contentText, {color: 'black'}]}>
                      {item.SCEmail}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
          <View style={styles.container3}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              Dispatch Mode
            </Text>
            <View style={styles.content3}>
              <RadioButton
                value="self"
                status={depositOption === 'self' ? 'checked' : 'unchecked'}
                onPress={() => handleRadioChange('self')}
              />
              <Text
                style={{marginTop: 7, fontWeight: 'bold'}}
                onPress={() => handleRadioChange('self')}>
                Self Deposit
              </Text>
              <RadioButton
                value="courier"
                status={depositOption === 'courier' ? 'checked' : 'unchecked'}
                onPress={() => handleRadioChange('courier')}
              />
              <Text
                style={{marginTop: 7, fontWeight: 'bold'}}
                onPress={() => handleRadioChange('courier')}>
                Via Courier
              </Text>
              <RadioButton
                value="paid"
                status={depositOption === 'paid' ? 'checked' : 'unchecked'}
                onPress={() => handleRadioChange('paid')}
              />
              <Text
                style={{marginTop: 7, fontWeight: 'bold'}}
                onPress={() => handleRadioChange('paid')}>
                Paid Pick Up
              </Text>
            </View>
          </View>

          {depositOption === 'self' && (
            <View>
              <Text style={styles.label1}>Person:</Text>
              <TextInput
                style={styles.input2}
                placeholder="Person/Courier Name"
                value={personCourierName}
                onChangeText={setPersonCourierName}
              />
              <Text style={styles.label1}>Contact:</Text>
              <TextInput
                style={styles.input2}
                placeholder="Contact/Docket Number"
                value={contactDocketNumber}
                onChangeText={setContactDocketNumber}
              />
              <Text style={styles.label1}>Remarks:</Text>
              <TextInput
                style={styles.input2}
                placeholder="Remarks"
                value={remarks}
                onChangeText={setRemarks}
              />
            </View>
          )}

          {depositOption === 'courier' && (
            <View>
              <Text style={styles.label1}>Courier Name:</Text>
              <TextInput
                style={styles.input2}
                placeholder="Person/Courier Name"
                value={personCourierName}
                onChangeText={setPersonCourierName}
              />
              <Text style={styles.label1}>Docket Number:</Text>
              <TextInput
                style={styles.input2}
                placeholder="Contact/Docket Number"
                value={contactDocketNumber}
                onChangeText={setContactDocketNumber}
              />
              <Text style={styles.label1}>Remarks:</Text>
              <TextInput
                style={styles.input2}
                placeholder="Remarks"
                value={remarks}
                onChangeText={setRemarks}
              />
            </View>
          )}

          {depositOption === 'paid' && (
            <View>
            <TouchableOpacity style={styles.button} onPress={handleToggleDetails}>
              <Text style={styles.buttonText}>
                {paidVisible ? 'Hide Payment Details' : 'Payment Details'}
              </Text>
            </TouchableOpacity>

            {paidVisible && (
            <View>
              <View style={styles.row}>
                <Text style={styles.label}>S.No:</Text>
                <Text style={styles.value}>1</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Module Name:</Text>
                <Text style={styles.value}>Module 1</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Quantity:</Text>
                <Text style={styles.value}>10</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Rate:</Text>
                <Text style={styles.value}>₹100</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Total:</Text>
                <Text style={styles.value}>₹1000</Text>
              </View>

              <TouchableOpacity style={styles.button} onPress={handlePay}>
                <Text style={styles.buttonText}>Pay ₹ 1000</Text>
              </TouchableOpacity>
            </View>
             )}
            </View>
          )}

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   mainradio: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10 * scale1,
//   },
//   radiotype: {
//     fontSize: 16 * scale,
//     fontWeight: 'bold',
//     marginRight: 10 * scale,
//     color: '#7d7d7d',
//   },
//   radioOptions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   radioButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 10 * scale,
//   },
//   radioText: {
//     marginLeft: 1 * scale,
//     color: '#7d7d7d',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20 * scale1,
//   },
//   headerItem: {
//     flex: 1,
//     alignItems: 'center',
//     paddingBottom: 5 * scale1,
//   },
//   headerText: {
//     fontSize: 16 * scale,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   activeHeaderItem: {
//     borderColor: 'red',
//     borderWidth: 1,
//   },
//   activeHeaderText: {
//     color: 'red',
//   },
//   section: {
//     marginBottom: 10 * scale1,
//   },

//   inputContainer: {
//     position: 'relative',
//     marginBottom: 12 * scale1,
//   },
//   placeholder: {
//     position: 'absolute',
//     left: 0,
//     top: 15 * scale1,
//     fontSize: 16 * scale,
//     color: '#999',
//     zIndex: -1,
//   },
//   placeholderActive: {
//     top: -3 * scale1,
//     fontSize: 12 * scale,
//     color: '#333',
//   },
//   button: {
//     backgroundColor: 'red',
//     padding: 10 * scale,
//     borderRadius: 5 * scale,
//     alignItems: 'center',
//     marginTop: 10 * scale1,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   showButton: {
//     position: 'absolute',
//     right: 0,
//     top: 15 * scale1,
//   },
//   resendButton: {
//     backgroundColor: 'blue',
//     padding: 8 * scale,
//     borderRadius: 5 * scale,
//     marginTop: 10 * scale1,
//   },
//   resendButtonText: {
//     color: 'white',
//     fontSize: 16 * scale,
//     textAlign: 'center',
//   },
//   resendText: {
//     textAlign: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     flex: 1,
//     padding: 20 * scale1,
//   },
//   // label: {
//   //   fontSize: 16 * scale,
//   //   marginBottom: 5 * scale1,
//   //   marginTop: 10 * scale1,
//   // },
//   input1: {
//     color: 'black',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5 * scale,
//     padding: 10 * scale1,
//     marginBottom: 10 * scale1,
//     width: 300 * scale,
//   },
//   input: {
//     color: 'black',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5 * scale,
//     padding: 10 * scale1,
//     marginBottom: 10 * scale1,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   searchbutton: {
//     backgroundColor: '#00bfff',
//     paddingVertical: 10 * scale1,
//     paddingHorizontal: 15 * scale,
//     borderRadius: 5 * scale,
//     marginLeft: 6 * scale,
//     marginBottom: 8 * scale1,
//   },
//   searchbuttontext: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 24 * scale1,
//   },
//   image: {
//     width: '100%',
//     height: 200 * scale1,
//     resizeMode: 'cover',
//     marginBottom: 10 * scale1,
//   },
//   button: {
//     backgroundColor: '#a9a9a9',
//     paddingVertical: 12 * scale1,
//     paddingHorizontal: 12 * scale,
//     borderRadius: 5 * scale,
//     marginBottom: 10 * scale1,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   submit: {
//     backgroundColor: 'red',
//     paddingVertical: 12 * scale1,
//     paddingHorizontal: 12 * scale,
//     borderRadius: 5 * scale,
//     marginBottom: 10 * scale1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   submitText: {
//     fontSize: 16 * scale1,
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   radioGroup: {
//     flexDirection: 'row',
//   },
//   radioButton: {
//     backgroundColor: '#eee',
//     paddingVertical: 10 * scale1,
//     paddingHorizontal: 20 * scale,
//     borderRadius: 5 * scale,
//     marginRight: 10 * scale1,
//   },
//   radioText: {
//     fontSize: 16 * scale1,
//   },
//   selected: {
//     backgroundColor: 'lightblue',
//   },
//   dropdown: {
//     backgroundColor: '#ffffff', // Background color
//     borderWidth: 1 * scale, // Border width
//     borderColor: '#cccccc', // Border color
//     borderRadius: 5 * scale, // Border radius
//     marginTop: 10 * scale1, // Margin top
//     maxHeight: 200 * scale1, // Max height of the dropdown to enable scrolling if needed
//     overflow: 'hidden', // Ensure content does not overflow
//   },
//   dropdownItem: {
//     padding: 10 * scale, // Padding for each dropdown item
//     fontSize: 16 * scale1, // Font size of dropdown item text
//   },
//   uploadText: {
//     backgroundColor: 'gray',
//   },
//   uploadedText: {
//     backgroundColor: 'green',
//   },
//   uploadText1: {
//     backgroundColor: 'gray',
//   },
//   uploadedText1: {
//     backgroundColor: 'green',
//   },
//   warningText: {
//     color: 'red',
//     marginTop: -3 * scale1,
//   },
//   container1: {
//     flexDirection: 'row',
//     borderWidth: 2 * scale,
//     borderColor: '#ccc',
//     padding: 10 * scale,
//     marginVertical: 0 * scale1,
//     alignItems: 'center',
//     borderRadius: 10 * scale,
//   },
//   checkbox: {
//     marginRight: 10 * scale,
//   },
//   detailsContainer: {
//     flexDirection: 'row',
//     flex: 1,
//   },
//   leftColumn: {
//     flex: 1,
//     fontWeight: 'bold',
//   },
//   rightColumn: {
//     flex: 1,
//   },
//   label: {
//     fontWeight: 'bold',
//     marginBottom: 10 * scale1,
//     fontSize: 16 * scale1,
//   },
//   detail: {
//     marginBottom: 10 * scale1,
//     fontSize: 16 * scale1,
//   },
//   inputRow: {
//     marginBottom: 5 * scale1,
//   },
//   textinput1: {
//     borderWidth: 1,
//     paddingHorizontal: 8 * scale,
//     paddingVertical: 3 * scale,
//     marginTop: 10 * scale1,
//   },
//   textinput2: {
//     marginTop: 15 * scale1,
//     marginLeft: 15 * scale,
//     borderWidth: 1,
//     fontSize: 16 * scale,
//     width: 350 * scale,
//     paddingHorizontal: 8 * scale,
//     paddingVertical: 6 * scale1,
//     borderRadius: 5 * scale,
//     color: 'black',
//   },
//   stateListContainer: {
//     maxHeight: 100 * scale1,
//     marginBottom: 10 * scale1,
//     marginLeft: 25 * scale,
//     backgroundColor: 'white',
//   },
//   itemContainer: {
//     paddingVertical: 10 * scale1,
//     paddingHorizontal: 15 * scale,
//     borderBottomWidth: 1 * scale1,
//     borderBottomColor: '#ccc',
//   },
//   itemText: {
//     fontWeight: 'bold',
//   },
//   contentContainer: {
//     marginTop: 20 * scale1,
//   },
//   logo: {
//     width: 80 * scale,
//     height: 80 * scale1,
//     resizeMode: 'contain',
//     marginTop: 60 * scale1,
//     marginLeft: 140 * scale,
//   },
//   contentText: {
//     fontSize: 14 * scale,
//     marginBottom: 6 * scale1,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   container: {
//     flex: 1,
//     padding: 20 * scale,
//   },
//   heading: {
//     fontSize: 24 * scale,
//     fontWeight: 'bold',
//     marginBottom: 20 * scale1,
//   },
//   radioContainer: {
//     flexDirection: 'row',
//     marginBottom: 20 * scale1,
//   },
//   radioOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 20 * scale,
//   },
//   radioText: {
//     marginLeft: 5 * scale,
//   },
//   container3: {
//     marginTop: 5 * scale,
//   },
//   content3: {
//     flexDirection: 'row',
//     marginTop: 5 * scale1,
//   },
//   label1: {
//     marginTop: 2 * scale1,
//     marginBottom: 2 * scale1,
//     fontWeight: 'bold',
//   },
//   input2: {
//     height: 42 * scale1,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10 * scale1,
//     paddingLeft: 10 * scale,
//   },
//   saveButton: {
//     backgroundColor: 'green',
//     padding: 15 * scale,
//     alignItems: 'center',
//     borderRadius: 5 * scale,
//     marginTop: 20 * scale1,
//   },
//   saveButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16 * scale,
//   },
//   flatList: {
//     maxHeight: 200 * scale1,
//   },
//   serialNumberItem: {
//     padding: 10 * scale,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   dropdownContainer: {
//     position: 'absolute',
//     top: 45 * scale1, // Adjust this value to control the position of the dropdown
//     left: 0,
//     right: 0,
//     backgroundColor: 'white',
//     borderWidth: 1,
//     borderColor: 'gray',
//     zIndex: 1000,
//   },
//   scrollContainer: {
//     paddingBottom: 60 * scale1, // To avoid overlapping the button
//   },
//   icon: {
//     height: 30 * scale1,
//     width: 32 * scale,
//   },
//   deleteContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10 * scale1,
//   },
//   deleteButton: {
//     backgroundColor: 'red',
//     paddingVertical: 10 * scale1,
//     paddingHorizontal: 20 * scale,
//     borderRadius: 5 * scale,
//     marginRight: 10 * scale,
//   },
//   deleteButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   reasonInput: {
//     width: '100%',
//     height: 40 * scale1,
//     borderColor: 'gray',
//     borderWidth: 1,
//     paddingHorizontal: 10 * scale,
//     borderRadius: 5 * scale,
//     marginBottom: 20 * scale1,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: 'white',
//     padding: 20 * scale,
//     borderRadius: 10 * scale,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 18 * scale,
//     fontWeight: 'bold',
//     marginBottom: 20 * scale1,
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   cancelButton: {
//     flex: 1,
//     backgroundColor: 'gray',
//     paddingVertical: 10 * scale1,
//     paddingHorizontal: 20 * scale,
//     borderRadius: 5 * scale,
//     marginRight: 10 * scale,
//   },
//   cancelButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   deleteButton: {
//     flex: 1,
//     backgroundColor: 'red',
//     paddingVertical: 10 * scale1,
//     paddingHorizontal: 20 * scale,
//     borderRadius: 5 * scale,
//   },
//   deleteButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   scanIcon: {
//     width: 28 * scale,
//     height: 35 * scale1,
//     marginLeft: 4 * scale,
//     resizeMode: 'contain',
//     // Additional styles for icon image
//   },
//   scanbutton: {
//     marginLeft: 2 * scale,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: '#333',
//   },
//   value: {
//     fontSize: 16,
//     marginBottom: 2,
//     color: '#555',
//   },
//   button: {
//     backgroundColor: '#007bff',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 5,
//     marginTop: 4,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainradio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10 * scale1,
  },
  radiotype: {
    fontSize: 16 * scale,
    fontWeight: 'bold',
    marginRight: 10 * scale,
    color: '#7d7d7d',
  },
  radioOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // radioButton: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginRight: 10 * scale,
  // },
  // radioText: {
  //   marginLeft: 1 * scale,
  //   color: '#7d7d7d',
  // },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20 * scale1,
  },
  headerItem: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 5 * scale1,
  },
  headerText: {
    fontSize: 16 * scale,
    fontWeight: 'bold',
    color: 'black',
  },
  activeHeaderItem: {
    borderColor: 'red',
    borderWidth: 1,
  },
  activeHeaderText: {
    color: 'red',
  },
  section: {
    marginBottom: 10 * scale1,
  },

  inputContainer: {
    position: 'relative',
    marginBottom: 12 * scale1,
  },
  placeholder: {
    position: 'absolute',
    left: 0,
    top: 15 * scale1,
    fontSize: 16 * scale,
    color: '#999',
    zIndex: -1,
  },
  placeholderActive: {
    top: -3 * scale1,
    fontSize: 12 * scale,
    color: '#333',
  },
  // button: {
  //   backgroundColor: 'red',
  //   padding: 10 * scale,
  //   borderRadius: 5 * scale,
  //   alignItems: 'center',
  //   marginTop: 10 * scale1,
  // },
  // buttonText: {
  //   color: 'white',
  //   fontWeight: 'bold',
  // },
  showButton: {
    position: 'absolute',
    right: 0,
    top: 15 * scale1,
  },
  resendButton: {
    backgroundColor: 'blue',
    padding: 8 * scale,
    borderRadius: 5 * scale,
    marginTop: 10 * scale1,
  },
  resendButtonText: {
    color: 'white',
    fontSize: 16 * scale,
    textAlign: 'center',
  },
  resendText: {
    textAlign: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20 * scale1,
  },
  // label: {
  //   fontSize: 16 * scale,
  //   marginBottom: 5 * scale1,
  //   marginTop: 10 * scale1,
  // },
  input1: {
    color: 'black',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5 * scale,
    padding: 10 * scale1,
    marginBottom: 10 * scale1,
    width: 300 * scale,
  },
  input: {
    color: 'black',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5 * scale,
    padding: 10 * scale1,
    marginBottom: 10 * scale1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchbutton: {
    backgroundColor: '#00bfff',
    paddingVertical: 10 * scale1,
    paddingHorizontal: 15 * scale,
    borderRadius: 5 * scale,
    marginLeft: 6 * scale,
    marginBottom: 8 * scale1,
  },
  searchbuttontext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24*scale1,
  },
  image: {
    width: '100%',
    height: 200 * scale1,
    resizeMode: 'cover',
    marginBottom: 10 * scale1,
  },
  // button: {
  //   backgroundColor: '#a9a9a9',
  //   paddingVertical: 12 * scale1,
  //   paddingHorizontal: 12 * scale,
  //   borderRadius: 5 * scale,
  //   marginBottom: 10 * scale1
  // },
  // buttonText: {
  //   color: 'white',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  submit: {
    backgroundColor: 'red',
    paddingVertical: 12 * scale1,
    paddingHorizontal: 12 * scale,
    borderRadius: 5 * scale,
    marginBottom: 10 * scale1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10
  },
  submitText: {
    fontSize: 16 * scale1,
    color: 'white',
    fontWeight: 'bold',
  },
  radioGroup: {
    flexDirection: 'row',
  },
  radioButton: {
    backgroundColor: '#eee',
    paddingVertical: 10*scale1,
    paddingHorizontal: 20*scale,
    borderRadius: 5*scale,
    marginRight: 10*scale1,
  },
  radioText: {
    fontSize: 16*scale1,
  },
  selected: {
    backgroundColor: 'lightblue',
  },
  dropdown: {
    backgroundColor: '#ffffff', // Background color
    borderWidth: 1*scale, // Border width
    borderColor: '#cccccc', // Border color
    borderRadius: 5*scale, // Border radius
    marginTop: 10*scale1, // Margin top
    maxHeight: 200*scale1, // Max height of the dropdown to enable scrolling if needed
    overflow: 'hidden', // Ensure content does not overflow
  },
  dropdownItem: {
    padding: 10*scale, // Padding for each dropdown item
    fontSize: 16*scale1, // Font size of dropdown item text
  },
  uploadText: {
    backgroundColor: 'gray',
  },
  uploadedText: {
    backgroundColor: 'green',
  },
  uploadText1: {
    backgroundColor: 'gray',
  },
  uploadedText1: {
    backgroundColor: 'green',
  },
  warningText: {
    color: 'red',
    marginTop: -3*scale1,
  },
  container1: {
    flexDirection: 'row',
    borderWidth: 2*scale,
    borderColor: '#ccc',
    padding: 10*scale,
    marginVertical: 0*scale1,
    alignItems: 'center',
    borderRadius: 10*scale,
  },
  checkbox: {
    marginRight: 10*scale,
  },
  detailsContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  leftColumn: {
    flex: 1,
    fontWeight: 'bold',
  },
  rightColumn: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10*scale1,
    fontSize:16*scale1
  },
  detail: {
    marginBottom: 10*scale1,
    fontSize:16*scale1
  },
  inputRow: {
    marginBottom: 5 * scale1,
  },
  textinput1: {
    borderWidth: 1,
    paddingHorizontal: 8 * scale,
    paddingVertical: 3 * scale,
    marginTop: 10 * scale1,
  },
  textinput2: {
    marginTop: 15 * scale1,
    marginLeft: 15 * scale,
    borderWidth: 1,
    fontSize: 16 * scale,
    width: 350 * scale,
    paddingHorizontal: 8 * scale,
    paddingVertical: 6 * scale1,
    borderRadius: 5 * scale,
    color: 'black',
  },
  stateListContainer: {
    maxHeight: 100 * scale1,
    marginBottom: 10 * scale1,
    marginLeft: 25 * scale,
    backgroundColor: 'white',
  },
  itemContainer: {
    paddingVertical: 10*scale1,
    paddingHorizontal: 15*scale,
    borderBottomWidth: 1*scale1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontWeight: 'bold',
  },
  contentContainer: {
    marginTop: 20 * scale1,
  },
  logo: {
    width: 80 * scale,
    height: 80 * scale1,
    resizeMode: 'contain',
    marginTop: 60 * scale1,
    marginLeft: 140 * scale,
  },
  contentText: {
    fontSize: 14 * scale,
    marginBottom: 6 * scale1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 20*scale,
  },
  heading: {
    fontSize: 24*scale,
    fontWeight: 'bold',
    marginBottom: 20*scale1,
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 20*scale1,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20*scale,
  },
  radioText: {
    marginLeft: 5*scale,
  },
  container3: {
    marginTop: 5*scale,
  },
  content3: {
    flexDirection: 'row',
    marginTop: 5*scale1,
  },
  label1: {
    marginTop: 2*scale1,
    marginBottom: 2*scale1,
    fontWeight: 'bold',
  },
  input2: {
    height: 42*scale1,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10*scale1,
    paddingLeft: 10*scale,
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 15*scale,
    alignItems: 'center',
    borderRadius: 5*scale,
    marginTop: 20*scale1,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16*scale,
  },
  flatList: {
    maxHeight: 200*scale1,
  },
  serialNumberItem: {
    padding: 10*scale,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 45*scale1, // Adjust this value to control the position of the dropdown
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    zIndex: 1000,
  },
  scrollContainer: {
    paddingBottom: 60*scale1, // To avoid overlapping the button
  },
  icon:{
    height:30*scale1,
    width:32*scale
  },
  deleteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10*scale1,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 10*scale1,
    paddingHorizontal: 20*scale,
    borderRadius: 5*scale,
    marginRight: 10*scale,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  reasonInput: {
    width: '100%',
    height: 40*scale1,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10*scale,
    borderRadius: 5*scale,
    marginBottom: 20*scale1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20*scale,
    borderRadius: 10*scale,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18*scale,
    fontWeight: 'bold',
    marginBottom: 20*scale1,
  },modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'gray',
    paddingVertical: 10*scale1,
    paddingHorizontal: 20*scale,
    borderRadius: 5*scale,
    marginRight: 10*scale,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: 'red',
    paddingVertical: 10*scale1,
    paddingHorizontal: 20*scale,
    borderRadius: 5*scale,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scanIcon: {
    width: 28*scale,
    height: 35*scale1,
    marginLeft:4*scale,
    resizeMode: 'contain',
    // Additional styles for icon image
  },
  scanbutton: {
    marginLeft:2*scale,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  value: {
    fontSize: 16,
    marginBottom: 2,
    color: '#555',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop:10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop:4
  }
});

export default AddCarryInService;
