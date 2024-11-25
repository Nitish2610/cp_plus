import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions,
  Modal,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {useFocusEffect} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
const scale = width / 411.4285;
const scale1 = height / 826;

const ViewInstallationRequest = ({navigation, route}) => {
  const {username, token, userData} = route.params;
  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [isSelected, setIsSelected] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFilterPressed, setIsFilterPressed] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateField, setSelectedDateField] = useState(''); // Keeps track of which date field is selected (from or to)
  const [pickerKey, setPickerKey] = useState(Date.now()); // Key to force refresh of DateTimePicker
  const [selectedValue, setSelectedValue] = useState('');
  const [cancelIndex, setCancelIndex] = useState(null);
  const [id, setId] = useState();
  const [modalVisible1, setModalVisible1] = useState(false);
  const [remark, setRemark] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData(); // Fetch data whenever the screen gains focus
    }, []),
  );

  const fetchData = async (fromDate, toDate, selectedValue) => {
    try {
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISInstallationRequestStatus/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            startDate: fromDate,
            endDate: toDate,
            requestStatus: selectedValue,
            token: userData.token,
          }),
        },
      );

      const result = await response.json();
      console.log(result);

      if (result.retstatus.success == 1) {
        // Alert.alert(result.retstatus.message);
        setData(result);
      } else {
        // console.error('Error', result.error);
        setData('');
        //  Alert.alert('No data found');
      }
    } catch (error) {
      // console.error('Error:', error);
      Alert.alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handleAdd = () => {
    navigation.navigate('Installationrequest', {
      username: username,
      token: token,
      userData: userData,
    });
  };

  const handlefilter = () => {
    setModalVisible(true);
    setIsFilterPressed(true);
  };
  const Cancel = () => {
    setModalVisible(false);
  };

  const handleSearch = async () => {
    try {
      fetchData();
      // Show loading indicator
      // setLoading(true);
      // Fetch data based on filter criteria
      await fetchData(fromDate, toDate, selectedValue);
      // Hide modal
      setModalVisible(false);
      // Refresh DateTimePicker
      setPickerKey(Date.now());
    } catch (error) {
      // console.error('Error:', error);
      // Show error alert if there's an issue
      Alert.alert('An unexpected error occurred. Please try again later.');
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

  const handleCancel = (index, id) => {
    if (data && data.Listdate && data.Listdate.length > index) {
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
    if (data && data.Listdate && data.Listdate.length > cancelIndex) {
      // const {SerialNo, ItemcodeDescp} = data.Listdate[cancelIndex];
      console.log('Remark:', remark);
      // Handle the remark here, such as sending it to the server
      data.Listdate.splice(cancelIndex, 1);
    }
    try {
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISInstallationReqCancellation/',
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
    } 
    setModalVisible1(false);
    setRemark('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Installation Request</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handlefilter}>
          <Text style={styles.addButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

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
                  <Picker.Item label="Cancelled" value="Cancelled" />
                  <Picker.Item label="Pending" value="Pending" />
                  <Picker.Item label="Resolved" value="Resolved" />
                </Picker>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={Cancel} style={styles.cancelButton2}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSearch} style={styles.search}>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={handleModalCancel}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Cancel Confirmation</Text>
            <Text style={styles.label}>
              Product Type:{' '}
              {data && data.Listdate && data.Listdate[cancelIndex]
                ? data.Listdate[cancelIndex].ProductType
                : ''}
            </Text>
            <Text style={styles.label}>
              Request No:{' '}
              {data && data.Listdate && data.Listdate[cancelIndex]
                ? data.Listdate[cancelIndex].request_no
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
              <TouchableOpacity style={styles.okButton} onPress={handleModalOK}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView>
        <View style={styles.dataContainer}>
          {data && data.Listdate && data.Listdate.length > 0 ? (
            <View>
              {data.Listdate.map((item, index) => (
                <View key={index} style={styles.itemContainer}>
                  <View style={styles.leftContent}>
                    <Text
                      style={[
                        styles.leftText,
                        {borderBottomWidth: 1, fontWeight: 'bold'},
                      ]}>
                      Reference ID:
                    </Text>
                    <Text style={styles.leftText}>Product Type:</Text>
                    <Text style={styles.leftText}>Callback Date:</Text>
                    <Text style={styles.leftText}>Callback Time:</Text>
                    <Text style={styles.leftText}>Status:</Text>
                  </View>
                  <View style={styles.rightContent}>
                    <Text
                      style={[
                        styles.rightText,
                        {borderBottomWidth: 1, fontWeight: 'bold'},
                      ]}>
                      {item.request_no}
                    </Text>
                    <Text style={styles.rightText}>{item.ProductType}</Text>
                    <Text style={styles.rightText}>{item.CallbackDate}</Text>
                    <Text style={styles.rightText}>{item.CallbackTime}</Text>
                    <Text style={styles.rightText}>{item.status}</Text>

                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => handleCancel(index, item.request_no)}
                      disabled={isFilterPressed}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 20}}>No data available</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10 * scale,
    backgroundColor: '#007AFF',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20 * scale,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'white',
    padding: 10 * scale,
    borderRadius: 5 * scale,
  },
  addButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingBottom: 60 * scale1, // To avoid overlapping the button
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
    borderRadius: 5 * scale,
    marginBottom: 5 * scale1,
    fontSize: 20 * scale1,
  },
  inputContainer1: {
    marginVertical: 5 * scale1,
    paddingHorizontal: 10 * scale,
    alignItems: 'center',
    textAlign: 'center',
  },
  picker: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8 * scale,
  },
  input1: {
    height: 30 * scale1,
    paddingLeft: 5 * scale,
    paddingRight: 5 * scale,
    width: 220 * scale, // Adjust as needed
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'space-between', // Equal space between buttons
    marginTop: 10 * scale1, // Adjust as needed
  },
  cancelButton2: {
    marginTop: 16 * scale1,
  },
  cancelButtonText: {
    color: 'white',
    backgroundColor: 'red',
    borderRadius: 5 * scale,
    padding: 5 * scale,
  },
  search: {
    alignItems: 'center',
    textAlign: 'center',
  },
  searchbutton: {
    backgroundColor: '#008000',
    color: 'white',
    marginTop: 14 * scale1,
    padding: 5 * scale,
    borderRadius: 5 * scale,
    fontSize: 15,
  },
  actualdate: {
    fontSize: 20,
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 10 * scale1,
  },
  dataContainer: {
    marginTop: 20 * scale1,
    padding: 15 * scale,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#f0f8ff',
    borderRadius: 5 * scale,
    padding: 10 * scale,
    marginBottom: 10 * scale1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContent: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rightContent: {
    flex: 1,
    alignItems: 'flex-end',
  },
  leftText: {
    textAlign: 'left',
    marginBottom: 4 * scale1,
  },
  rightText: {
    textAlign: 'right',
    marginBottom: 4 * scale1,
  },
  cancelButton: {
    textAlign: 'center',
    alignItems: 'flex-end',
  },
  cancelButtonText: {
    color: 'white',
    backgroundColor: 'red',
    borderRadius: 5 * scale,
    padding: 5 * scale,
  },
  cancelButton1: {
    backgroundColor: '#ff6347', // Red color as an example
    paddingVertical: 10 * scale1,
    paddingHorizontal: 20 * scale,
    borderRadius: 5 * scale,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16 * scale1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5 * scale,
    padding: 10 * scale,
    marginTop: 10 * scale1,
    marginBottom: 20 * scale1,
  },
  okButton: {
    backgroundColor: '#008000', // Green color as an example
    paddingVertical: 10*scale1,
    paddingHorizontal: 20*scale,
    borderRadius: 5*scale,
  },
  title: {
    fontSize: 20*scale,
    color: 'red',
    marginBottom: 20*scale1,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default ViewInstallationRequest;
