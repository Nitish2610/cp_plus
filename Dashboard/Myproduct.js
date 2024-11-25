// import React, { useState} from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

// const SimplePage = ({navigation}) => {
//   const [data, setData] = useState([]);

//   const handleAddRequest = () => {
//     navigation.navigate('Productregistration');
//   };

//   const handlefilter = () =>{
//     console.log('Filter button pressed');
//   }

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         title="Add Request"
//         onPress={handleAddRequest}
//         style={styles.addButton}>
//       <Text style={styles.addtext}>+ Add Request</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onpress={handlefilter} style={styles.filterButton}>
//         <Text style={styles.filterButtonText}>Filter</Text>
//       </TouchableOpacity>
//       <View style={styles.dataContainer}>

//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   addButton: {
//     position: 'absolute',
//     top: 10,
//     left:20,
//     width: 160,
//     backgroundColor:'lightblue',
//     padding:10,
//     borderRadius:5,
//     alignItems:'center'
//   },
//   addtext:{
//     fontSize:16
//   },
//   dataContainer: {
//     marginTop: 50,
//   },
//   dataItem: {
//     marginBottom: 10,
//     fontSize: 16,
//   },
//   filterButton:{
//     position:'absolute',
//     top:10,
//     right:10,
//     backgroundColor: '#DDDDDD',
//     padding: 10,
//     borderRadius: 5,
//   },
//   filterButtonText: {
//     color: 'black',
//   }
// });

// export default SimplePage;

//----------------------------------------

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const scale = width / 411.4285;
const scale1 = height / 826;

