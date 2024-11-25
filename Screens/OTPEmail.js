import React, { useState ,useEffect,useRef} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions,ActivityIndicator ,Alert} from 'react-native';

const { width, height } = Dimensions.get('window'); 
const scale = width / 411.4285;
const scale1 = height/826;

const OTPEmail = ({navigation,route}) => {
  const {email,usercode} = route.params;
  const [loading, setLoading] = useState(false);
  
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

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
    const {email} = route.params;
    // console.log(email);
    try {
      setLoading(true);
      const response = await fetch('https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISGetForgotPasswordOTP/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });
  
      const result = await response.json();
      console.log(result);
  
      if (result.success==1) {
        // OTP sent successfully
        // Navigate to the OTP screen or perform other actions
        //  Alert.alert(result.message);
        // navigation.navigate('OTPEmail', { email: email ,usercode:usercode});
      } else {
        // Handle error cases, e.g., display an error message
        // console.error('Error sending OTP:', result.error);
        // You may also want to show an alert or other UI feedback
        Alert.alert('Error', 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      // console.error('Error:', error);
      // Handle network errors or other exceptions
      // You may also want to show an alert or other UI feedback
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }finally{
      setLoading(false);
    }
    setTimer(60); // Reset the timer
    setResendDisabled(true); // Disable the resend button again
  };

  const verifyOTP = async () => {
    // Implement logic to verify OTP
    // You can use the same API endpoint or a different one for this functionality
    // Update the logic based on your backend requirements
    console.log('Verifying OTP:', otp);
    const {email} = route.params;
    const otpValue = otp.join('');
    try{
      setLoading(true);
      const response = await fetch('https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISValidateFgtPwdOTP/',
      {
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify({
         email:email,
         otp:otpValue
        }),
      },
      )
      console.log('Response Status',response.status);
      const result = await response.json();
      console.log('Response Content:', result);

      if(result.success==1){
        // Alert.alert(result.message);
        clearInterval(interval);
        // setTimeout(() => {
           navigation.navigate('ResetPassword',{usercode:usercode,email:email});
        // }, 2000);
      }else if(result.success==0){
        Alert.alert(result.message);
      }
    }catch(error){
      // console.error('Error:', error);
      Alert.alert('An error occurred. Please try again later.');
    }finally{
      setLoading(false);
    }
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
      <Text style={styles.description}>Please enter the OTP sent to your email.</Text>

      {/* <View style={styles.inputContainer}>
        <Text style={styles.label}>OTP</Text>
        <TextInput
          style={styles.input}
          value={otp}
          onChangeText={enteredOTP => setOTP(enteredOTP)}
        />
      </View> */}
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
  // inputContainer: {
  //   marginTop: 10 * scale1,
  // },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    margin: 5,
    textAlign: 'center',
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

export default OTPEmail;