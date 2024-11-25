// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';
// import {RadioButton} from 'react-native-paper';

// const SignUp = () => {
//   const [activeSection, setActiveSection] = useState('login'); // State to manage active section

//   const [loginDetails, setLoginDetails] = useState({
//     gst_number: '',
//     contact_no: '',
//     email_address:'',
//     password:'',
//     re_password:''
//   });

//   const [otp, setOtp] = useState({
//     email_otp:'',
//     mobile_otp:''
//   });

//   const [contactDetails, setContactDetails] = useState({
//     fullName: '',
//     email: '',
//     phoneNumber: '',
//   });

//   const [checked, setChecked] = useState('');

//   const [isSecureEntry, setIsSecureEntry] = useState(true);

//   const [secureEntry, setSecureEntry] = useState(true);

//   const validateGSTNumber = (gst_number) =>{
//     // Check if GST number is provided
//     if (!gst_number) {
//         return false;
//     }

//     // Remove white spaces and convert to uppercase
//     gst_number = gst_number.trim().toUpperCase();

//     // GST number should be 15 characters long
//     if (gst_number.length !== 15) {
//         return false;
//     }

//     // GST number format regex pattern (example)
//     const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{2}$/;

//     if (!gstPattern.test(gst_number)) {
//         return false;
//     }

//     // Additional validations can be added based on your region's GST number format

//     // If all checks pass, return true
//      return true;
//     }

//     // Function to validate contact number
// const validateContactNumber = (contact_no) => {
//   // Check if contact number is provided
//   if (!contact_no) {
//     return false;
//   }

//   // Regular expression to match a valid 10-digit phone number
//   const phonePattern = /^[0-9]{10}$/;

//   // Test the contact number against the regular expression
//   if (!phonePattern.test(contact_no)) {
//     return false;
//   }

//   // If all checks pass, return true
//   return true;
// };

// const validateEmailAddress = (email_address) => {
//   // Regular expression pattern for validating email address
//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   // Test the email address against the regular expression
//   return emailPattern.test(email_address);
// };

// const validatePassword = (password) => {
//   // Minimum eight characters, at least one letter, one number and one special character
//   const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

//   return passwordPattern.test(password);
// };

//   const handleLoginDetailsSubmit = () => {
//     // Implement logic to handle login details submission
//    // console.log('Login Details Submitted:', loginDetails);

//    //validate gst number
//    if (checked === 'Yes') {
//    const isValidGST = validateGSTNumber(loginDetails.gst_number);
//     if (!isValidGST) {
//       alert('Invalid GST number');
//       return;
//     }
//   }
//   //validate mobile no
//     const isValidContactNumber = validateContactNumber(loginDetails.contact_no);
//     if (!isValidContactNumber) {
//       alert('Invalid contact number');
//       return;
//     }

//       // Validate email address
//   const isValidEmail = validateEmailAddress(loginDetails.email_address);
//   if (!isValidEmail) {
//     alert('Invalid email address');
//     return;
//   }

//    // Validate password
//    const isValidPassword = validatePassword(loginDetails.password);
//    if (!isValidPassword) {
//      alert('Password must be at least 8 characters long, contain at least one number, one special character, and have a letter');
//      return;
//    }

//    // Validate re-entered password
//   if (loginDetails.password !== loginDetails.re_password) {
//     alert('Passwords do not match');
//     return;
//   }

//    setActiveSection('otp');
//   };

//   const handleOTPEnter = () => {
//      // Check if both email OTP and mobile OTP match the expected values
//   //    if (otp.email_otp === expectedEmailOTP && otp.mobile_otp === expectedMobileOTP) {
//   //      // If OTPs match, proceed to the next page or perform any desired action
//   //     //console.log('OTP Entered:', otp);
//   //      // Navigate to the next page or execute further logic
//   //      setActiveSection('contact');
//   //     }

//   //  else {
//   //     // If OTPs do not match, display an error message to the user
//   //      alert('Entered OTPs do not match');
//   //   }
//   };

//   const handleContactDetailsSubmit = () => {
//     // Implement logic to handle contact details submission
//     console.log('Contact Details Submitted:', contactDetails);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={[
//             styles.headerItem,
//             activeSection === 'login' && styles.activeHeaderItem,
//           ]}
//           onPress={() => setActiveSection('login')}>
//           <Text
//             style={[
//               styles.headerText,
//               activeSection === 'login' && styles.activeHeaderText,
//             ]}>
//             Login Details
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.headerItem,
//             activeSection === 'otp' && styles.activeHeaderItem,
//           ]}
//           onPress={() => setActiveSection('otp')}>
//           <Text
//             style={[
//               styles.headerText,
//               activeSection === 'otp' && styles.activeHeaderText,
//             ]}>
//             Enter OTP
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.headerItem,
//             activeSection === 'contact' && styles.activeHeaderItem,
//           ]}
//           onPress={() => setActiveSection('contact')}>
//           <Text
//             style={[
//               styles.headerText,
//               activeSection === 'contact' && styles.activeHeaderText,
//             ]}>
//             Contact Details
//           </Text>
//         </TouchableOpacity>

//       </View>

//       {activeSection === 'login' && (
//         <View style={styles.section}>

//           <View style={styles.mainradio}>
//             <Text style={styles.radiotype}>Do you have GST Number?</Text>
//             <View style={styles.radioOptions}>
//               <View style={styles.radioButton}>
//                 <RadioButton
//                   value="Yes"
//                   status={checked === 'Yes' ? 'checked' : 'unchecked'}
//                   onPress={() => setChecked('Yes')}
//                 />
//                 <Text style={styles.radioText}>Yes</Text>
//               </View>
//               <View style={styles.radioButton}>
//                 <RadioButton
//                   value="No"
//                   status={checked === 'No' ? 'checked' : 'unchecked'}
//                   onPress={() => setChecked('No')}
//                 />
//                 <Text style={styles.radioText}>No</Text>
//               </View>
//             </View>
//           </View>