const Myproduct = ({navigation, route}) => {
  const {username, token} = route.params;
  // console.log(productdetails);
  // const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateField, setSelectedDateField] = useState(''); // Keeps track of which date field is selected (from or to)
  const [pickerKey, setPickerKey] = useState(Date.now()); // Key to force refresh of DateTimePicker
  const [selectedValue, setSelectedValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiResult, setApiResult] = useState(null);

  const [modalVisible1, setModalVisible1] = useState(false);
  const [cancelIndex, setCancelIndex] = useState(null);
  const [remark, setRemark] = useState('');
  const [id, setId] = useState();
  const [isFilterPressed, setIsFilterPressed] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();// Fetch data whenever the screen gains focus
    }, [])
  );

  const fetchData = async (fromDate, toDate, selectedValue) => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISRegisteredProducts/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            token: token,
            startDate: fromDate,
            endDate: toDate,
            requestStatus: selectedValue,
          }),
        },
      );

      const result = await response.json();
      console.log(result);

      if (result.retstatus.success == 1) {
        // OTP sent successfully
        setApiResult(result);
        // Navigate to the OTP screen or perform other actions
        // Alert.alert(result.retstatus.message);
        // navigation.navigate('OTPEmail', { email: email ,usercode:usercode});
      } else {
        setApiResult('');
        // Handle error cases, e.g., display an error message
        // console.error('Error in registeration', result.error);
        // You may also want to show an alert or other UI feedback
        // Alert.alert('Error', 'Registration does not happen');
      }
    } catch (error) {
      // console.error('Error:', error);
      // Handle network errors or other exceptions
      // You may also want to show an alert or other UI feedback
      Alert.alert(
        'An unexpected error occurred. Please try again later.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddRequest = () => {
    navigation.navigate('Productregistration', {
      token: token,
      username: username,
    });
    setIsFilterPressed(false);
  };

  const handleFilterPress = () => {
    setModalVisible(true);
    setIsFilterPressed(true);
  };

  const handleSearch = async () => {
    try {
      fetchData();
      // Show loading indicator
      setLoading(true);
      // Fetch data based on filter criteria
      await fetchData(fromDate, toDate, selectedValue);
      // Hide modal
      setModalVisible(false);
      // Refresh DateTimePicker
      setPickerKey(Date.now());
    } catch (error) {
      // console.error('Error:', error);
      // Show error alert if there's an issue
      Alert.alert(
        'An unexpected error occurred. Please try again later.',
      );
    } finally {
      // Hide loading indicator
      setLoading(false);
    }
    // setModalVisible(false);
    // setPickerKey(Date.now());
  };

  const showDatePickerModal = field => {
    setSelectedDateField(field);
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      const currentDate = selectedDate;
      setShowDatePicker(false);
      if (selectedDateField === 'from') {
        setFromDate(currentDate.toISOString().split('T')[0]);
      } else if (selectedDateField === 'to') {
        setToDate(currentDate.toISOString().split('T')[0]);
      }
    } else {
      setShowDatePicker(false);
    }
  };
  
  // const handleOutsidePress = () => {
  //   // Function to handle when user clicks outside the modal
  //   setModalVisible(false);
  // };

  const Cancel = () => {
    setModalVisible(false);
  };

  // const handleCancel = (index) => {
  //   if (apiResult && apiResult.Listdate && apiResult.Listdate.length > index) {
  //     const {SerialNo, ItemcodeDescp, Remark} = apiResult.Listdate[index];
  //     Alert.alert(
  //       'Cancel Confirmation',
  //       `Serial No: ${SerialNo}\nItem Code Description: ${ItemcodeDescp}\nRemark: ${Remark}`,
  //       [{text: 'OK'}],
  //     );
  //   } else {
  //     Alert.alert('No Data', 'There are no details available to cancel.');
  //   }
  // };

  const handleCancel = (index, id) => {
    if (apiResult && apiResult.Listdate && apiResult.Listdate.length > index) {
      setCancelIndex(index);
      setId(id);
      setModalVisible1(true);
    }
  };

  const handleModalCancel = () => {
    setModalVisible1(false);
    setRemark('');
  };

  const handleModalOK = async () => {
    if (
      apiResult &&
      apiResult.Listdate &&
      apiResult.Listdate.length > cancelIndex
    ) {
      // const {SerialNo, ItemcodeDescp} = apiResult.Listdate[cancelIndex];
      console.log('Remark:', remark);
      // Handle the remark here, such as sending it to the server
      apiResult.Listdate.splice(cancelIndex, 1);
    }
    try {
      setLoading(true);
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISProductRegCancellation/',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            token: token,
            username: username,
            RequestId: id,
            CancelRemark: remark,
          }),
        },
      );
      console.log('Response Status', response.status);
      const result = await response.json();
      console.log('Response Content:', result);

      if (result.retstatus.success == 1) {
        // Alert.alert(result.retstatus.message);
      } else if (result.retstatus.success == 0) {
        Alert.alert(result.retstatus.message);
      }
    } catch (error) {
      // console.error('Error:', error);
      Alert.alert('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
    setModalVisible1(false);
    setRemark('');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <TouchableOpacity onPress={handleAddRequest} style={styles.addButton}>
          <Text style={styles.addText}>+ Add Request</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleFilterPress}
          style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>

        <View style={styles.dataContainer}>
          {apiResult && apiResult.Listdate && apiResult.Listdate.length > 0 ? (
            <View>
              {apiResult.Listdate.map((item, index) => (
                <View key={index} style={styles.itemContainer}>
                  <View style={styles.leftContent}>
                    <Text style={[styles.leftText,{borderBottomWidth:1,fontWeight:'bold'}]}>Reference ID:</Text>
                    <Text style={styles.leftText}>Serial No:</Text>
                    <Text style={styles.leftText}>Product Name:</Text>
                    <Text style={styles.leftText}>Date of Purchase:</Text>
                    <Text style={styles.leftText}>Warranty Status:</Text>
                    <Text style={styles.leftText}>Status:</Text>
                  </View>
                  <View style={styles.rightContent}>
                    <Text style={[styles.rightText,{borderBottomWidth:1,fontWeight:'bold'}]}>{item.request_no}</Text>
                    <Text style={styles.rightText}>{item.SerialNo}</Text>
                    <Text style={styles.rightText}>{item.ItemcodeDescp}</Text>
                    <Text style={styles.rightText}>{item.PurchaseDate}</Text>
                    <Text style={styles.rightText}>{item.WarrantyStatus}</Text>
                    <Text style={styles.rightText}>{item.status}</Text>

                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => handleCancel(index, item.Id)}
                       disabled={isFilterPressed} >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>

                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:20}}>No data available</Text>
            </View>
          )}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={handleModalCancel}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Cancel Confirmation</Text>
              <Text style={styles.label}>
                Serial No:{' '}
                {apiResult &&
                apiResult.Listdate &&
                apiResult.Listdate[cancelIndex]
                  ? apiResult.Listdate[cancelIndex].SerialNo
                  : ''}
              </Text>
              <Text style={styles.label}>
                Item Code Description:{' '}
                {apiResult &&
                apiResult.Listdate &&
                apiResult.Listdate[cancelIndex]
                  ? apiResult.Listdate[cancelIndex].ItemcodeDescp
                  : ''}
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Enter remark..."
                value={remark}
                multiline={true}
                onChangeText={text => setRemark(text)}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton1}
                  onPress={handleModalCancel}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.okButton}
                  onPress={handleModalOK}>
                  <Text style={styles.buttonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          {/* <TouchableWithoutFeedback onPress={handleOutsidePress}> */}
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  onPress={() => showDatePickerModal('from')}
                  style={styles.dateButton}>
                  <Text style={styles.date}>From Date:</Text>
                  {/* <Text>{fromDate}</Text> */}
                </TouchableOpacity>
                <Text style={styles.actualdate}>{fromDate}</Text>
                <TouchableOpacity
                  onPress={() => showDatePickerModal('to')}
                  style={styles.dateButton}>
                  <Text style={styles.date}>To Date:</Text>
                  {/* <Text>{toDate}</Text> */}
                </TouchableOpacity>
                <Text style={styles.actualdate}>{toDate}</Text>

                <View style={styles.inputContainer1}>
                  <View style={styles.picker}>
                    <Picker
                      selectedValue={selectedValue}
                      style={styles.input1}
                      onValueChange={itemValue => {
                        setSelectedValue(itemValue);
                      }}>
                      <Picker.Item label="Please Select" value="" />
                      <Picker.Item label="Cancelled" value="10" />
                      <Picker.Item label="Reject" value="20" />
                      <Picker.Item label="Approved" value="19" />
                      <Picker.Item label="Under Verification" value="18" />
                    </Picker>
                  </View>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={Cancel}
                    style={styles.cancelButton2}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleSearch}
                    style={styles.search}>
                    <Text style={styles.searchbutton}>Search</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          {/* </TouchableWithoutFeedback> */}
        </Modal>

        {showDatePicker && (
          <DateTimePicker
            key={pickerKey} // Key to force refresh
            testID="dateTimePicker"
            value={new Date()}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20 * scale1,
  },
  addButton: {
    position: 'absolute',
    top: 10 * scale1,
    left: 20 * scale,
    width: 160 * scale,
    backgroundColor: 'lightblue',
    padding: 10 * scale1,
    borderRadius: 5 * scale,
    alignItems: 'center',
  },
  addText: {
    fontSize: 16 * scale,
  },
  dataContainer: {
    marginTop: 50 * scale1,
  },
  filterButton: {
    position: 'absolute',
    top: 10 * scale1,
    right: 10 * scale,
    backgroundColor: '#DDDDDD',
    padding: 10 * scale1,
    borderRadius: 5 * scale,
  },
  filterButtonText: {
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 50 * scale1,
    borderRadius: 10 * scale,
    elevation: 5,
  },
  dateButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    backgroundColor: '#00bfff',
    color: 'white',
    borderRadius: 5*scale,
    marginBottom: 5*scale1,
    fontSize: 20*scale1,
  },
  search: {
    alignItems: 'center',
    textAlign: 'center',
  },
  searchbutton: {
    backgroundColor: '#008000',
    color: 'white',
    marginTop: 14*scale1,
    padding: 5*scale,
    borderRadius: 5*scale,
    fontSize: 15,
  },
  actualdate: {
    fontSize: 20,
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 10*scale1,
  },
  cancelButton: {
    textAlign: 'center',
    alignItems: 'flex-end',
  },
  cancelButtonText: {
    color: 'white',
    backgroundColor: 'red',
    borderRadius: 5*scale,
    padding: 5*scale,
  },
  inputContainer1: {
    marginVertical: 5*scale1,
    paddingHorizontal: 10*scale,
    alignItems: 'center',
    textAlign: 'center',
  },
  picker: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8*scale,
  },
  input1: {
    height: 30*scale1,
    paddingLeft: 5*scale,
    paddingRight: 5*scale,
    width: 220*scale, // Adjust as needed
    color: '#333',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor:'#f0f8ff',
    borderRadius: 5*scale,
    padding: 10*scale,
    marginBottom: 10*scale1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5*scale,
    padding: 10*scale,
    marginTop: 10*scale1,
    marginBottom: 20*scale1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20*scale1,
  },
  cancelButton1: {
    backgroundColor: '#ff6347', // Red color as an example
    paddingVertical: 10*scale1,
    paddingHorizontal: 20*scale,
    borderRadius: 5*scale,
  },
  okButton: {
    backgroundColor: '#008000', // Green color as an example
    paddingVertical: 10*scale1,
    paddingHorizontal: 20*scale,
    borderRadius: 5*scale,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16*scale1,
  },
  buttonContainer: {
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'space-between', // Equal space between buttons
    marginTop: 10*scale1, // Adjust as needed
  },
  cancelButton2: {
    marginTop: 16*scale1,
  },
  leftText: {
    textAlign: 'left',
    marginBottom:4*scale1
  },
  rightText: {
    textAlign: 'right',
    marginBottom:4*scale1
  },
  leftContent: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rightContent: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 20*scale,
    color: 'red',
    marginBottom: 20*scale1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontSize: 14*scale,
    color: '#333',
    marginTop: 10*scale1,
    fontWeight: 'bold',
  },
});

export default Myproduct;
