// import React, {useState,useEffect} from 'react';
// import {
//   Text,
//   Alert,
//   StyleSheet,
//   View,
//   Modal,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   TextInput
// } from 'react-native';
// import {RadioButton} from 'react-native-paper';
// import {Picker} from '@react-native-picker/picker';
// // import DropDownPicker from 'react-native-dropdown-picker';

// const ServiceNearby = () => {
//   const [modalvisible, setModalvisible] = useState(false);
//   const [bypincode, setBypincode] = useState('yes');
//   const [remark, setRemark] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [selectedState, setSelectedState] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');
//   const [state, setState] = useState('');
//   const [city, setCity] = useState('');
//   const [stateList, setStateList] = useState([]);
//   const [cityList,setCityList] =useState([]);

//   useEffect(() => {
//     fetchStateList();
//   }, []);

//   const handlefilterpress = () => {
//     setModalvisible(true);
//   };

//   const handleRadioChange = value => {
//     setBypincode(value);
//     if (value == 'yes') {
//       setRemark('');
//     }
//   };

//   const CancelSearch = () => {
//     setModalvisible(false);
//   };

//   const handleSearch = () => {};

//   const fetchStateList = async () => {
//     try {
//       const response = await fetch(
//         'http://devservice.adityagroup.com/aditya_service/rma/CPPartner/GetState/',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({}),
//         },
//       );

//       const result = await response.json();
//       console.log(result);

//       if (result.retstatus.success == 1) {
//         Alert.alert(result.retstatus.message);
//         setStateList(result.Listdate);
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

//   const fetchCityList = state => {};

//   const handleStateChange = state => {
//     setSelectedState(state);
//     setSelectedCity('');
//     // fetchCityList(state);
//   };

//   const handleCityChange = city => {
//     setSelectedCity(city);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.headertext}>
//         Finding service centers near for repairs and maintenance.
//       </Text>
//       <TouchableOpacity onPress={handlefilterpress} style={styles.filterbutton}>
//         <Text style={styles.filterbuttontext}>Filter</Text>
//       </TouchableOpacity>

//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalvisible}
//         onRequestClose={() => setModalvisible(false)}>
//         <View style={styles.modalconatiner}>
//           <View style={styles.modalcontent}>
//             <View style={styles.innermodalcontent}>
//               <RadioButton
//                 style={styles.RadioButton}
//                 value="yes"
//                 status={bypincode === 'yes' ? 'checked' : 'unchecked'}
//                 onPress={() => handleRadioChange('yes')}
//               />
//               <Text
//                 onPress={() => handleRadioChange('yes')}
//                 style={{marginTop: 8}}>
//                 Search by Pincode
//               </Text>

//               <RadioButton
//                 style={styles.RadioButton}
//                 value="no"
//                 status={bypincode === 'no' ? 'checked' : 'unchecked'}
//                 onPress={() => handleRadioChange('no')}
//               />
//               <Text
//                 onPress={() => handleRadioChange('no')}
//                 style={{marginTop: 8}}>
//                 Search by city and state
//               </Text>
//             </View>
//             {bypincode === 'yes' && (
//               <View>
//                 <TextInput
//                   style={styles.textinput}
//                   placeholder="Enter Pincode"
//                   keyboardType="phone-pad"
//                   onChangeText={text => setPincode(text)}
//                   value={pincode}
//                 />
//                 <View style={styles.buttonContainer}>
//                   <TouchableOpacity
//                     onPress={CancelSearch}
//                     style={styles.cancelButton2}>
//                     <Text style={styles.cancelButtonText}>Cancel</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={handleSearch}
//                     style={styles.search}>
//                     <Text style={styles.searchbutton}>Search</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             )}