//           {checked === 'Yes' && (
//           <View style={styles.inputContainer}>
//             <Text
//               style={[
//                 styles.placeholder,
//                 loginDetails.gst_number ? styles.placeholderActive : '',
//               ]}>
//               Enter GST Number*
//             </Text>
//             <TextInput
//               style={styles.input}
//               placeholder=""
//               value={loginDetails.gst_number}
//               onChangeText={(text) =>
//                 setLoginDetails({ ...loginDetails, gst_number: text })
//               }
//               //editable={checked === 'Yes'}
//             />
//           </View>
//           )}

//           <View style={styles.inputContainer}>
//             <Text
//               style={[
//                 styles.placeholder,
//                 loginDetails.contact_no ? styles.placeholderActive : '',
//               ]}>
//               Enter Contact No.*
//             </Text>
//             <TextInput
//               style={styles.input}
//               placeholder=""
//               keyboardType="phone-pad"
//               value={loginDetails.contact_no}
//               onChangeText={(text) =>
//                 setLoginDetails({ ...loginDetails, contact_no: text })
//               }
//             />
//           </View>
//           <View style={styles.inputContainer}>
//             <Text
//               style={[
//                 styles.placeholder,
//                 loginDetails.email_address ? styles.placeholderActive : '',
//               ]}>
//               Enter Email Address*
//             </Text>
//             <TextInput
//               style={styles.input}
//               placeholder=""
//               value={loginDetails.email_address}
//               onChangeText={(text) =>
//                 setLoginDetails({ ...loginDetails, email_address: text })
//               }
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text
//               style={[
//                 styles.placeholder,
//                 loginDetails.password ? styles.placeholderActive : '',
//               ]}>
//               Password*
//             </Text>
//             <TextInput
//               style={styles.input}
//               placeholder=""
//               secureTextEntry={isSecureEntry}
//               value={loginDetails.password}
//               onChangeText={(text) =>
//                 setLoginDetails({ ...loginDetails, password: text })
//               }
//             />

//            <TouchableOpacity
//              style={styles.showButton}
//              onPress={() => setIsSecureEntry(prev => !prev)}>
//              <Text>{isSecureEntry ? 'show' : 'hide'}</Text>
//            </TouchableOpacity>

//           </View>
//           <View style={styles.inputContainer}>
//             <Text
//               style={[
//                 styles.placeholder,
//                 loginDetails.re_password ? styles.placeholderActive : '',
//               ]}>
//               Re-enter Password*
//             </Text>
//             <TextInput
//               style={styles.input}
//               placeholder=""
//               secureTextEntry={secureEntry}
//               value={loginDetails.re_password}
//               onChangeText={(text) =>
//                 setLoginDetails({ ...loginDetails, re_password: text })
//               }
//             />

//             <TouchableOpacity
//              style={styles.showButton}
//              onPress={() => setSecureEntry(prev => !prev)}>
//              <Text>{secureEntry ? 'show' : 'hide'}</Text>
//             </TouchableOpacity>

//           </View>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={handleLoginDetailsSubmit}>
//             <Text style={styles.buttonText}>Next</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {activeSection === 'otp' && (
//         <View style={styles.section}>
//           <View style={styles.inputContainer}>
//             <Text
//               style={[styles.placeholder, loginDetails.contact_no ? styles.placeholderActive : '']}>
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
//               style={[styles.placeholder, loginDetails.email_address ? styles.placeholderActive : '']}>
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
//               style={[styles.placeholder, otp.email_otp ? styles.placeholderActive : '']}>
//               Enter Email OTP
//             </Text>
//             <TextInput
//               style={styles.input}
//               placeholder=""
//               keyboardType="phone-pad"
//               value={otp.email_otp}
//               onChangeText={(text) => setOtp(prevState => ({ ...prevState, email_otp: text }))}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text
//               style={[styles.placeholder, otp.mobile_otp ? styles.placeholderActive : '']}>
//               Enter Mobile OTP
//             </Text>
//             <TextInput
//               style={styles.input}
//               placeholder=""
//               keyboardType="phone-pad"
//               value={otp.mobile_otp}
//               onChangeText={(text) => setOtp(prevState => ({ ...prevState, mobile_otp: text }))}
//             />
//           </View>

