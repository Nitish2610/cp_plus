import React, { useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Image,Alert,Dimensions,ActivityIndicator } from 'react-native';

const { width, height } = Dimensions.get('window'); 
const scale = width / 411.4285;
const scale1 = height/826;


const ForgotPassword= ({navigation,route}) => {
  const {usercode} = route.params;
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);


  const sendOTP = async (email) => {
    try {
      // Check if the email is in a valid format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert('Error', 'Please enter a valid email address');
        return;
      }
      // navigation.navigate('OTPEmail',{email:email});
      // Call your backend API to send OTP to the entered email
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
        // Alert.alert(result.message);
        navigation.navigate('OTPEmail', { email: email,usercode:usercode });
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
      <Text style={styles.header}>Forgot Password</Text>
      <Text style={styles.description}>Please enter your email to get OTP for creating new password.</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder='Enter your email'
          placeholderTextColor= '#7d7d7d'
          autoCorrect={false}
          value={email}
          onChangeText={enteredEmail => setEmail(enteredEmail)}
        />
      </View>

      <TouchableOpacity style={styles.button}  onPress={() => sendOTP(email)}>
        <Text style={styles.buttonText}>Send OTP</Text>
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
    marginTop: 10 * scale1,
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
    color:'#000000'
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
  }
});

export default ForgotPassword;