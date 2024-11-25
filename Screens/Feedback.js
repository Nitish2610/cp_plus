// import React from 'react';
// import { View,Text,Dimensions,StyleSheet} from 'react-native';
// import {RadioButton} from 'react-native-paper';

// const { width, height } = Dimensions.get('window');
// const scale = width / 411.4285;
// const scale1 = height/826;

// const Feedback = () =>{
//     return(
//       <View style={styles.container}>
//            <View style={styles.header}>
//                 <Text style={styles.headertext}>
//                     Here at CP PLUS, we always like to hear from you.Feedbacks, complaints, queries, for anything, Please
//                     fill the form below and we will get back to you in no time.
//                 </Text>
//            </View>
//            <View style = {styles.content}>
//               <View style={styles.feedback1}>
//                  <Text style={{fontWeight:'bold'}}>1.Your complaint resolved upto your satisfaction?</Text>
//               </View>
//            </View>
//       </View>
//     )
// }

// const styles = StyleSheet.create({
//     container:{
//        flex:1,
//     paddingTop: 10 * scale1
//     },
//     header:{
//         backgroundColor:'#dcdcdc',
//         justifyContent:'center',
//     alignItems:'center'
//     },
//     headertext:{
//        fontWeight:'bold'
//     },
//     content:{
//         marginTop:10,
//         marginLeft:5
//     }
// })

// export default Feedback;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import publicIP from 'react-native-public-ip';

const {width, height} = Dimensions.get('window');
const scale = width / 411.4285;
const scale1 = height / 826;