//           <TouchableOpacity style={styles.button} onPress={handleOTPEnter}>
//             <Text style={styles.buttonText}>Next</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {activeSection === 'contact' && (
//         <View style={styles.section}>
//           <View style={styles.inputContainer}>
//             <Text
//               style={[
//                 styles.placeholder,
//                 contactDetails.fullName ? styles.placeholderActive : '',
//               ]}>
//               Full Name
//             </Text>
//             <TextInput
//               style={styles.input}
//               placeholder=""
//               value={contactDetails.fullName}
//               onChangeText={text =>
//                 setContactDetails({...contactDetails, fullName: text})
//               }
//             />
//           </View>
//           <View style={styles.inputContainer}>
//             <Text
//               style={[
//                 styles.placeholder,
//                 contactDetails.email ? styles.placeholderActive : '',
//               ]}>
//               Email
//             </Text>
//             <TextInput
//               style={styles.input}
//               placeholder=""
//               value={contactDetails.email}
//               onChangeText={text =>
//                 setContactDetails({...contactDetails, email: text})
//               }
//             />
//           </View>
//           <View style={styles.inputContainer}>
//             <Text
//               style={[
//                 styles.placeholder,
//                 contactDetails.phoneNumber ? styles.placeholderActive : '',
//               ]}>
//               Phone Number
//             </Text>
//             <TextInput
//               style={styles.input}
//               placeholder=""
//               keyboardType="phone-pad"
//               value={contactDetails.phoneNumber}
//               onChangeText={text =>
//                 setContactDetails({...contactDetails, phoneNumber: text})
//               }
//             />
//           </View>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={handleContactDetailsSubmit}>
//             <Text style={styles.buttonText}>Submit</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   mainradio: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   radiotype: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginRight: 10,
//   },
//   radioOptions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   radioButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   radioText: {
//     marginLeft: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   headerItem: {
//     flex: 1,
//     alignItems: 'center',
//     paddingBottom: 5,
//   },
//   headerText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   activeHeaderItem: {
//     borderBottomWidth: 2,
//     borderColor: 'red',
//   },
//   activeHeaderText: {
//     color: 'red',
//   },
//   section: {
//     marginBottom: 10,
//   },
//   inputContainer: {
//     position: 'relative',
//     marginBottom: 12,
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderColor: '#a9a9a9',
//     padding: 5,
//     paddingLeft: 0,
//     fontSize: 16,
//     paddingTop: 12,
//     color: 'black',
//   },
//   placeholder: {
//     position: 'absolute',
//     left: 0,
//     top: 15,
//     fontSize: 16,
//     color: '#999',
//     zIndex: -1,
//   },
//   placeholderActive: {
//     top: -3,
//     fontSize: 12,
//     color: '#333',
//   },
//   button: {
//     backgroundColor: 'red',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop:10
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   showButton: {
//     position: 'absolute',
//     right: 0,
//     top: 15,
//   },

// });

// export default SignUp;

//-------------------main signup

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
} from 'react-native';
// import {Picker} from '@react-native-picker/picker';
// import { AuthContext } from '../Components/AuthContext';

const {width, height} = Dimensions.get('window');
const scale = width / 411.4285;
const scale1 = height / 826;

