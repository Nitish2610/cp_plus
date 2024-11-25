// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import {Picker} from '@react-native-picker/picker';
// import DateTimePicker from '@react-native-community/datetimepicker';

// const Installationrequest = ({navigation, route}) => {
//   const {username, token, userData} = route.params;
//   const [product, setProduct] = useState('');
//   const [callbackDate, setCallbackDate] = useState('');
//   const [callbackTime, setCallbackTime] = useState('');
//   const [addressType, setAddressType] = useState('');
//   const [addressDetails, setAddressDetails] = useState('');
//   const [showAddressDetails, setShowAddressDetails] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const handleSaveAddress = () => {
//     // Handle saving address logic here
//     console.log('Address Saved:', addressDetails);
//   };

//   const handleCancel = () => {
//     // Handle cancel logic here
//     setAddressDetails('');
//     setShowAddressDetails(false);
//   };

//   const onChange = (event, selectedDate) => {
//     if (selectedDate) {
//       setShowDatePicker(false);
//       setCallbackDate(selectedDate.toISOString().split('T')[0]);
//     } else {
//       setShowDatePicker(false);
//     }
//   };

//   const today = new Date();
//   // const formattedToday = today.toISOString().split('T')[0];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Please select your product</Text>
//       {/* <TextInput
//         style={styles.input}
//         placeholder="Enter product"
//         value={product}
//         onChangeText={setProduct}
//       /> */}
//      <View style={styles.pickerContainer}>
//       <Picker
//         selectedValue={product}
//         onValueChange={itemValue=>setProduct(itemValue)}>
//           <Picker.Item label="Select product" value="" />
//           <Picker.Item label="DVR" value="DVR" />
//           <Picker.Item label="MVR" value="MVR" />
//           <Picker.Item label="Router" value="Router" />
//         </Picker>
//      </View>

//       <Text style={styles.label}>Preferred callback date</Text>
//       {/* <TextInput
//         style={styles.input}
//         placeholder="Enter callback date"
//         value={callbackDate}
//         onChangeText={setCallbackDate}
//       /> */}
//       <TouchableOpacity
//         style={styles.input}
//         onPress={() => setShowDatePicker(true)}>
//         <Text style={{top: 10}}>
//           {callbackDate
//             ? new Date(callbackDate).toLocaleDateString()
//             : 'Select date'}
//         </Text>
//       </TouchableOpacity>

//       {showDatePicker && (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={callbackDate ? new Date(callbackDate) : new Date()}
//           mode="date"
//           is24Hour={true}
//           display="default"
//           onChange={onChange}
//           minimumDate={today}
//         />
//       )}

//       <Text style={styles.label}>Preferred callback time</Text>
//       {/* <TextInput
//         style={styles.input}
//         placeholder="Enter callback time"
//         value={callbackTime}
//         onChangeText={setCallbackTime}
//       /> */}
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={callbackTime}
//           style={styles.picker}
//           onValueChange={itemValue => setCallbackTime(itemValue)}>
//           <Picker.Item label="Select preferred time" value="" />
//           <Picker.Item label="10 AM to 1 PM" value="10 AM to 1 PM" />
//           <Picker.Item label="1 PM to 4 PM" value="1 PM to 4 PM" />
//           <Picker.Item label="4 PM to 6 PM" value="4 PM to 6 PM" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>Please select address type</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={addressType}
//           style={styles.picker}
//           onValueChange={itemValue => {
//             setAddressType(itemValue);
//             setShowAddressDetails(itemValue !== '');
//           }}>
//           <Picker.Item label="Select address type" value="" />
//           <Picker.Item label="Home" value="home" />
//           <Picker.Item label="Apartment" value="apartment" />
//           <Picker.Item label="Business" value="business" />
//           <Picker.Item label="Other" value="other" />
//         </Picker>
//       </View>

//       {showAddressDetails && (
//         <>
//           <Text style={styles.label}>Address Details</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter address details"
//             value={addressDetails}
//             onChangeText={setAddressDetails}
//           />
//         </>
//       )}
//       <View style={styles.buttonContainer}>
//         <Button title="Save" onPress={handleSaveAddress} />
//         <Button title="Cancel" onPress={handleCancel} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 16,
//     paddingHorizontal: 8,
//   },
//   picker: {
//     height: 40,
//     width: '100%',
//     marginBottom: 16,
//     position: 'absolute',
//     top: -8,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   pickerContainer: {
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 4,
//     marginBottom: 10,
//     height: 40,
//     justifyContent: 'center',
//   },
// });

// export default Installationrequest;

