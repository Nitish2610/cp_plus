// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert,TouchableOpacity,Image ,Dimensions,ActivityIndicator} from 'react-native';
// const { width, height } = Dimensions.get('window');
// const scale = width / 411.4285;
// const scale1= height/826;

// const FormPage = ({navigation,route}) => {
//   const {username,token} = route.params;
//   const [serialNumber, setSerialNumber] = useState('');
//   const [purchaseDate, setPurchaseDate] = useState('');
//   const [productDescription, setProductDescription] = useState('');
//   const [productImage, setProductImage] = useState('');
//   const [proofImage, setProofImage] = useState('');
//   const [stickerImage, setStickerImage] = useState('');

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = () => {
//     if(!serialNumber)
//     {
//       Alert.alert('Serial number is required');
//     }
//     // Handle form submission here
//     console.log({
//       serialNumber,
//       purchaseDate,
//       productDescription,
//       productImage,
//       proofImage,
//       stickerImage,
//     });
//     // You can perform form validation and submission logic here
//   };

//   const handlesearch = async () =>{
//     try {
//       setLoading(true);
//       const response = await fetch('http://devservice.adityagroup.com/aditya_service/rma/CPPartner/GetSerialData/',{
//         method:'POST',
//         headers:{
//           'Content-type':'application/json'
//         },
//         body:JSON.stringify({
//           username:username,
//           token:token,
//           serial:serialNumber
//         })
//       })
//       console.log('Response Status',response.status);
//      const result = await response.json();
//      console.log('Response Content:', result);
//     //  console.log(result.Listdate[0].materialdescription);
//      if(result.retstatus.status==1)
//      {
//       setProductDescription(result.Listdate[0].materialdescription);
//      }
//      else if(result.retstatus.status==222){
//       setProductDescription('');
//        Alert.alert(result.retstatus.message);
//      }
//      } catch (error) {
//        console.log("Error fetching data",error);
//      }finally{
//       setLoading(false);
//      }
//   }

//   return (
//     <View style={styles.container}>
//       {loading && (
//         <View style={styles.loader}>
//           <ActivityIndicator size="large" color="#0000ff" />
//         </View>
//       )}
//       <Text style={styles.label}>Serial Number:</Text>
//       <View style={styles.inputContainer}>
//       <TextInput
//         style={styles.input1}
//         value={serialNumber}
//         onChangeText={(text)=>setSerialNumber(text)}
//       />
//       <TouchableOpacity onPress={handlesearch} style={styles.searchbutton}>
//         <Text style={styles.searchbuttontext}>Search</Text>
//       </TouchableOpacity>
//       </View>

//       <Text style={styles.label}>Product Description:</Text>
//       <TextInput
//         style={styles.input}
//         value={productDescription}
//         onChangeText={setProductDescription}
//         editable={false}
//       />

//       <Text style={styles.label}>Date of Purchase:</Text>
//       <TextInput
//         style={styles.input}
//         value={purchaseDate}
//         onChangeText={setPurchaseDate}
//       />

//       <Text style={styles.label}>Product Image:</Text>
//       <TextInput
//         style={styles.input}
//         value={productImage}
//         onChangeText={setProductImage}
//       />

//       <Text style={styles.label}>Proof of Purchase:</Text>
//       <TextInput
//         style={styles.input}
//         value={proofImage}
//         onChangeText={setProofImage}
//       />

//       <Text style={styles.label}>Serial Sticker Image:</Text>
//       <TextInput
//         style={styles.input}
//         value={stickerImage}
//         onChangeText={setStickerImage}
//       />

//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20*scale1,
//   },
//   label: {
//     fontSize: 16*scale,
//     marginBottom: 5*scale1,
//   },
//   input1: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5*scale,
//     padding: 10*scale1,
//     marginBottom: 10*scale1,
//     width:300*scale
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5*scale,
//     padding: 10*scale1,
//     marginBottom: 10*scale1
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   searchbutton:{
//     backgroundColor: 'blue',
//     paddingVertical: 15*scale1,
//     paddingHorizontal: 15*scale,
//     borderRadius: 5*scale,
//     marginLeft:4*scale,
//     marginBottom:8*scale1
//   },
//   searchbuttontext:{
//     color: 'white',
//     fontWeight: 'bold'
//   }

// });

// export default FormPage;

//-----------------------------------
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, Image, Platform, StyleSheet } from 'react-native';
// import ImagePicker from 'react-native-image-picker';

// const YourComponent = () => {
//   const [productImage, setProductImage] = useState(null);
//   const [proofImage, setProofImage] = useState(null);
//   const [stickerImage, setStickerImage] = useState(null);

//   const selectImage = (fieldName) => {
//     const options = {
//       title: 'Select Image',
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };

//     ImagePicker.showImagePicker(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else {
//         // Set the selected image based on the field name
//         switch (fieldName) {
//           case 'product':
//             setProductImage(response.uri);
//             break;
//           case 'proof':
//             setProofImage(response.uri);
//             break;
//           case 'sticker':
//             setStickerImage(response.uri);
//             break;
//           default:
//             break;
//         }
//       }
//     });
//   };

//   const handleSubmit = () => {
//     // Handle form submission
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Product Image:</Text>
//       <Button title="Choose from Gallery or Take Photo" onPress={() => selectImage('product')} />
//       {productImage && <Image source={{ uri: productImage }} style={styles.image} />}

//       <Text style={styles.label}>Proof of Purchase:</Text>
//       <Button title="Choose from Gallery or Take Photo" onPress={() => selectImage('proof')} />
//       {proofImage && <Image source={{ uri: proofImage }} style={styles.image} />}

//       <Text style={styles.label}>Serial Sticker Image:</Text>
//       <Button title="Choose from Gallery or Take Photo" onPress={() => selectImage('sticker')} />
//       {stickerImage && <Image source={{ uri: stickerImage }} style={styles.image} />}

//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     resizeMode: 'cover',
//     marginBottom: 10,
//   },
// });

// export default YourComponent;

//-------------------------------
// import React, { useState } from 'react';
// import { View, Text, Button, Image, StyleSheet } from 'react-native';
// import * as ImagePicker from 'react-native-image-picker';

// const YourComponent = () => {
//   const [productImage, setProductImage] = useState(null);
//   const [proofImage, setProofImage] = useState(null);
//   const [stickerImage, setStickerImage] = useState(null);

//   const selectImage = (fieldName) => {
//     ImagePicker.launchImageLibrary({}, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else {
//         // Set the selected image based on the field name
//         switch (fieldName) {
//           case 'product':
//             setProductImage(response.uri);
//             break;
//           case 'proof':
//             setProofImage(response.uri);
//             break;
//           case 'sticker':
//             setStickerImage(response.uri);
//             break;
//           default:
//             break;
//         }
//       }
//     });
//   };

//   const handleCameraLaunch = () => {
//     const options = {
//       mediaType: 'photo',
//       includeBase64: false,
//       maxHeight: 2000,
//       maxWidth: 2000,
//     };

//     launchCamera(options, handleResponse);
//   };

//   const handleResponse = (response) => {
//     if (response.didCancel) {
//       console.log('User cancelled image picker');
//     } else if (response.error) {
//       console.log('Image picker error: ', response.error);
//     } else {
//       let imageUri = response.uri || response.assets?.[0]?.uri;
//       setSelectedImage(imageUri);
//     }
//   };

//   const handleSubmit = () => {
//     // Handle form submission
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Product Image:</Text>
//       <Button title="Choose from Gallery" onPress={() => selectImage('product')} />
//       <Button title="Open Camera" onPress={handleCameraLaunch} />
//       {productImage && <Image source={{ uri: productImage }} style={styles.image} />}

//       <Text style={styles.label}>Proof of Purchase:</Text>
//       <Button title="Choose from Gallery" onPress={() => selectImage('proof')} />
//       <Button title="Open Camera" onPress={handleCameraLaunch} />
//       {proofImage && <Image source={{ uri: proofImage }} style={styles.image} />}