const SignUp = () => {
  const [activeSection, setActiveSection] = useState('login'); // State to manage active section

  const [loginDetails, setLoginDetails] = useState({
    contact_no: '',
    email_address: '',
    password: '',
    re_password: '',
  });
  // const { loginDetails, setLoginDetails } = useContext(AuthContext);

  const [otp, setOtp] = useState({
    email_otp: '',
    mobile_otp: '',
  });

  const [contactDetails, setContactDetails] = useState({
    customer_name: '',
    pincode: '',
    state: '',
    city: '',
    address_line1: '',
    address_line2: '',
    customer_type: 'End Customer',
    alternate_contact_no: '',
    contact_person: '',
    alternate_email_id: '',
  });

  const [checked, setChecked] = useState('');

  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const [secureEntry, setSecureEntry] = useState(true);

  const [isLoginDetailsValid, setIsLoginDetailsValid] = useState(false);

  const [isOtpValid, setIsOtpValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  let interval;

  useEffect(() => {
    console.log('Timer effect triggered');
    console.log('Current timer value:', timer);
    console.log('Resend disabled:', resendDisabled);
    if (isLoginDetailsValid && timer > 0 && resendDisabled) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 1) {
            clearInterval(interval);
            setResendDisabled(false); // Enable the resend button
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else if (timer === 0) {
      setResendDisabled(false);
      // Enable the resend button when the timer reaches 0
    }
    return () => clearInterval(interval);
  }, [isLoginDetailsValid, timer, resendDisabled]);

  const validateGSTNumber = gst_number => {
    // Check if GST number is provided
    if (!gst_number) {
      return false;
    }

    // Remove white spaces and convert to uppercase
    gst_number = gst_number.trim().toUpperCase();

    // GST number should be 15 characters long
    if (gst_number.length !== 15) {
      return false;
    }

    // GST number format regex pattern (example)
    const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{2}$/;

    if (!gstPattern.test(gst_number)) {
      return false;
    }

    // Additional validations can be added based on your region's GST number format

    // If all checks pass, return true
    return true;
  };

  // Function to validate contact number
  const validateContactNumber = contact_no => {
    // Check if contact number is provided
    if (!contact_no) {
      return false;
    }

    // Regular expression to match a valid 10-digit phone number
    const phonePattern = /^[0-9]{10}$/;

    // Test the contact number against the regular expression
    if (!phonePattern.test(contact_no)) {
      return false;
    }

    // If all checks pass, return true
    return true;
  };

  const validateEmailAddress = email_address => {
    // Regular expression pattern for validating email address
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email address against the regular expression
    return emailPattern.test(email_address);
  };

  const validatePassword = password => {
    // Minimum eight characters, at least one letter, one number and one special character
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    return passwordPattern.test(password);
  };

  const handleLoginDetailsSubmit = async () => {
    // Implement logic to handle login details submission
    // console.log('Login Details Submitted:', loginDetails);

    //validate gst number
    // if (checked === 'Yes') {
    //   const isValidGST = validateGSTNumber(loginDetails.gst_number);
    //   if (!isValidGST) {
    //     alert('Invalid GST number');
    //     return;
    //   }
    // }
    // //validate mobile no
    // const isValidContactNumber = validateContactNumber(loginDetails.contact_no);
    // if (!isValidContactNumber) {
    //   alert('Invalid contact number');
    //   return;
    // }

    // // Validate email address
    // const isValidEmail = validateEmailAddress(loginDetails.email_address);
    // if (!isValidEmail) {
    //   alert('Invalid email address');
    //   return;
    // }

    // // Validate password
    // const isValidPassword = validatePassword(loginDetails.password);
    // if (!isValidPassword) {
    //   alert(
    //     'Password must be at least 8 characters long, contain at least one number, one special character, and have a letter',
    //   );
    //   return;
    // }

    // // Validate re-entered password
    // if (loginDetails.password !== loginDetails.re_password) {
    //   alert('Passwords do not match');
    //   return;
    // }

    try {
      setLoading(true);
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISGetRegOTPEU/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mobile: loginDetails.contact_no,
            email: loginDetails.email_address,
            newpwd: loginDetails.password,
            confirmpwd: loginDetails.re_password,
          }),
        },
      );
      const result = await response.json();
      console.log(result);
      if (result.success == 1) {
        // Alert.alert(result.message);
        setIsLoginDetailsValid(true);

        setActiveSection('otp');
      } else if (result.success == 0) {
        Alert.alert(result.message);
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

  const handleOTPEnter = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISValidateRegOTPEU/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: loginDetails.email_address,
            email_otp: otp.email_otp,
            mobile: loginDetails.contact_no,
            mobile_otp: otp.mobile_otp,
          }),
        },
      );
      const result = await response.json();
      console.log(result);
      if (result.success == 1) {
        // Alert.alert(result.message);
        clearInterval(interval);
        setIsOtpValid(true);
        setActiveSection('contact');
      } else {
        // console.error('Error while doing registration:', result.error);
        Alert.alert('Error', 'Failed to register. Please try again.');
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

  const handleContactDetailsSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISRegSaveEU/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customer_name: contactDetails.customer_name,
            mobile_no: loginDetails.contact_no,
            email_id: loginDetails.email_address,
            pwd: loginDetails.password,
            contact_person: contactDetails.contact_person,
            alt_email_id: contactDetails.alternate_email_id,
            alt_mobile_no: contactDetails.alternate_contact_no,
            customer_type: contactDetails.customer_type,
            city: contactDetails.city,
            cityflag: 0,
            state: contactDetails.state,
            pincode: contactDetails.pincode,
            address1: contactDetails.address_line1,
            address2: contactDetails.address_line2,
          }),
        },
      );

      const result = await response.json();
      console.log(result);

      if (result.success == 1) {
        // Alert.alert(result.message);
      } else {
        // console.error('Error sending OTP:', result.error);
        Alert.alert('Error', 'Failed to send OTP. Please try again.');
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

  const handleResendOTP = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISGetRegOTPEU/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mobile: loginDetails.contact_no,
            email: loginDetails.email_address,
            newpwd: loginDetails.password,
            confirmpwd: loginDetails.re_password,
          }),
        },
      );

      const result = await response.json();
      console.log(result);

      if (result.success == 1) {
        setTimer(60);
        setResendDisabled(true);
        // OTP sent successfully
        // Navigate to the OTP screen or perform other actions
        // Alert.alert(result.message);
        // navigation.navigate('OTPEmail', { email: email ,usercode:usercode});
      } else if (result.success == 0) {
        Alert.alert(result.message);
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

  useEffect(() => {
    let timer;
    if (activeSection === 'contact' && contactDetails.pincode.length === 6) {
      timer = setTimeout(() => {
        fetchLocation(contactDetails.pincode);
      }, 500); // Delay API call for 500 milliseconds after the user stops typing
    }
    return () => clearTimeout(timer);
  }, [activeSection, contactDetails.pincode]);

  const fetchLocation = async pincode => {
    try {
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/GetCityStatePincode/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pincode: contactDetails.pincode,
          }),
        },
      );

      const result = await response.json();
      console.log(result);

      if (result.retstatus.success == 1) {
        // Alert.alert(result.retstatus.message);
        //  setContactDetails.city(result.Listdate[0].city);
        //  setContactDetails.state(result.Listdate[0].state);
        setContactDetails({
          ...contactDetails,
          city: result.Listdate[0].city,
          state: result.Listdate[0].state,
        });
      } else {
        // console.error('Error sending OTP:', result.error);
        Alert.alert('Error', 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      // console.error('Error:', error);
      Alert.alert(
        'An unexpected error occurred. Please try again later.',
      );
    }
  };

  const handlePincodeChange = pincode => {
    if (/^\d{0,6}$/.test(pincode)) {
      // Ensure that pincode is a 6-digit number
      setContactDetails({...contactDetails, pincode});
    }
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
            activeSection === 'login' && styles.activeHeaderItem,
          ]}
          // onPress={() => setActiveSection('login')}
        >
          <Text
            style={[
              styles.headerText,
              activeSection === 'login' && styles.activeHeaderText,
            ]}>
            Login Details
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.headerItem,
            activeSection === 'otp' && styles.activeHeaderItem,
            //!isLoginDetailsValid && styles.disabledHeaderItem,
          ]}
          //onPress={() => isLoginDetailsValid && setActiveSection('otp')}
          //disabled={!isLoginDetailsValid}
        >
          <Text
            style={[
              styles.headerText,
              activeSection === 'otp' && styles.activeHeaderText,
              //!isLoginDetailsValid && styles.disabledHeaderText,
            ]}>
            Enter OTP
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.headerItem,
            activeSection === 'contact' && styles.activeHeaderItem,
            //!isOtpValid && styles.disabledHeaderItem,
          ]}
          //onPress={() => isOtpValid && setActiveSection('contact')}
          //disabled={!isOtpValid}
        >
          <Text
            style={[
              styles.headerText,
              activeSection === 'contact' && styles.activeHeaderText,
              //!isOtpValid && styles.disabledHeaderText,
            ]}>
            Contact Details
          </Text>
        </TouchableOpacity>
      </View>

      {activeSection === 'login' && (
        <View style={styles.section}>
          <View style={styles.inputContainer}>
            <Text
              style={[
                styles.placeholder,
                loginDetails.contact_no ? styles.placeholderActive : '',
              ]}>
              Enter Contact No.*
            </Text>
            <TextInput
              style={styles.input}
              placeholder=""
              keyboardType="phone-pad"
              value={loginDetails.contact_no}
              onChangeText={text =>
                setLoginDetails({...loginDetails, contact_no: text})
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text
              style={[
                styles.placeholder,
                loginDetails.email_address ? styles.placeholderActive : '',
              ]}>
              Enter Email Address*
            </Text>
            <TextInput
              style={styles.input}
              placeholder=""
              value={loginDetails.email_address}
              onChangeText={text =>
                setLoginDetails({...loginDetails, email_address: text})
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Text
              style={[
                styles.placeholder,
                loginDetails.password ? styles.placeholderActive : '',
              ]}>
              Password*
            </Text>
            <TextInput
              style={styles.input}
              placeholder=""
              secureTextEntry={isSecureEntry}
              value={loginDetails.password}
              onChangeText={text =>
                setLoginDetails({...loginDetails, password: text})
              }
            />

            <TouchableOpacity
              style={styles.showButton}
              onPress={() => setIsSecureEntry(prev => !prev)}>
              <Text style={{color: '#7d7d7d'}}>
                {isSecureEntry ? 'show' : 'hide'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text
              style={[
                styles.placeholder,
                loginDetails.re_password ? styles.placeholderActive : '',
              ]}>
              Re-enter Password*
            </Text>
            <TextInput
              style={styles.input}
              placeholder=""
              secureTextEntry={secureEntry}
              value={loginDetails.re_password}
              onChangeText={text =>
                setLoginDetails({...loginDetails, re_password: text})
              }
            />

            <TouchableOpacity
              style={styles.showButton}
              onPress={() => setSecureEntry(prev => !prev)}>
              <Text style={{color: '#7d7d7d'}}>
                {secureEntry ? 'show' : 'hide'}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLoginDetailsSubmit}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}

      {activeSection === 'otp' && (
        <View style={styles.section}>
          <View style={styles.inputContainer}>
            <Text
              style={[
                styles.placeholder,
                loginDetails.contact_no ? styles.placeholderActive : '',
              ]}>
              Mobile Number
            </Text>
            <TextInput
              style={styles.input}
              editable={false}
              // placeholder=""
              value={loginDetails.contact_no}
              // onChangeText={(text) =>
              //   setLoginDetails({ ...loginDetails, contact_no: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text
              style={[
                styles.placeholder,
                loginDetails.email_address ? styles.placeholderActive : '',
              ]}>
              Email Id
            </Text>
            <TextInput
              style={styles.input}
              editable={false}
              // placeholder=""
              value={loginDetails.email_address}
              // onChangeText={(text) =>
              //   setLoginDetails({ ...loginDetails, email_address: text })
              // }
            />
          </View>

          <View style={styles.inputContainer}>
            <Text
              style={[
                styles.placeholder,
                otp.email_otp ? styles.placeholderActive : '',
              ]}>
              Enter Email OTP
            </Text>
            <TextInput
              style={styles.input}
              placeholder=""
              keyboardType="phone-pad"
              value={otp.email_otp}
              onChangeText={text =>
                setOtp(prevState => ({...prevState, email_otp: text}))
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Text
              style={[
                styles.placeholder,
                otp.mobile_otp ? styles.placeholderActive : '',
              ]}>
              Enter Mobile OTP
            </Text>
            <TextInput
              style={styles.input}
              placeholder=""
              keyboardType="phone-pad"
              value={otp.mobile_otp}
              onChangeText={text =>
                setOtp(prevState => ({...prevState, mobile_otp: text}))
              }
            />
          </View>

          {resendDisabled ? (
            <Text style={styles.resendText}>Resend OTP in {timer} seconds</Text>
          ) : (
            <TouchableOpacity
              style={styles.resendButton}
              onPress={handleResendOTP}
              disabled={resendDisabled}>
              <Text style={styles.resendButtonText}>Resend OTP</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.button} onPress={handleOTPEnter}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView>
        {activeSection === 'contact' && (
          <View style={styles.section}>
            {/* <View style={styles.inputContainer1}>
              <View style={styles.picker}>
                <Picker
                  selectedValue={contactDetails.customer_type}
                  style={styles.input1}
                  onValueChange={itemValue =>
                    setContactDetails({
                      ...contactDetails,
                      customer_type: itemValue,
                    })
                  }>
                  <Picker.Item label="Select Customer Type" value="" />
                  <Picker.Item label="End Customer" value="End Customer" />
                  <Picker.Item
                    label="SPP/Distributor/Partner"
                    value="Distributor"
                  />
                  <Picker.Item
                    label="System Integrator"
                    value="System Integrator"
                  />
                  <Picker.Item label="Retailer/Dealer" value="Dealer" />
                </Picker>
              </View>
            </View> */}

            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.placeholder,
                  contactDetails.customer_name ? styles.placeholderActive : '',
                ]}>
                {/* Customer Type */}
              </Text>
              <TextInput
                style={styles.input}
                placeholder=""
                value={contactDetails.customer_type}
                editable={false}
                // onChangeText={text =>
                //   setContactDetails({...contactDetails, customer_type: text})
                // }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.placeholder,
                  contactDetails.customer_name ? styles.placeholderActive : '',
                ]}>
                Customer/Company Name
              </Text>
              <TextInput
                style={styles.input}
                placeholder=""
                value={contactDetails.customer_name}
                onChangeText={text =>
                  setContactDetails({...contactDetails, customer_name: text})
                }
              />
            </View>

            {/* <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.placeholder,
                  loginDetails.gst_number ? styles.placeholderActive : '',
                ]}>
                GST No
              </Text>
              <TextInput
                style={styles.input}
                // placeholder=""
                value={loginDetails.gst_number}
                // onChangeText={(text) =>
                //   setLoginDetails({ ...loginDetails, gst_number: text })
                // }
                editable={false}
              />
            </View> */}

            {/* <View style={styles.inputContainer1}>
              <View style={styles.picker}>
              <Picker
                selectedValue={contactDetails.customer_type}
                style={styles.input1}
                onValueChange={itemValue =>
                  setContactDetails({
                    ...contactDetails,
                    customer_type: itemValue,
                  })
                }>
                <Picker.Item label="Select Customer Type" value="" />
                <Picker.Item label="End Customer" value="End Customer" />
                <Picker.Item label="SPP/Distributor/Partner" value="Distributor" />
                <Picker.Item label="System Integrator" value="System Integrator" />
                <Picker.Item label="Retailer/Dealer" value="Dealer" />
              </Picker>
              </View>
            </View> */}

            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.placeholder,
                  contactDetails.contact_person ? styles.placeholderActive : '',
                ]}>
                Contact Person*
              </Text>
              <TextInput
                style={styles.input}
                placeholder=""
                value={contactDetails.contact_person}
                onChangeText={text =>
                  setContactDetails({...contactDetails, contact_person: text})
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.placeholder,
                  contactDetails.alternate_contact_no
                    ? styles.placeholderActive
                    : '',
                ]}>
                Alternate Contact Number
              </Text>
              <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="phone-pad"
                value={contactDetails.alternate_contact_no}
                onChangeText={text =>
                  setContactDetails({
                    ...contactDetails,
                    alternate_contact_no: text,
                  })
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.placeholder,
                  contactDetails.alternate_email_id
                    ? styles.placeholderActive
                    : '',
                ]}>
                Alternate Email Id*
              </Text>
              <TextInput
                style={styles.input}
                placeholder=""
                value={contactDetails.alternate_email_id}
                onChangeText={text =>
                  setContactDetails({
                    ...contactDetails,
                    alternate_email_id: text,
                  })
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.placeholder,
                  contactDetails.pincode ? styles.placeholderActive : '',
                ]}>
                Pincode*
              </Text>
              <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="phone-pad"
                value={contactDetails.pincode}
                // onChangeText={text =>
                //   setContactDetails({...contactDetails, pincode: text})
                // }
                onChangeText={handlePincodeChange}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.placeholder,
                  contactDetails.city ? styles.placeholderActive : '',
                ]}>
                City*
              </Text>
              <TextInput
                style={styles.input}
                placeholder=""
                value={contactDetails.city}
                editable={false}
                // onChangeText={text =>
                //   setContactDetails({...contactDetails, city: text})
                // }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.placeholder,
                  contactDetails.state ? styles.placeholderActive : '',
                ]}>
                State*
              </Text>
              <TextInput
                style={styles.input}
                placeholder=""
                value={contactDetails.state}
                editable={false}
                // onChangeText={text =>
                //   setContactDetails({...contactDetails, state: text})
                // }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.placeholder,
                  contactDetails.address_line1 ? styles.placeholderActive : '',
                ]}>
                Address Line 1*
              </Text>
              <TextInput
                style={styles.input}
                placeholder=""
                value={contactDetails.address_line1}
                onChangeText={text =>
                  setContactDetails({...contactDetails, address_line1: text})
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.placeholder,
                  contactDetails.address_line2 ? styles.placeholderActive : '',
                ]}>
                Address Line 2
              </Text>
              <TextInput
                style={styles.input}
                placeholder=""
                value={contactDetails.address_line2}
                onChangeText={text =>
                  setContactDetails({...contactDetails, address_line2: text})
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.placeholder,
                  loginDetails.contact_no ? styles.placeholderActive : '',
                ]}>
                Mobile Number*
              </Text>
              <TextInput
                style={styles.input}
                editable={false}
                // placeholder=""
                value={loginDetails.contact_no}
                // onChangeText={(text) =>
                //   setLoginDetails({ ...loginDetails, contact_no: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.placeholder,
                  loginDetails.email_address ? styles.placeholderActive : '',
                ]}>
                Primary Email Id*
              </Text>
              <TextInput
                style={styles.input}
                editable={false}
                // placeholder=""
                value={loginDetails.email_address}
                // onChangeText={(text) =>
                //   setLoginDetails({ ...loginDetails, email_address: text })
                // }
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleContactDetailsSubmit}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20 * scale,
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
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10 * scale,
  },
  radioText: {
    marginLeft: 1 * scale,
    color: '#7d7d7d',
  },
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
    // borderWidth:1,
    // padding:2
  },
  activeHeaderItem: {
    // borderBottomWidth: 2 * scale,
    borderColor: 'red',
    borderWidth: 1,
  },
  activeHeaderText: {
    color: 'red',
  },
  section: {
    marginBottom: 10 * scale1,
  },
  // inputContainer1: {
  //   position: 'relative',
  //   marginBottom: 20 * scale1,
  //   marginLeft: 0,
  // },
  // picker: {
  //   marginLeft: 0 * scale,
  // },
  inputContainer: {
    position: 'relative',
    marginBottom: 12 * scale1,
  },
  // input1: {
  //   height: 40 * scale1,
  //   borderColor: '#ccc',
  //   width: '100%',
  //   color: '#555',
  // },
  input: {
    borderBottomWidth: 1 * scale,
    borderColor: '#a9a9a9',
    padding: 5 * scale,
    paddingLeft: 0,
    fontSize: 16 * scale,
    paddingTop: 12 * scale1,
    color: 'black',
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
  button: {
    backgroundColor: 'red',
    padding: 10 * scale,
    borderRadius: 5 * scale,
    alignItems: 'center',
    marginTop: 10 * scale1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
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
});

