// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import { RNCamera } from 'react-native-camera';

// const BarcodeScanner = () => {
//   const [scanned, setScanned] = useState(false);
//   const [serialData, setSerialData] = useState(null);

//   const handleBarCodeScanned = ({ data }) => {
//     setScanned(true);
//     setSerialData(data);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.cameraContainer}>
//         <RNCamera
//           style={styles.camera}
//           onBarCodeRead={scanned ? undefined : handleBarCodeScanned}
//           captureAudio={false}
//         />
//       </View>
//       {scanned && (
//         <View style={styles.barcodeDataContainer}>
//           <Text style={styles.barcodeDataText}>Serial Data: {serialData}</Text>
//           <Button title="Scan Again" onPress={() => setScanned(false)} />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cameraContainer: {
//     width: '80%', // Adjust the width of the camera container as needed
//     aspectRatio: 1, // Maintain a square aspect ratio for the camera
//     overflow: 'hidden',
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   camera: {
//     flex: 1,
//   },
//   barcodeDataContainer: {
//     alignItems: 'center',
//   },
//   barcodeDataText: {
//     fontSize: 20,
//     marginBottom: 10,
//   },
// });

// export default BarcodeScanner;

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Dimensions ,ScrollView,ActivityIndicator,Alert,Modal} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { TextInput } from 'react-native-paper';

const {width, height} = Dimensions.get('window');
const scale = width / 411.4285;
const scale1 = height / 826;