//             {bypincode === 'no' && (
//               <View>
//                 <View style={styles.inputRow}>
//                    <Picker
//                     selectedValue={selectedState}
//                     style={styles.picker}
//                     onValueChange={(itemValue) => handleStateChange(itemValue)}
//                   >
//                     <Picker.Item label="Select State" value="" />
//                     {stateList.map((state) => (
//                       <Picker.Item key={state.state_code} label={state.state} value={state.state_code} />
//                     ))}
//                   </Picker>
//                    <Picker
//                     selectedValue={selectedCity}
//                     style={styles.picker}
//                     onValueChange={(itemValue) => handleCityChange(itemValue)}
//                   >
//                     <Picker.Item label="Select City" value="" />
//                     {cityList.map((city) => (
//                       <Picker.Item key={city.id} label={city.name} value={city.value} />
//                     ))}
//                   </Picker>
//                 </View>
//                 <View style={styles.buttonContainer}>
//                   <TouchableOpacity
//                     onPress={CancelSearch}
//                     style={styles.cancelButton2}>
//                     <Text style={styles.cancelButtonText}>Cancel</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={handleSearch}
//                     style={styles.search}>
//                     <Text style={styles.searchbutton}>Search</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             )}
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   headertext: {
//     fontWeight: 'bold',
//     marginTop: 5,
//     fontSize: 14,
//   },
//   filterbutton: {
//     position: 'absolute',
//     backgroundColor: '#DDDDDD',
//     top: 30,
//     right: 20,
//     padding: 10,
//     borderRadius: 5,
//   },
//   filterbuttontext: {
//     color: 'black',
//   },
//   modalconatiner: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalcontent: {
//     backgroundColor: 'white',
//     width: '85%',
//     height: 230,
//     borderRadius: 10,
//     elevation: 3,
//   },
//   innermodalcontent: {
//     display: 'flex',
//     flexDirection: 'row',
//     marginTop: 15,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 5,
//   },
//   cancelButton2: {
//     marginTop: 16,
//   },
//   cancelButtonText: {
//     color: 'white',
//     backgroundColor: 'red',
//     borderRadius: 5,
//     padding: 5,
//   },
//   search: {
//     alignItems: 'center',
//     textAlign: 'center',
//   },
//   searchbutton: {
//     backgroundColor: '#008000',
//     color: 'white',
//     marginTop: 14,
//     padding: 5,
//     borderRadius: 5,
//     fontSize: 15,
//   },
//   textinput: {
//     marginTop: 25,
//     marginLeft: 25,
//     borderWidth: 1,
//     fontSize: 16,
//     width: 300,
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     borderRadius:5
//   },
//   inputRow: {
//     // flexDirection: 'row',
//     marginBottom: 5,
//   },
//   textinput1: {
//     borderWidth: 1,
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//     marginRight: 10,
//     marginTop: 5,
//   },
//   smallInput: {
//     width: '80%',
//   },
//   picker: {
//     width: '100%',
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//   }
// });

// export default ServiceNearby;

import React, {useState, useEffect} from 'react';
import {
  Text,
  Alert,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
  ActivityIndicator,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
// import DropDownPicker from 'react-native-dropdown-picker';
const { width, height } = Dimensions.get('window'); 
const scale = width / 411.4285;
const scale1= height/826;

const ServiceNearby = ({navigation, route}) => {
  const {userData} = route.params;
  const [modalvisible, setModalvisible] = useState(false);
  const [bypincode, setBypincode] = useState('yes');
  const [remark, setRemark] = useState('');
  const [pincode, setPincode] = useState(userData.pincode);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [showStateList, setShowStateList] = useState(false);
  const [showCityList, setShowCityList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState();

  useEffect(() => {
    fetchStateList();
    handleSearch();
  }, []);

  const handlefilterpress = () => {
    setModalvisible(true);
  };

  const handleRadioChange = value => {
    setBypincode(value);
    if (value == 'yes') {
      setRemark('');
    }
  };

  const CancelSearch = () => {
    setModalvisible(false);
  };

  const handleSearch = async () => {
    setModalvisible(false);
    try {
      setLoading(true);
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISGetSCInfo/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: userData.usercode,
            Pincode: bypincode === 'yes' ? pincode : undefined,
            State: selectedState,
            City: selectedCity,
            token: userData.token,
          }),
        },
      );

      const result = await response.json();
      console.log(result);

      if (result.success == 1) {
        // Alert.alert(result.message);
        setAddress(result.Listdate);
      } else {
        // console.error('Error', result.error);
        Alert.alert('Error', 'No data found');
      }
    } catch (error) {
      // console.error('Error:', error);
      Alert.alert(
        'An unexpected error occurred. Please try again later.',
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchStateList = async () => {
    try {
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/GetState/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        },
      );

      const result = await response.json();
      console.log(result);

      if (result.retstatus.success == 1) {
        // Alert.alert(result.retstatus.message);
        setStateList(result.Listdate);
      } else {
        // console.error('Error:', result.error);
        Alert.alert('Error', 'No data found');
      }
    } catch (error) {
      // console.error('Error:', error);
      Alert.alert(
        'An unexpected error occurred. Please try again later.',
      );
    }
  };

  const fetchCityList = async state => {
    try {
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/GetCity/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            State: state,
          }),
        },
      );

      const result = await response.json();
      console.log(result);

      if (result.retstatus.success === 1) {
        // Alert.alert(result.retstatus.message);
        setCityList(result.Listdate);
      } else {
        // console.error('Error fetching city list:', result.error);
        Alert.alert('Error', 'Failed to fetch city list. Please try again.');
      }
    } catch (error) {
      // console.error('Error:', error);
      Alert.alert(
        'An unexpected error occurred. Please try again later.',
      );
    }
  };

  const handleStateChange = state => {
    console.log('Selected state:', state);
    setSelectedState(state);
    // setSelectedCity('');
    // setShowStateList(false);
    fetchCityList(state);
  };

  const handleCityChange = city => {
    setSelectedCity(city);
  };

  const renderStateItem = ({item}) => {
    if (item.state === selectedState) {
      return null;
    }
    return (
      <TouchableOpacity onPress={() => handleStateChange(item.state)} style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.state}</Text>
      </TouchableOpacity>
    );
  };

  const filteredStateList = stateList.filter(state =>
    state.state.toLowerCase().includes(selectedState.toLowerCase()),
  );

  const filteredCityList = cityList.filter(city =>
    city.city.toLowerCase().includes(selectedCity.toLowerCase()),
  );

  const renderCityItem = ({item}) => {
    if (item.city === selectedCity) {
      return null;
    }
    return (
      <TouchableOpacity onPress={() => handleCityChange(item.city)} style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.city}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <Text style={styles.headertext}>
        Finding service centers near for repairs and maintenance.
      </Text>
      <TouchableOpacity onPress={handlefilterpress} style={styles.filterbutton}>
        <Text style={styles.filterbuttontext}>Filter</Text>
      </TouchableOpacity>

      {/* <View style={styles.container2}>
        <Image
          source={require('../Images/locate.png')} // Replace './location_logo.png' with your actual image path
          style={styles.logo}
        />
        <View style={styles.contentContainer}>
          {address && address.map(item => (
            <View key={item.Id}>
              <Text style={[styles.contentText,{fontSize:18,color:'black'}]}>{item.SCName}</Text>
              <Text style={[styles.contentText,{color:'red'}]}>{item.SCAddress}</Text>
              <Text style={styles.contentText}>{item.SCPhone}</Text>
              <Text style={[styles.contentText,{color:'blue'}]}>{item.SCEmail}</Text>
            </View>
          ))}
        </View>
      </View> */}
      <View style={styles.container2}>
  <View style={styles.contentContainer}>
    {address && address.map(item => (
      <View key={item.Id}>
        <Image
          source={require('../Images/locate.png')} // Replace './location_logo.png' with your actual image path
          style={styles.logo}
        />
        <Text style={[styles.contentText,{fontSize:18,color:'black'}]}>{item.SCName}</Text>
        <Text style={[styles.contentText,{color:'black'}]}>{item.SCAddress}</Text>
        <Text style={[styles.contentText,{color:'black'}]}>{item.SCPhone}</Text>
        <Text style={[styles.contentText,{color:'black'}]}>{item.SCEmail}</Text>
      </View>
    ))}
  </View>
</View>


      <Modal
        animationType="fade"
        transparent={true}
        visible={modalvisible}
        onRequestClose={() => setModalvisible(false)}>
        <View style={styles.modalconatiner}>
          <View style={styles.modalcontent}>
            <View style={styles.innermodalcontent}>
              <RadioButton
                style={styles.RadioButton}
                value="yes"
                status={bypincode === 'yes' ? 'checked' : 'unchecked'}
                onPress={() => handleRadioChange('yes')}
              />
              <Text
                onPress={() => handleRadioChange('yes')}
                style={{marginTop: 8*scale1,fontSize:13*scale,color:'black',fontWeight:'bold'}}>
                Search by Pincode
              </Text>

              <RadioButton
                style={styles.RadioButton}
                value="no"
                status={bypincode === 'no' ? 'checked' : 'unchecked'}
                onPress={() => handleRadioChange('no')}
              />
              <Text
                onPress={() => handleRadioChange('no')}
                style={{marginTop: 8*scale1,fontSize:13*scale,color:'black',fontWeight:'bold'}}>
                Search by state and city
              </Text>
            </View>
            {bypincode === 'yes' && (
              <View>
                <TextInput
                  style={styles.textinput}
                  placeholder="Enter Pincode"
                  keyboardType="phone-pad"
                  onChangeText={text => setPincode(text)}
                  value={pincode}
                />
                {/* <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={CancelSearch}
                    style={styles.cancelButton2}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleSearch}
                    style={styles.search}>
                    <Text style={styles.searchbutton}>Search</Text>
                  </TouchableOpacity>
                </View> */}
              </View>
            )}

            {bypincode === 'no' && (
              <View>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.textinput2}
                    placeholder="Select State"
                    onChangeText={text => setSelectedState(text)}
                    value={selectedState}
                    onFocus={() => {setShowStateList(true);setShowCityList(false)}}
                    
                  />
                  {showStateList && (
                    <View style={styles.stateListContainer}>
                      <FlatList
                        data={filteredStateList}
                        renderItem={renderStateItem}
                        keyExtractor={item => item.state_code}
                      />
                    </View>
                  )}
                  <TextInput
                    style={styles.textinput2}
                    placeholder="Search City"
                    onChangeText={text => setSelectedCity(text)}
                    value={selectedCity}
                    onFocus={() => {setShowCityList(true);setShowStateList(false)}}
                  />
                  {showCityList && cityList.length > 0 && (
                    <View style={styles.stateListContainer}>
                      <FlatList
                        data={filteredCityList}
                        renderItem={renderCityItem}
                        keyExtractor={item => item.id}
                      />
                    </View>
                  )}
                </View>
              </View>
            )}
             <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={CancelSearch}
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
      </Modal>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headertext: {
    fontWeight: 'bold',
    marginTop: 5*scale1,
    fontSize: 14*scale,
  },
  filterbutton: {
    // position: 'absolute',
    backgroundColor: '#DDDDDD',
    top: 20*scale1,
    right: 12*scale,
    padding: 10*scale,
    borderRadius: 5*scale
  },
  filterbuttontext: {
    color: 'black',
  },
  modalconatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalcontent: {
    backgroundColor: 'white',
    width: '85%',
    height: 350*scale1,
    borderRadius: 10*scale,
    elevation: 3,
  },
  innermodalcontent: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15*scale1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20*scale1, 
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center', 
  },
  cancelButton2: {
    marginHorizontal: 60*scale, 
  },
  cancelButtonText: {
    color: 'white',
    backgroundColor: 'red',
    borderRadius: 5*scale,
    paddingVertical: 10*scale1, 
    paddingHorizontal: 20*scale, 
  },
  search: {
    marginHorizontal: 60*scale, 
  },
  searchbutton: {
    backgroundColor: '#008000',
    color: 'white',
    borderRadius: 5*scale,
    paddingVertical: 10*scale1, 
    paddingHorizontal: 20*scale, 
  },
  button: {
    flex: 1, 
  },
  
  textinput: {
    marginTop: 25*scale1,
    marginLeft: 25*scale,
    borderWidth: 1,
    fontSize: 16*scale,
    width: 300*scale,
    paddingHorizontal: 8*scale,
    paddingVertical: 6*scale1,
    borderRadius: 5*scale,
    color:'black'
  },
  textinput2: {
    marginTop: 15*scale1,
    marginLeft: 25*scale,
    borderWidth: 1,
    fontSize: 16*scale,
    width: 300*scale,
    paddingHorizontal: 8*scale,
    paddingVertical: 6*scale1,
    borderRadius: 5*scale,
    color:'black'
  },
  inputRow: {
    // flexDirection: 'row',
    marginBottom: 5*scale1,
  },
  textinput1: {
    borderWidth: 1,
    paddingHorizontal: 8*scale,
    paddingVertical: 3*scale,
    marginRight: 10*scale,
    marginTop: 5*scale1,
  },
  smallInput: {
    width: '80%',
  },
  picker: {
    width: '100%',
    height: 50*scale1,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  stateListContainer: {
    maxHeight: 100*scale1,
    marginBottom: 10*scale1,
    marginLeft: 25*scale,
    backgroundColor: 'white',
    width: 300*scale
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 20*scale,
  },
  logo: {
    width: 80*scale,
    height: 80*scale1,
    resizeMode: 'contain',
    marginTop:60*scale1,
    marginLeft:140*scale
  },
  contentContainer: {
    marginTop: 20*scale1,
  },
  contentText: {
    fontSize: 16*scale,
    marginBottom: 10*scale1,
    textAlign: 'center',
    fontWeight:'bold'
  },
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  }
});

export default ServiceNearby;