const Feedback = ({navigation, route}) => {
  const {userData} = route.params;
  const [isComplaintResolved, setIsComplaintResolved] = useState(null);
  const [isService, setIsService] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [remarks1, setRemarks1] = useState('');
  const [remarks2, setRemarks2] = useState('');
  const [remarks3, setRemarks3] = useState('');
  const [loading, setLoading] = useState(false);

  //   let ipAddress;

  // publicIP()
  //   .then(ip => {
  //     ipAddress = ip;
  //     console.log('IP address:', ipAddress);
  //     // You can use 'ipAddress' variable further in your code
  //   })
  //   .catch(error => {
  //     console.error('Error while fetching public IP:', error);
  //     console.log(error.message);
  //   });

  let ip;
  useEffect(() => {
    const fetchPublicIP = async () => {
      try {
        ip = await publicIP();
        console.log('IP address:', ip);
        // You can use 'ip' further in your code
      } catch (error) {
        console.error('Error while fetching public IP:', error);
        console.log(error.message);
      }
    };

    fetchPublicIP();
  });

  const handleRadioChange = value => {
    setIsComplaintResolved(value);
    // Reset remarks when switching between options
    if (value === 'yes') {
      setRemarks('');
    }
  };
  const handleRadioChange1 = value => {
    setIsService(value);
    // Reset remarks when switching between options
    if (value === 'yes') {
      setRemarks1('');
    }
  };
  const handleRadioChange2 = value => {
    setRecommendation(value);
    // Reset remarks when switching between options
    if (value === 'yes') {
      setRemarks2('');
    }
  };

  const save = async () => {
    if (
      isComplaintResolved === null ||
      isService === null ||
      recommendation === null ||
      (isComplaintResolved === 'no' && remarks.trim() === '') ||
      (isService === 'Not Good' && remarks1.trim() === '') ||
      (recommendation === 'Never' && remarks2.trim() === '') ||
      remarks3.trim() === ''
    ) {
      Alert.alert('Required', 'Please fill all the fields.');
    } else {
      // Your save logic here
      try {
        setLoading(true);
        const response = await fetch(
          'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISFeedback/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: userData.usercode,
              CustomerName: userData.contact_person,
              MobileNo: userData.contact_no,
              EmailId: userData.email,
              Q1: isComplaintResolved === 'yes' ? 'Yes' : 'No',
              Q1Rmk: isComplaintResolved === 'no' ? remarks : '',
              Q2: isService,
              Q2Rmk: isService === 'Not Good' ? remarks1 : '',
              Q3: recommendation,
              Q3Rmk: recommendation === 'Never' ? remarks2 : '',
              SuggestRmk: remarks3,
              IPAddress: ip,
              token: userData.token,
            }),
          },
        );

        const result = await response.json();
        console.log(result);

        if (result.success == 1) {
          // OTP sent successfully
          // Navigate to the OTP screen or perform other actions
          // Alert.alert(result.message);
          // navigation.navigate('OTPEmail', {email: email, usercode: usercode});
        } else {
          // Handle error cases, e.g., display an error message
          // console.error('Feedback Not Submitted', result.error);
          // You may also want to show an alert or other UI feedback
          Alert.alert('Error', 'Feedback Not Submitted');
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
      // Alert.alert('Success', 'Feedback submitted successfully!');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <View style={styles.header}>
          <Text style={styles.headertext}>
            Here at CP PLUS, we always like to hear from you. Feedbacks,
            complaints, queries, for anything, Please fill the form below and we
            will get back to you in no time.
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.feedback1}>
            <Text style={{fontWeight: 'bold'}}>
              1. Your complaint resolved up to your satisfaction?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <RadioButton
                value="yes"
                status={isComplaintResolved === 'yes' ? 'checked' : 'unchecked'}
                onPress={() => handleRadioChange('yes')}
              />
              <Text onPress={() => handleRadioChange('yes')}>Yes</Text>
              <RadioButton
                value="no"
                status={isComplaintResolved === 'no' ? 'checked' : 'unchecked'}
                onPress={() => handleRadioChange('no')}
              />
              <Text onPress={() => handleRadioChange('no')}>No</Text>
            </View>
            {isComplaintResolved === 'no' && (
              <View style={{marginTop: 5}}>
                <Text>Please provide remarks:</Text>
                <TextInput
                  style={{
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginTop: 2,
                    textAlignVertical: 'top',
                  }}
                  multiline
                  numberOfLines={4}
                  onChangeText={text => setRemarks(text)}
                  value={remarks}
                />
              </View>
            )}
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.feedback1}>
            <Text style={{fontWeight: 'bold'}}>
              2. Overall, how satisfied are you with our services?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <RadioButton
                value="Average"
                status={isService === 'Average' ? 'checked' : 'unchecked'}
                onPress={() => handleRadioChange1('Average')}
              />
              <Text onPress={() => handleRadioChange1('Average')}>Average</Text>
              <RadioButton
                value="Good"
                status={isService === 'Good' ? 'checked' : 'unchecked'}
                onPress={() => handleRadioChange1('Good')}
              />
              <Text onPress={() => handleRadioChange1('Good')}>Good</Text>
              <RadioButton
                value="Excellent"
                status={isService === 'Excellent' ? 'checked' : 'unchecked'}
                onPress={() => handleRadioChange1('Excellent')}
              />
              <Text onPress={() => handleRadioChange1('Excellent')}>
                Excellent
              </Text>
              <RadioButton
                value="Not Good"
                status={isService === 'Not Good' ? 'checked' : 'unchecked'}
                onPress={() => handleRadioChange1('Not Good')}
              />
              <Text onPress={() => handleRadioChange1('Not Good')}>
                Not Good
              </Text>
            </View>
            {isService === 'Not Good' && (
              <View style={{marginTop: 5}}>
                <Text>Please provide remarks:</Text>
                <TextInput
                  style={{
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginTop: 2,
                    textAlignVertical: 'top',
                  }}
                  multiline
                  numberOfLines={4}
                  onChangeText={text => setRemarks1(text)}
                  value={remarks1}
                />
              </View>
            )}
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.feedback1}>
            <Text style={{fontWeight: 'bold'}}>
              3. How likely are you to recommend CP plus to your friends and
              colleagues?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <RadioButton
                value="Always"
                status={recommendation === 'Always' ? 'checked' : 'unchecked'}
                onPress={() => handleRadioChange2('Always')}
              />
              <Text onPress={() => handleRadioChange2('Always')}>Always</Text>
              <RadioButton
                value="Not Sure"
                status={recommendation === 'Not Sure' ? 'checked' : 'unchecked'}
                onPress={() => handleRadioChange2('Not Sure')}
              />
              <Text onPress={() => handleRadioChange2('Not Sure')}>
                Not Sure
              </Text>
              <RadioButton
                value="Never"
                status={recommendation === 'Never' ? 'checked' : 'unchecked'}
                onPress={() => handleRadioChange2('Never')}
              />
              <Text onPress={() => handleRadioChange2('Never')}>Never</Text>
            </View>
            {recommendation === 'Never' && (
              <View style={{marginTop: 5}}>
                <Text>Please provide remarks:</Text>
                <TextInput
                  style={{
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginTop: 2,
                    textAlignVertical: 'top',
                  }}
                  multiline
                  numberOfLines={4}
                  onChangeText={text => setRemarks2(text)}
                  value={remarks2}
                />
              </View>
            )}
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.feedback1}>
            <Text style={{fontWeight: 'bold'}}>
              3. If you would like to share any additional comments or
              experiences about our speed of service, Behaviour of service
              center representative, please write them below.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}></View>
            <View style={{marginTop: 5}}>
              <Text>Please provide remarks:</Text>
              <TextInput
                style={{
                  borderColor: 'gray',
                  borderWidth: 1,
                  marginTop: 2,
                  textAlignVertical: 'top',
                }}
                multiline
                numberOfLines={4}
                onChangeText={text => setRemarks3(text)}
                value={remarks3}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={save}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10 * scale1,
    margin: 10 * scale,
  },
  header: {
    backgroundColor: '#dcdcdc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headertext: {
    fontWeight: 'bold',
  },
  content: {
    marginTop: 10 * scale1,
    marginLeft: 5 * scale,
  },
  button: {
    marginTop: 20 * scale1,
    backgroundColor: 'red',
    padding: 10 * scale,
    borderRadius: 5 * scale,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
  },
});

export default Feedback;