export default SignUp;

//--------------------------------------------

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions
// } from 'react-native';
// import {RadioButton} from 'react-native-paper';

// const { width, height } = Dimensions.get('window');
// const scale = width / 411.4285;
// const scale1 = height/826;

// const SignUp = () => {
//   const [activeSection, setActiveSection] = useState('login'); // State to manage active section

//   const [loginDetails, setLoginDetails] = useState({
//     gst_number: '',
//     contact_no: '',
//     email_address: '',
//     password: '',
//     re_password: '',
//   });

//   const [otp, setOtp] = useState({
//     email_otp: '',
//     mobile_otp: '',
//   });

//   const [contactDetails, setContactDetails] = useState({
//     customer_name: '',
//     pincode: '',
//     state: '',
//     city: '',
//     address_line1: '',
//     address_line2: '',
//     customer_type: '',
//     alternate_contact_no: '',
//     contact_person: '',
//     alternate_email_id: '',
//   });

//   const [checked, setChecked] = useState('');

//   const [isSecureEntry, setIsSecureEntry] = useState(true);

//   const [secureEntry, setSecureEntry] = useState(true);

//   const [isLoginDetailsValid, setIsLoginDetailsValid] = useState(false);

//   const [isOtpValid, setIsOtpValid] = useState(false);