//       <Text style={styles.label}>Serial Sticker Image:</Text>
//       <Button title="Choose from Gallery" onPress={() => selectImage('sticker')} />
//       <Button title="Open Camera" onPress={handleCameraLaunch} />
//       {stickerImage && <Image source={{ uri: stickerImage }} style={styles.image} />}

//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     resizeMode: 'cover',
//     marginBottom: 10,
//   },
// });

// export default YourComponent;

//--------------------

// import React, { useState } from 'react';
// import { View, Text, Button, Image, StyleSheet } from 'react-native';
// import * as ImagePicker from 'react-native-image-picker';

// const YourComponent = () => {
//   const [productImage, setProductImage] = useState(null);
//   const [proofImage, setProofImage] = useState(null);
//   const [stickerImage, setStickerImage] = useState(null);

//   const selectImage = (fieldName) => {
//     const options = {
//       mediaType: 'photo',
//       includeBase64: false,
//       maxHeight: 2000,
//       maxWidth: 2000,
//     };

//     ImagePicker.launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else {
//         // Set the selected image based on the field name
//         switch (fieldName) {
//           case 'product':
//             setProductImage(response.uri);
//             break;
//           case 'proof':
//             setProofImage(response.uri);
//             break;
//           case 'sticker':
//             setStickerImage(response.uri);
//             break;
//           default:
//             break;
//         }
//       }
//     });
//   };

//   const handleCameraLaunch = (fieldName) => {
//     const options = {
//       mediaType: 'photo',
//       includeBase64: false,
//       maxHeight: 2000,
//       maxWidth: 2000,
//     };

//     ImagePicker.launchCamera(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled camera');
//       } else if (response.error) {
//         console.log('Camera Error: ', response.error);
//       } else {
//         // Set the selected image based on the field name
//         switch (fieldName) {
//           case 'product':
//             setProductImage(response.uri);
//             break;
//           case 'proof':
//             setProofImage(response.uri);
//             break;
//           case 'sticker':
//             setStickerImage(response.uri);
//             break;
//           default:
//             break;
//         }
//       }
//     });
//   };

//   const handleSubmit = () => {
//     // Handle form submission
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Product Image:</Text>
//       <Button title="Choose from Gallery" onPress={() => selectImage('product')} />
//       <Button title="Open Camera" onPress={() => handleCameraLaunch('product')} />
//       {productImage && <Image source={{ uri: productImage }} style={styles.image} />}

//       <Text style={styles.label}>Proof of Purchase:</Text>
//       <Button title="Choose from Gallery" onPress={() => selectImage('proof')} />
//       <Button title="Open Camera" onPress={() => handleCameraLaunch('proof')} />
//       {proofImage && <Image source={{ uri: proofImage }} style={styles.image} />}

//       <Text style={styles.label}>Serial Sticker Image:</Text>
//       <Button title="Choose from Gallery" onPress={() => selectImage('sticker')} />
//       <Button title="Open Camera" onPress={() => handleCameraLaunch('sticker')} />
//       {stickerImage && <Image source={{ uri: stickerImage }} style={styles.image} />}

//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     resizeMode: 'cover',
//     marginBottom: 10,
//   },
// });

// export default YourComponent;

//+++++++++++++++++++++++++++

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNFS from 'react-native-fs';
const {width, height} = Dimensions.get('window');
import * as ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import Scanner from '../Screens/Scanner';
const scale = width / 411.4285;
const scale1 = height / 826;