const BarcodeScanner = ({navigation,route}) => {
  const {token,username} = route.params;
  const [scanned, setScanned] = useState(false);
  const [serialData, setSerialData] = useState(null);
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [warrantyDetails, setWarrantyDetails] = useState(null);
  

  useEffect(() => {
    if (scanned) {
      setTimeout(() => setScanned(false), 3000); // Reset scanned state after 3 seconds
    }
  }, [scanned]);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setSerialData(data);
  };

  const searchserialno = async () =>{
    try{
      setLoading(true);
      const response = await fetch('https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISWarrantyCheck/',
      {
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify({
          username:username,
          SerialNo:serialData,
          token:token
        }),
      },
      )
      console.log('Response Status',response.status);
      const result = await response.json();
      console.log('Response Content:', result);

      if(result.success==1){
        // const listitem = result.Listdate[0];
        // const alertmessage = `Product Name: ${listitem.materialdescription}\n\nSerial Number: ${listitem.serialno}\n\nLocation: ${listitem.salelocation}\n\nStatus: ${listitem.warrantystatusdescription}\n\nNotes: ${listitem.notes}`
        //  Alert.alert('SN Warranty Information', alertmessage);
        setWarrantyDetails(result.Listdate[0]);
        setModalVisible(true);
      }else if(result.success==0){
        Alert.alert('No Serial Number Found');
      }
    }catch(error){
      // console.error('Error:', error);
      Alert.alert('An error occurred. Please try again later.');
    }finally{
      setLoading(false);
    }
}

  return (
    <ScrollView>
    <View style={styles.container}>
    {loading && (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )}
      <Text style={styles.headertext}>Check Warranty With Scanner</Text>
      <View style={styles.cameraContainer}>
        <RNCamera
          ref={cameraRef}
          style={styles.camera}
          onBarCodeRead={scanned ? undefined : handleBarCodeScanned}
          captureAudio={false}
        />
        {!scanned && (
          <View style={styles.squareBox}>
            <View style={styles.greenContainer}>
              <View style={styles.redLine} />
            </View>
          </View>
        )}
      </View>
      <Text style={styles.middletext}>Place a bar code inside the viewfinder rectangle to scan it.</Text>
      {/* {scanned && (
        <View style={styles.barcodeDataContainer}>
          <Text style={styles.barcodeDataText}>Serial Data: {serialData}</Text>
          <Button title="Scan Again" onPress={() => setScanned(false)} />
        </View>
      )} */}
      <View>
  <Text style={styles.bottomtext}>Check Warranty with Serial No.</Text>
  <TextInput
    style={styles.input}
    placeholder='Enter Serial No'
    value={serialData}
    onChangeText={(text) => setSerialData(text)}
  />
  <TouchableOpacity
    style={styles.button}
    onPress={searchserialno}
  >
    <Text style={styles.buttonText}>Search</Text>
  </TouchableOpacity>
  <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      {/* Show the warranty information here */}
      {warrantyDetails && (
      <View style={styles.detailsContainer}>
        <Text style={styles.headertextserialno}>SN Warranty Information</Text>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Product Name:</Text>
        <Text style={styles.detailText}>{warrantyDetails.materialdescription}</Text>
      </View>
      <View style={styles.horizontalLine}></View> 
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Serial Number:</Text>
        <Text style={styles.detailText}>{warrantyDetails.serialno}</Text>
      </View>
      <View style={styles.horizontalLine}></View> 
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Location:</Text>
        <Text style={styles.detailText}>{warrantyDetails.salelocation}</Text>
      </View>
      <View style={styles.horizontalLine}></View> 
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Status:</Text>
        <Text style={styles.detailText}>{warrantyDetails.warrantystatusdescription}</Text>
      </View>
      <View style={styles.horizontalLine}></View> 
      <View style={styles.detailRow}>
        {/* <Text style={styles.detailLabel}>Notes:</Text> */}
        <View style={styles.noteContainer}>
          <Text style={styles.noteLabel}>Note:</Text>
          <View style={styles.noteBox}>
            <Text style={styles.noteText}>{warrantyDetails.notes}</Text>
          </View>
        </View>
      </View>
    </View>
    
    )}
      {/* Add a close button or any other UI element to close the modal */}
      <Button title="Close" onPress={() => setModalVisible(false)} />
    </View>
  </View>
</Modal>
</View>

    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40*scale1,
  },
  headertext:{
  marginBottom:10*scale1,
  fontWeight:'bold'
  },
  cameraContainer: {
    width: '80%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10*scale,
    backgroundColor: '#000'
  },
  camera: {
    flex: 1
  },
  middletext:{
    marginTop:10*scale1,
    color:'red',
    fontSize:13*scale,
    fontWeight:'bold'
  },
  squareBox: {
    position: 'absolute',
    top: '20%',
    left: '13%',
    width: '75%',
    height: '60%',
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden'
  },
  greenContainer: {
    position: 'absolute',
    top: -3*scale1, 
    left: -3*scale, 
    right: -3*scale,
    bottom: -3*scale1, 
    borderWidth: 5,
    borderColor: 'green'
  },
  redLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 2*scale1,
    backgroundColor: 'red',
  },
  barcodeDataContainer: {
    alignItems: 'center',
    marginTop: 20*scale1,
  },
  barcodeDataText: {
    fontSize: 20*scale,
    marginBottom: 10*scale1,
  },
  bottomtext: {
    fontSize: 16*scale,
    fontWeight: 'bold',
    marginTop: 30*scale1,
    marginLeft:10*scale
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5*scale,
    padding: 1,
    marginTop:5*scale1,
    marginBottom: 10*scale1,
    fontSize: 16*scale,
    width:250*scale
  },
  button: {
    backgroundColor: 'blue',
    padding: 10*scale,
    borderRadius: 5*scale,
    width:250*scale
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16*scale,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30*scale,
    borderTopLeftRadius: 20*scale,
    borderTopRightRadius: 20*scale,
    width: '100%',
    height: '70%', // Adjust the maximum height as needed
  },
  detailsContainer: {
    paddingHorizontal: 20*scale,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20*scale1,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 10*scale,
    width: '30%', 
    fontSize:16*scale
  },
  detailText: {
    width: '60%', 
    color:'blue',
    fontSize:16*scale
  },
  headertextserialno:{
    fontSize:20*scale,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:30*scale1,
    textDecorationLine: 'underline'
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '100%',
    marginBottom:10*scale1
  },
  noteContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  noteLabel: {
    fontWeight: 'bold',
    marginBottom: -20*scale1,
    color:'red',
    zIndex:1,
    marginLeft:2*scale
  },
  noteBox: {
    backgroundColor: '#fafad2', // Change to your desired color
    padding: 10*scale,
    marginTop: 5*scale1,
  },
  // noteBox: {
  //   backgroundColor: '#E6E6E6', // Change to your desired color
  //   marginTop: 5,
  // },
  noteText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize:16*scale
  },

});

export default BarcodeScanner;