//   const validateGSTNumber = gst_number => {
//     // Check if GST number is provided
//     if (!gst_number) {
//       return false;
//     }

//     // Remove white spaces and convert to uppercase
//     gst_number = gst_number.trim().toUpperCase();

//     // GST number should be 15 characters long
//     if (gst_number.length !== 15) {
//       return false;
//     }

//     // GST number format regex pattern (example)
//     const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{2}$/;

//     if (!gstPattern.test(gst_number)) {
//       return false;
//     }

//     // Additional validations can be added based on your region's GST number format

//     // If all checks pass, return true
//     return true;
//   };

//   // Function to validate contact number
//   const validateContactNumber = contact_no => {
//     // Check if contact number is provided
//     if (!contact_no) {
//       return false;
//     }

//     // Regular expression to match a valid 10-digit phone number
//     const phonePattern = /^[0-9]{10}$/;

//     // Test the contact number against the regular expression
//     if (!phonePattern.test(contact_no)) {
//       return false;
//     }

//     // If all checks pass, return true
//     return true;
//   };

//   const validateEmailAddress = email_address => {
//     // Regular expression pattern for validating email address
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     // Test the email address against the regular expression
//     return emailPattern.test(email_address);
//   };

//   const validatePassword = password => {
//     // Minimum eight characters, at least one letter, one number and one special character
//     const passwordPattern =
//       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