const Productregistration = ({navigation, route}) => {
  const {username, token} = route.params;
  const [serialNumber, setSerialNumber] = useState('');

  const [productDescription, setProductDescription] = useState('');

  const [loading, setLoading] = useState(false);

  const [productImage, setProductImage] = useState(null);
  const [proofImage, setProofImage] = useState(null);
  const [stickerImage, setStickerImage] = useState(null);

  const [purchaseDate, setPurchaseDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [itemCode, setItemCode] = useState(false);
  const [warranty, setWarranty] = useState('');

  const convertFileToBase64 = async uri => {
    try {
      if (!uri) {
        throw new Error('URI is undefined');
      }
      // const extension = uri.split('.').pop().toLowerCase();
      // const resizedImageUri = await ImageResizer.createResizedImage(uri, 800, 600, extension.toUpperCase(), 80);

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
      // Construct data URI
      // const base64DataUri = `data:image/${extension};base64,${fileContent}`;

      const base64DataUri = `data:image/jpeg;base64,${fileContent}`;
      return base64DataUri;
    } catch (error) {
      console.error('Error converting file to base64:', error);
      return null;
    }
  };

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      setShowDatePicker(false);
      setPurchaseDate(selectedDate.toISOString().split('T')[0]);
    } else {
      setShowDatePicker(false);
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
        await checkImageSize(uri, fieldName, base64Image);
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
        await checkImageSize(uri, fieldName, base64Image);
      }
    });
  };

  const checkImageSize = async (uri, fieldName, base64Image) => {
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
            setProductImage({uri, base64: base64Image});
            break;
          case 'proof':
            setProofImage({uri, base64: base64Image});
            break;
          case 'sticker':
            setStickerImage({uri, base64: base64Image});
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.log('Error checking image size:', error);
    }
  };


  const handleConfirm = () => {
    // Handle confirm action
    navigation.navigate('ProductClaimRequest',{token: token,username: username,serialNumber:serialNumber})
  };

  const handleSubmit = async () => {
    // console.log(productImage)
    // console.log('Submitting form with the following data:');
    // console.log('Username:', username);
    // console.log('Token:', token);
    // console.log('Serial Number:', serialNumber);
    // console.log('Item Code:', itemCode);
    // console.log('Purchase Date:', purchaseDate);
    // console.log('Product Description:', productDescription);
    // console.log('Product Image (Base64):', productImage.base64);
    // console.log('Proof of Purchase (Base64):', productImage.base64);
    // console.log('Serial Sticker Image (Base64):',  stickerImage.base64);

    if (!productImage || !proofImage || !stickerImage) {
      Alert.alert('Please select images for all fields');
    }
    if (!purchaseDate) {
      Alert.alert('Please select a date');
    }
    if (!serialNumber) {
      Alert.alert('Serial number is required');
    } else {
      try {
        setLoading(true);
        const response = await fetch(
          'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISProductSave/',
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              token: token,
              SerialNo: serialNumber,
              itemcode: itemCode,
              warranty: warranty,
              PurchaseDate: purchaseDate,
              productDescription: productDescription,
              ProductImage: productImage.base64,
              ProofofPurchase: proofImage.base64,
              SerialStickerImage: stickerImage.base64,
            }),
          },
        );
        console.log('Response Status', response.status);
        const result = await response.json();
        console.log('Response Content:', result);

        if (result.success == 1) {
          // Alert.alert(result.message);
          // setTimeout(() => {
          navigation.navigate('Myproduct', {username: username, token: token});
          // }, 2000);
        } else if (result.success == 0) {
          Alert.alert(result.message);
        }
      } catch (error) {
        // console.error('Error:', error);
        Alert.alert('An error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    // Handle form submission here
    // console.log({
    //   serialNumber,
    //   purchaseDate,
    //   productDescription,
    //   productImage,
    //   proofImage,
    //   stickerImage,
    // });
    // You can perform form validation and submission logic here
  };

  const handlesearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISGetSerialData/',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            token: token,
            serial: serialNumber,
          }),
        },
      );
      console.log('Response Status', response.status);
      const result = await response.json();
      console.log('Response Content:', result);
      //  console.log(result.Listdate[0].materialdescription);
      if (result.retstatus.status == 1) {
        setProductDescription(result.Listdate[0].materialdescription);
        setItemCode(result.Listdate[0].materialcode);
        setWarranty(result.Listdate[0].warrantystatusdescription);
        // console.log(result.Listdate[0].materialcode);
      } else if (result.retstatus.status == 222) {
        setProductDescription('');
        // Alert.alert(result.retstatus.message);
        // const showAlert = (message) => {
          Alert.alert(
            result.retstatus.message,
            'Do you want to claim this product?',
            [
              {
                text: 'Cancel',
                // onPress: handleCancel,
                // style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: handleConfirm,
              },
            ],
            { cancelable: false }
          );
        // };
      
      }
    } catch (error) {
      // console.log('Error fetching data', error);
      Alert.alert('Network Error');
    } finally {
      setLoading(false);
    }
  };

  // const getFileExtension = uri => {
  //   const uriParts = uri.split('.');
  //   return uriParts[uriParts.length - 1];
  // };

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
  
  const handleScan = () =>{
    navigation.navigate('Scanner', {
      onScanComplete: (scannedSerialNumber) => {
        setSerialNumber(scannedSerialNumber);
      },
    });
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <Text style={styles.label}>Serial Number:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input1}
            value={serialNumber}
            onChangeText={text => setSerialNumber(text)}
          />
         <TouchableOpacity onPress={handleScan} style={styles.scanbutton}>
          <Image source={require('../Images/scanner_icon.png')} style={styles.scanIcon} />
        </TouchableOpacity>

          <TouchableOpacity onPress={handlesearch} style={styles.searchbutton}>
            <Text style={styles.searchbuttontext}>Search</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Warranty:</Text>
        <TextInput
          style={styles.input}
          value={warranty}
          onChangeText={setWarranty}
          editable={false}
        />

        <Text style={styles.label}>Product Description:</Text>
        <TextInput
          style={styles.input}
          value={productDescription}
          onChangeText={setProductDescription}
          editable={false}
        />

        <Text style={styles.label}>Date of Purchase:</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}>
          <Text>
            {purchaseDate
              ? new Date(purchaseDate).toLocaleDateString()
              : 'Select date'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={purchaseDate ? new Date(purchaseDate) : new Date()}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => showImageOptions('product')}>
          <Text style={styles.buttonText}>Add Product Image</Text>
        </TouchableOpacity>
        {productImage && (
          <Image source={{uri: productImage.uri}} style={styles.image} />
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => showImageOptions('proof')}>
          <Text style={styles.buttonText}>Add Proof of Purchase</Text>
        </TouchableOpacity>
        {proofImage && (
          <Image source={{uri: proofImage.uri}} style={styles.image} />
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => showImageOptions('sticker')}>
          <Text style={styles.buttonText}>Add Serial Sticker Image</Text>
        </TouchableOpacity>
        {stickerImage && (
          <Image source={{uri: stickerImage.uri}} style={styles.image} />
        )}

        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20 * scale1,
  },
  label: {
    fontSize: 16 * scale,
    marginBottom: 5 * scale1,
  },
  input1: {
    color: 'black',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5 * scale,
    padding: 10 * scale1,
    marginBottom: 10 * scale1,
    width: 280 * scale,
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
    paddingHorizontal: 10 * scale,
    borderRadius: 5 * scale,
    marginLeft: 2 * scale,
    marginBottom: 8 * scale1,
  },
  searchbuttontext: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200 * scale1,
    resizeMode: 'cover',
    marginBottom: 10 * scale1,
  },
  button: {
    backgroundColor: '#00bfff',
    paddingVertical: 12 * scale1,
    paddingHorizontal: 12 * scale,
    borderRadius: 5 * scale,
    marginBottom: 10 * scale1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submit: {
    backgroundColor: '#008000',
    paddingVertical: 12 * scale1,
    paddingHorizontal: 12 * scale,
    borderRadius: 5 * scale,
    marginBottom: 10 * scale1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    fontSize: 16 * scale1,
    color: 'white',
    fontWeight: 'bold',
  },
  scanIcon: {
    width: 28*scale,
    height: 35*scale1,
    resizeMode: 'contain',
    // Additional styles for icon image
  },
  scanbutton: {
    margin:2*scale,
  }
});

export default Productregistration;
