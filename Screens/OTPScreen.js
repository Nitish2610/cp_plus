// OTPScreen.js

import React, {useState, useEffect,useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  ActivityIndicator
} from 'react-native';

const {width, height} = Dimensions.get('window');
const scale = width / 411.4285;
const scale1 = height / 826;

const OTPScreen = ({navigation, route}) => {
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const [loading, setLoading] = useState(false);

  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  let interval;

  useEffect(() => {
    console.log("Timer effect triggered");
    console.log("Current timer value:", timer);
    console.log("Resend disabled:", resendDisabled);
    if (timer > 0 && resendDisabled) {
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
      setResendDisabled(false); // Enable the resend button when the timer reaches 0
    }
    return () => clearInterval(interval);
  }, [timer, resendDisabled]);

  const handleResendOTP = async () => {
    const {mobile} = route.params;
    // if (!otp) {
    //   Alert.alert('OTP Required', 'Please enter the OTP.');
    //   return;
    // }

    // try {
    //   setLoading(true);
    //   const response = await fetch(
    //     'http://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISValidateLoginEUOTP/',
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         mobile: mobile,
    //         otp: otp,
    //       }),
    //     },
    //   );

    //   const result = await response.json();
    //   //  console.log(result);
    //   if (result.success) {
    //     console.log('OTP verification successful');
    //     navigation.navigate('Home', {mobile: mobile});
    //   } else {
    //     console, log('OTP verification failed', result.error);
    //     Alert.alert('Invalid OTP Please try again later');
    //   }
    // } catch {
    //   // console.error("Error verifying Otp",error);
    //   Alert.alert('An error occured while verifying Otp');
    // } finally {
    //   setLoading(false);
    // }
    try {
      setLoading(true);
      const response = await fetch('https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISLoginEUOTP/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: mobile,
        }),
      });
  
      const result = await response.json();
  
      if (result.success) {
        // console.log("OTP Sent");
      } else {
        Alert.alert("Invalid Mobile Number");
      }
    } catch (error) {
      // console.error('Error:', error);
      Alert.alert("network error");
    }
    finally{
      setLoading(false);
    }
    setTimer(60); // Reset the timer
    setResendDisabled(true); // Disable the resend button again
  };

  const verifyOTP = async () => {
    const {mobile} = route.params;
    const otpValue = otp.join('');
    if (!otp) {
      Alert.alert('OTP Required', 'Please enter the OTP.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISValidateLoginEUOTP/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mobile: mobile,
            otp: otpValue,
          }),
        },
      );

      const result = await response.json();
      //  console.log(result);
      if (result.success) {
        const token = result.token;
        const username = result.usercode;
        // console.log('OTP verification successful');
        clearInterval(interval);
        navigation.navigate('Home', {mobile: mobile,token:token,username:username});
      } else {
        // console, log('OTP verification failed', result.error);
        Alert.alert('Invalid OTP Please try again later');
      }
    } catch {
      // console.error("Error verifying Otp",error);
      Alert.alert('An error occured while verifying Otp');
    } finally {
      setLoading(false);
    }
    //console.log('Verifying OTP:', otp);
  };

  
  const handleOTPChange = (index, value) => {
    if (!isNaN(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      // Move to the next input box if value is entered
      if (index < refs.length - 1 && value !== '') {
        refs[index + 1].current.focus();
      }
    }
  };

  const handleBackspace = (index, event) => {
    if (event.nativeEvent.key === 'Backspace') {
      // Handle backspace
      const newOTP = [...otp];
      newOTP[index] = '';
      setOTP(newOTP);

      // Move focus to previous box
      if (index > 0 && newOTP[index] === '') {
        refs[index - 1].current.focus();
      }
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const clipboardData = event.clipboardData || window.clipboardData;
    if (clipboardData) {
      const pastedText = clipboardData.getData('text/plain').replace(/\D/g, '');
      const newOTP = pastedText.split('').slice(0, 6);
      const updatedOTP = newOTP.concat(new Array(6 - newOTP.length).fill(''));
      setOTP(updatedOTP);
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <View style={styles.cp_logo}>
        <Image source={require('../Images/cp.jpg')} style={styles.logo_cp} />
      </View>
      <View style={styles.mainheadercontainer}>
        <View style={styles.leftContainer}>
          <Image
            source={require('../Images/intelli_logo.jpg')}
            style={styles.logo}
          />
        </View>
      </View>
      <Text style={styles.header}>Enter OTP</Text>
      <Text style={styles.description}>
        Please enter the OTP sent to your{' '}
        <Text style={styles.boldText}>{route.params.mobile}</Text>.
      </Text>
      <View style={styles.inputContainer}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={refs[index]}
          style={styles.input}
          maxLength={1}
          value={digit}
          keyboardType="numeric"
          onChangeText={(value) => handleOTPChange(index, value)}
          onKeyPress={(event) => handleBackspace(index, event)}
          onPaste={(event) => handlePaste(event)}
          contextMenuHidden={true}
        />
      ))}
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

      <TouchableOpacity style={styles.button} onPress={verifyOTP}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 30,
//     paddingTop: 10,
//     backgroundColor: '#fff',
//   },
//   logo: {
//     width: 200,
//     height: 70,
//     resizeMode: 'contain',
//   },
//   cp_logo: {
//     marginLeft: 240,
//   },
//   logo_cp: {
//     width: 120,
//     height: 40,
//     resizeMode: 'contain',
//   },
//   leftContainer: {
//     marginRight: 16,
//   },
//   mainheadercontainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   header: {
//     fontSize: 25,
//     color: '#344055',
//     fontWeight: '500',
//     paddingTop: 20,
//     paddingBottom: 8,
//     textTransform: 'capitalize',
//     fontFamily: 'bold',
//   },
//   description: {
//     fontSize: 20,
//     color: '#7d7d7d',
//     paddingBottom: 20,
//     lineHeight: 25,
//     fontFamily: 'regular',
//   },
//   inputContainer: {
//     marginTop: 10,
//   },
//   label: {
//     fontSize: 18,
//     color: '#7d7d7d',
//     marginTop: 10,
//     marginBottom: 5,
//     lineHeight: 25,
//     fontFamily: 'regular',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: 'rgba(0,0,0,0.3)',
//     paddingHorizontal: 15,
//     paddingVertical: 7,
//     borderRadius: 1,
//     fontFamily: 'regular',
//     fontSize: 18,
//     color: '#000000',
//   },
//   button: {
//     marginTop: 20,
//     backgroundColor: 'red',
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     textAlign: 'center',
//     color: 'white',
//     fontWeight: '700',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30 * scale,
    paddingTop: 10 * scale1,
    backgroundColor: '#fff',
  },
  logo: {
    width: 200 * scale,
    height: 70 * scale1,
    resizeMode: 'contain',
  },
  cp_logo: {
    marginLeft: 240 * scale,
  },
  logo_cp: {
    width: 120 * scale,
    height: 40 * scale1,
    resizeMode: 'contain',
  },
  leftContainer: {
    marginRight: 16 * scale,
  },
  mainheadercontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16 * scale,
    paddingTop: 16 * scale1,
  },
  header: {
    fontSize: 25 * scale,
    color: '#344055',
    fontWeight: '500',
    paddingTop: 20 * scale1,
    paddingBottom: 8 * scale1,
    textTransform: 'capitalize',
    fontFamily: 'bold',
  },
  description: {
    fontSize: 20 * scale,
    color: '#7d7d7d',
    paddingBottom: 20 * scale1,
    lineHeight: 25 * scale1,
    fontFamily: 'regular',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 18 * scale,
    color: '#7d7d7d',
    marginTop: 10 * scale1,
    marginBottom: 5 * scale1,
    lineHeight: 25 * scale1,
    fontFamily: 'regular',
  },
  input: {
    borderWidth: 1 * scale,
    borderColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 15 * scale,
    paddingVertical: 7 * scale1,
    borderRadius: 1 * scale,
    fontFamily: 'regular',
    fontSize: 18 * scale,
    color: '#000000',
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
  boldText: {
    fontWeight: 'bold',
  },
  resendText: {
    fontSize: 16*scale,
    color: 'black',
    marginTop: 10*scale1,
  },
  resendButton: {
    backgroundColor: 'blue',
    padding: 10*scale,
    borderRadius: 5*scale,
    marginTop: 10*scale1,
  },
  resendButtonText: {
    color: 'white',
    fontSize: 16*scale,
    textAlign: 'center',
  }
});

export default OTPScreen;