//     return passwordPattern.test(password);
//   };

//   const handleLoginDetailsSubmit = () => {
//     // Implement logic to handle login details submission
//     // console.log('Login Details Submitted:', loginDetails);

//     //validate gst number
//     if (checked === 'Yes') {
//       const isValidGST = validateGSTNumber(loginDetails.gst_number);
//       if (!isValidGST) {
//         alert('Invalid GST number');
//         return;
//       }
//     }
//     //validate mobile no
//     const isValidContactNumber = validateContactNumber(loginDetails.contact_no);
//     if (!isValidContactNumber) {
//       alert('Invalid contact number');
//       return;
//     }

//     // Validate email address
//     const isValidEmail = validateEmailAddress(loginDetails.email_address);
//     if (!isValidEmail) {
//       alert('Invalid email address');
//       return;
//     }

//     // Validate password
//     const isValidPassword = validatePassword(loginDetails.password);
//     if (!isValidPassword) {
//       alert(
//         'Password must be at least 8 characters long, contain at least one number, one special character, and have a letter',
//       );
//       return;
//     }

//     // Validate re-entered password
//     if (loginDetails.password !== loginDetails.re_password) {
//       alert('Passwords do not match');
//       return;
//     }
//     setIsLoginDetailsValid(true);

//     setActiveSection('otp');
//   };

//   const handleOTPEnter = () => {
//     // Check if both email OTP and mobile OTP match the expected values
//     //    if (otp.email_otp === expectedEmailOTP && otp.mobile_otp === expectedMobileOTP) {
//     //      // If OTPs match, proceed to the next page or perform any desired action
//     //     //console.log('OTP Entered:', otp);
//     //      // Navigate to the next page or execute further logic
//     //      setActiveSection('contact');
//     //     }

//     //  else {
//     //     // If OTPs do not match, display an error message to the user
//     //      alert('Entered OTPs do not match');
//     //   }
//     setIsOtpValid(true);
//     setActiveSection('contact');
//   };

//   const handleContactDetailsSubmit = () => {
//     // Implement logic to handle contact details submission
//     console.log('Contact Details Submitted:', contactDetails);
//   };