//--------------------------------------------

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {RadioButton} from 'react-native-paper';
import publicIP from 'react-native-public-ip';

const InstallationRequest = ({navigation, route}) => {
  const {username, token, userData} = route.params;
  const [product, setProduct] = useState([]);
  const [callbackDate, setCallbackDate] = useState('');
  const [callbackTime, setCallbackTime] = useState('');
  const [addressType, setAddressType] = useState('');
  const [showAddressDetails, setShowAddressDetails] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [addressDetails, setAddressDetails] = useState({
    fullName: '',
    contactNumber: '',
    alternateMobileNumber: '',
    addressLine1: '',
    pincode: '',
    city: '',
    state: '',
    addressLine2: '',
    landmark: '',
    addressType: '',
  });
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [productList, setProductList] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // useEffect(() => {
  // }, [addressType, addressDetails]);
  // useEffect(() => {
  //   console.log('Address Type:', addressType);
  // }, [addressType]);

  // useEffect(() => {
  //   console.log('Address Details:', addressDetails);
  // }, [addressDetails]);

  let ip;
  useEffect(() => {
    const fetchPublicIP = async () => {
      try {
        ip = await publicIP();
        // console.log('IP address:', ip);
        // You can use 'ip' further in your code
      } catch (error) {
        console.error('Error while fetching public IP:', error);
        console.log(error.message);
      }
    };

    fetchPublicIP();
  });

  useEffect(() => {
    // console.log('Address Details:', addressDetails);
  }, [addressDetails]);

  useEffect(() => {
    fetchUserAddress();
    getProductList();
    // getCityState();
  }, []);

  const getCityState = async (pincode) =>{
    try {
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/GetCityStatePincode/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pincode: pincode,
          }),
        },
      );

      const result = await response.json();
      // console.log(result);

      if (result.retstatus.success == 1) {
        // setAddressDetails.city(result.Listdate[0].SCCity);
        // setAddressDetails.state(result.Listdate[0].SCState);
        setAddressDetails((prevDetails) => ({
          ...prevDetails,
          city: result.Listdate[0].city,
          state: result.Listdate[0].state,
        }));
      } else {
        // console.error('Error', result.error);
        Alert.alert('Error', 'No data found');
      }
    } catch (error) {
      // console.error('Error:', error);
      Alert.alert('An unexpected error occurred. Please try again later.');
    }
  }

  const getProductList = async () => {
    try {
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISGetProductList/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            MobileNo: userData.contact_no,
            token: token,
          }),
        },
      );

      const result = await response.json();
      // console.log(result);

      if (result.success == 1) {
        // Alert.alert(result.retstatus.message);
        Alert.alert(result.message);
        setProductList(result.Listdate);
      } else {
        // console.error('Error', result.error);
        Alert.alert('Error', 'No data found');
      }
    } catch (error) {
      // console.error('Error:', error);
      Alert.alert('An unexpected error occurred. Please try again later.');
    }
  };

  const fetchUserAddress = async () => {
    try {
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISGetAddressList/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            MobileNo: userData.contact_no,
            token: token,
          }),
        },
      );

      const result = await response.json();
      // console.log(result);

      if (result.success == 1) {
        // Alert.alert(result.retstatus.message);
        Alert.alert(result.message);
        setAddresses(result.Listdate);
      } else {
        // console.error('Error', result.error);
        Alert.alert('Error', 'No data found');
      }
    } catch (error) {
      // console.error('Error:', error);
      Alert.alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handleSaveAddress = async () => {
    try {
      // const userDetails = {
      //   username: username,
      //   MobileNo: addressDetails.contactNumber,
      //   FullName: addressDetails.fullName,
      //   AddressType: addressType,
      //   AddressLine1: addressDetails.addressLine1,
      //   AddressLine2: addressDetails.addressLine2,
      //   City: addressDetails.city,
      //   State: addressDetails.state,
      //   Pincode: addressDetails.pincode,
      //   token: token,
      //   AltMobileNo: addressDetails.alternateMobileNumber,
      //   Landmark: addressDetails.landmark,
      // };
      // console.log(userDetails);

      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISAddressSave/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            UserMobileNo: userData.contact_no,
            MobileNo: addressDetails.contactNumber,
            FullName: addressDetails.fullName,
            AddressType: addressDetails.addressType,
            AddressLine1: addressDetails.addressLine1,
            AddressLine2: addressDetails.addressLine2,
            City: addressDetails.city,
            State: addressDetails.state,
            Pincode: addressDetails.pincode,
            token: token,
            AltMobileNo: addressDetails.alternateMobileNumber,
            Landmark: addressDetails.landmark,
          }),
        },
      );

      const result = await response.json();
      console.log(result);

      if (result.success == 1) {
        // Alert.alert(result.retstatus.message);
        Alert.alert(result.message);
        await fetchUserAddress();
      } else {
        // console.error('Error', result.error);
        Alert.alert('Error', 'No data found');
      }
    } catch (error) {
      // console.error('Error:', error);
      Alert.alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handleCancel = () => {
    setAddressDetails({
      fullName: '',
      contactNumber: '',
      alternateMobileNumber: '',
      addressLine1: '',
      pincode: '',
      city: '',
      state: '',
      addressLine2: '',
      landmark: '',
      addressType: '',
    });
    setShowAddressDetails(false);
    setAddressType('');
  };

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      setShowDatePicker(false);
      setCallbackDate(selectedDate.toISOString().split('T')[0]);
    } else {
      setShowDatePicker(false);
    }
  };

  const today = new Date();

  const confirmDelete = index => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this address?',
      [
        {
          text: 'No',
          onPress: () => console.log('Delete cancelled'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => onDelete(index),
        },
      ],
      {cancelable: true},
    );
  };

  const onDelete = async index => {
    try {
      const addressToDelete = addresses[index];
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISRemoveAddress/', // Update with your actual delete API endpoint
        {
          method: 'POST', // or 'DELETE' based on your API
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            AddressId: addressToDelete.Id, // Assuming 'Id' is the identifier for the address
            token: token, // Assuming you need to send a token for authentication
          }),
        },
      );

      const result = await response.json();
      console.log(result);

      if (result.success === 1) {
        Alert.alert('Success', 'Address deleted successfully');
        // Remove the address from the local state
        setAddresses(prevAddresses =>
          prevAddresses.filter((_, i) => i !== index),
        );
      } else {
        Alert.alert('Error', 'Failed to delete the address');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('An unexpected error occurred. Please try again later.');
    }
  };


   const SaveInstallationRequest = async () =>{
    try {
      // if (selectedAddress === null || !addresses[selectedAddress] || !addresses[selectedAddress].Id) {
      //   Alert.alert("Please select a valid address before proceeding.");
      //   return;
      // }
      const selectedAddressId = selectedAddress !== null && addresses[selectedAddress] && addresses[selectedAddress].Id;
      // const selectedAddressId = addresses[selectedAddress].Id;
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISInstallationReqSave/', 
        {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            ProductType:product,
            CallBackDt:callbackDate,
            CallBackTime:callbackTime,
            AddressId:selectedAddressId,
            IPAddress:ip, 
            token: token, 
          }),
        },
      );

      const result = await response.json();
      console.log(result);

      if (result.success === 1) {
        Alert.alert(result.message);
      } else if(result.success==0) {
        Alert.alert(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('An unexpected error occurred. Please try again later.');
    }
   }

   const handlePincodeChange = (text) => {
    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      pincode: text,
    }));
    if (text.length === 6) {
      getCityState(text);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Please select your product</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={product}
            onValueChange={itemValue => setProduct(itemValue)}>
            <Picker.Item label="Select product" value="" />
            {productList.map(item => (
              <Picker.Item
                key={item.Id}
                label={item.ProductName}
                value={item.Id}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Preferred callback date</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}>
          <Text style={{top: 10,color:'black'}}>
            {callbackDate
              ? new Date(callbackDate).toLocaleDateString()
              : 'Select date'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={callbackDate ? new Date(callbackDate) : new Date()}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
            minimumDate={today}
          />
        )}

        <Text style={styles.label}>Preferred callback time</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={callbackTime}
            style={styles.picker}
            onValueChange={itemValue => setCallbackTime(itemValue)}>
            <Picker.Item label="Select preferred time" value="" />
            <Picker.Item label="10 AM to 1 PM" value="10 AM to 1 PM" />
            <Picker.Item label="1 PM to 4 PM" value="1 PM to 4 PM" />
            <Picker.Item label="4 PM to 6 PM" value="4 PM to 6 PM" />
          </Picker>
        </View>

        <Button
          title="Add Address"
          color="blue"
          onPress={() => setIsFormVisible(!isFormVisible)}
        />

        {isFormVisible && (
          <View style={{marginTop: 8}}>
            <Text style={styles.label}>Please select address type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={addressType}
                style={styles.picker}
                onValueChange={itemValue => {
                  setAddressType(itemValue);
                  setShowAddressDetails(itemValue !== '');
                  setAddressDetails(prevDetails => ({
                    ...prevDetails,
                    addressType: itemValue,
                  }));
                  console.log('Selected Address Type:', itemValue); // Log selected addressType
                  console.log('Address Details:', addressDetails);
                }}>
                <Picker.Item label="Select address type" value="" />
                <Picker.Item label="Home" value="home" />
                <Picker.Item label="Apartment" value="apartment" />
                <Picker.Item label="Business" value="business" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>

            {showAddressDetails && (
              <View>
                <Text style={styles.label}>Full Name*</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter contact person"
                  value={addressDetails.fullName}
                  onChangeText={text =>
                    setAddressDetails({...addressDetails, fullName: text})
                  }
                />

                <Text style={styles.label}>Contact Number*</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter contact number"
                  value={addressDetails.contactNumber}
                  onChangeText={text =>
                    setAddressDetails({...addressDetails, contactNumber: text})
                  }
                />

                <Text style={styles.label}>Alternate Mobile Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter alternate mobile number"
                  value={addressDetails.alternateMobileNumber}
                  onChangeText={text =>
                    setAddressDetails({
                      ...addressDetails,
                      alternateMobileNumber: text,
                    })
                  }
                />

                <Text style={styles.label}>
                  Flat,House no,Building,Company,Apartment*
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter address line 1"
                  value={addressDetails.addressLine1}
                  onChangeText={text =>
                    setAddressDetails({...addressDetails, addressLine1: text})
                  }
                />

                <Text style={styles.label}>Area,Street,Sector,Village*</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter state"
                  value={addressDetails.addressLine2}
                  onChangeText={text =>
                    setAddressDetails({...addressDetails, addressLine2: text})
                  }
                />

                {/* <Text style={styles.label}>Address Line 2</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter address line 2"
            value={addressDetails.addressLine2}
            onChangeText={text => setAddressDetails({ ...addressDetails, addressLine2: text })}
          /> */}

                <Text style={styles.label}>Pincode *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter pincode"
                  value={addressDetails.pincode}
                  // onChangeText={text =>
                  //   setAddressDetails({...addressDetails, pincode: text})
                  // }
                  onChangeText={handlePincodeChange}
                />

                <Text style={styles.label}>City *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter city"
                  value={addressDetails.city}
                  onChangeText={text =>
                    setAddressDetails({...addressDetails, city: text})
                  }
                />

                <Text style={styles.label}>State *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter state"
                  value={addressDetails.state}
                  onChangeText={text =>
                    setAddressDetails({...addressDetails, state: text})
                  }
                />

                <Text style={styles.label}>Landmark *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter state"
                  value={addressDetails.landmark}
                  onChangeText={text =>
                    setAddressDetails({...addressDetails, landmark: text})
                  }
                />

                <View style={styles.buttonContainer}>
                  <Button title="Save Address" onPress={handleSaveAddress} />
                  <Button title="Cancel" onPress={handleCancel} />
                </View>
              </View>
            )}
          </View>
        )}

        {addresses.length > 0 && (
          <View style={styles.container}>
            <Text style={styles.label}>Existing Addresses</Text>
            {addresses.map((address, index) => (
              <View key={index} style={styles.addressCard}>
                <View style={styles.radioContainer}>
                  <RadioButton
                    value={index}
                    status={selectedAddress === index ? 'checked' : 'unchecked'}
                    onPress={() => setSelectedAddress(index)}
                  />
                </View>
                <View style={styles.addressDetails}>
                  <Text style={styles.contactPerson}>{address.FullName}</Text>
                  <Text style={styles.contactNumber}>{address.MobileNo}</Text>
                  {address.AltMobileNo ? (
                    <Text style={styles.alternateMobileNumber}>
                      {address.AltMobileNo}
                    </Text>
                  ) : null}
                  <Text style={styles.addressLine}>{address.AddressLine1}</Text>
                  {address.AddressLine2 ? (
                    <Text style={styles.addressLine}>
                      {address.AddressLine2}
                    </Text>
                  ) : null}
                  <Text style={styles.cityStatePincode}>
                    {address.City}, {address.State}, {address.Pincode}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => confirmDelete(index)}>
                  <Image
                    source={require('../Images/delete1.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
       <View style={styles.buttonContainer1}>
        <Button
          title="Save"
          color="red"
          onPress={SaveInstallationRequest}
        />
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // paddingLeft: 16,
    // paddingRight: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#f9f9f9'
  },
  picker: {
    height: 40,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 4,
    marginBottom: 16,
  },
  addressDetails: {
    marginLeft: 16,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  icon: {
    height: 30,
    width: 32,
  },
  buttonContainer1: {
    marginTop: 20, // Adjust the value as needed
  }
});

export default InstallationRequest;