//   return (
//     <View style={styles.container}>

//       {activeSection === 'login' && (
//         <View style={styles.section}>
//           <View style={styles.mainradio}>
//             <Text style={styles.radiotype}>Do you have GST Number?</Text>
//             <View style={styles.radioOptions}>
//               <View style={styles.radioButton}>
//                 <RadioButton
//                   value="Yes"
//                   status={checked === 'Yes' ? 'checked' : 'unchecked'}
//                   onPress={() => setChecked('Yes')}
//                 />
//                 <Text style={styles.radioText}>Yes</Text>
//               </View>
//               <View style={styles.radioButton}>
//                 <RadioButton
//                   value="No"
//                   status={checked === 'No' ? 'checked' : 'unchecked'}
//                   onPress={() => setChecked('No')}
//                 />
//                 <Text style={styles.radioText}>No</Text>
//               </View>
//             </View>
//           </View>

//           {checked === 'Yes' && (
//             <View style={styles.inputContainer}>
//               <Text
//                 style={[
//                   styles.placeholder,
//                   loginDetails.gst_number ? styles.placeholderActive : '',
//                 ]}>
//                 Enter GST Number*
//               </Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder=""
//                 value={loginDetails.gst_number}
//                 onChangeText={text =>
//                   setLoginDetails({...loginDetails, gst_number: text})
//                 }
//                 //editable={checked === 'Yes'}
//               />
//             </View>
//           )}

//           <View style={styles.inputContainer}>
//             <Text
//               style={[
//                 styles.placeholder,
//                 loginDetails.contact_no ? styles.placeholderActive : '',
//               ]}>
//               Enter Contact No.*
//             </Text>
//             <TextInput
//               style={styles.input}
//               placeholder=""
//               keyboardType="phone-pad"
//               value={loginDetails.contact_no}
//               onChangeText={text =>
//                 setLoginDetails({...loginDetails, contact_no: text})
//               }
//             />
//           </View>
//           <View style={styles.inputContainer}>
//             <Text
//               style={[
//                 styles.placeholder,
//                 loginDetails.email_address ? styles.placeholderActive : '',
//               ]}>
//               Enter Email Address*
//             </Text>
//             <TextInput
//               style={styles.input}
//               placeholder=""
//               value={loginDetails.email_address}
//               onChangeText={text =>
//                 setLoginDetails({...loginDetails, email_address: text})
//               }
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text
//               style={[
//                 styles.placeholder,
//                 loginDetails.password ? styles.placeholderActive : '',
//               ]}>
//               Password*
//             </Text>
//             <TextInput
//               style={styles.input}
//               placeholder=""
//               secureTextEntry={isSecureEntry}
//               value={loginDetails.password}
//               onChangeText={text =>
//                 setLoginDetails({...loginDetails, password: text})
//               }
//             />

//             <TouchableOpacity
//               style={styles.showButton}
//               onPress={() => setIsSecureEntry(prev => !prev)}>
//               <Text style={{color:'#7d7d7d'}}>{isSecureEntry ? 'show' : 'hide'}</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.inputContainer}>
//             <Text
//               style={[
//                 styles.placeholder,
//                 loginDetails.re_password ? styles.placeholderActive : '',
//               ]}>
//               Re-enter Password*
//             </Text>
//             <TextInput
//               style={styles.input}
//               placeholder=""
//               secureTextEntry={secureEntry}
//               value={loginDetails.re_password}
//               onChangeText={text =>
//                 setLoginDetails({...loginDetails, re_password: text})
//               }
//             />

//             <TouchableOpacity
//               style={styles.showButton}
//               onPress={() => setSecureEntry(prev => !prev)}>
//               <Text style={{color:'#7d7d7d'}}>{secureEntry ? 'show' : 'hide'}</Text>
//             </TouchableOpacity>
//           </View>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={handleLoginDetailsSubmit}>
//             <Text style={styles.buttonText}>Next</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {activeSection === 'otp' && (
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

//           <TouchableOpacity style={styles.button} onPress={handleOTPEnter}>
//             <Text style={styles.buttonText}>Next</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       <ScrollView>
//         {activeSection === 'contact' && (
//           <View style={styles.section}>
//             <View style={styles.inputContainer}>
//               <Text
//                 style={[
//                   styles.placeholder,
//                   contactDetails.customer_name ? styles.placeholderActive : '',
//                 ]}>
//                 Customer Name*
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
//                   loginDetails.gst_number ? styles.placeholderActive : '',
//                 ]}>
//                 GST No
//               </Text>
//               <TextInput
//                 style={styles.input}
//                 // placeholder=""
//                 value={loginDetails.gst_number}
//                 // onChangeText={(text) =>
//                 //   setLoginDetails({ ...loginDetails, gst_number: text })
//                 // }
//                 editable={false}
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
//                 onChangeText={text =>
//                   setContactDetails({...contactDetails, pincode: text})
//                 }
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
//                 onChangeText={text =>
//                   setContactDetails({...contactDetails, state: text})
//                 }
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
//                 onChangeText={text =>
//                   setContactDetails({...contactDetails, city: text})
//                 }
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
//                   contactDetails.customer_type ? styles.placeholderActive : '',
//                 ]}>
//                 Customer Type*
//               </Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder=""
//                 value={contactDetails.customer_type}
//                 onChangeText={text =>
//                   setContactDetails({...contactDetails, customer_type: text})
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
//     flex: 1,
//     padding: 20 * scale,
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
//     color:'#7d7d7d'
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
//     color:'#7d7d7d'
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20 * scale1,
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
// });

// export default SignUp;
