import React, {useEffect} from 'react';
//import ToggleSwitch from 'toggle-switch-react-native';
//import Switch from 'react-native-switch';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Switch,
  Dimensions,
  ActivityIndicator
} from 'react-native';
// import Checkbox from 'expo-checkbox';
import {useState} from 'react';

const { width, height } = Dimensions.get('window'); 
const scale = width / 411.4285;
const scale1= height/826;

// const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

// console.log(screenWidth);
// console.log(screenHeight);

const AppPro = ({navigation}) => {
  // const [agree, setAgree] = useState(false);
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const toggleSwitch = () => {
       setIsEnabled(previousState => !previousState);
       setuserName('');
       setPassword('');
  }
  // const submit = async () => {
  //   try {
  //     if(!isEnabled){
  //       setLoading(true);
  //     const response = await fetch(
  //       'http://devservice.adityagroup.com/aditya_service/rma/API_CPPLUS/login/login.php',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           username: userName,
  //           password: password,
  //           app_version: '1.0',
  //         }),
  //       },
  //     );

  //     console.log('Response Status:', response.status);

  //     const result = await response.json();
  //     console.log('Response Content:', result);
  //     ////setLoading(false);

  //     if (result.success) {
  //      //// setLoading(false);
  //       Alert.alert(`Thank you ${userName}`);
  //       const usercode = result.usercode; //storing result.usercode
  //       //console.log(usercode);
  //       const token = result.token; //storing result.token
  //       // console.log(token);
  //       const userData = result;
  //       // setUserData(result);
  //       //console.log(result);
  //       navigation.navigate('Home', {
  //         userData: result,
  //         usercode: usercode,
  //         token: token,
  //         username:userName
  //       }); //passing usercode and token
  //     } else {
  //      //// setLoading(false);
  //       Alert.alert(result.message || 'Login failed');
  //     }
  //   }
  //     else {
  //       // OTP sending logic
  //       // Implement the logic to send OTP
  //       // For example, you can navigate to another screen for OTP input
  //       if (userName.length !== 10) {
  //         Alert.alert('Error', 'Mobile number should be 10 digits');
  //         return;
  //       }
  //       else{
  //       const send_OTP = async (mobileNumber) => {
  //         try {
  //           setLoading(true);
  //           const response = await fetch('http://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISLoginEUOTP/', {
  //             method: 'POST',
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({
  //               mobile: mobileNumber,
  //             }),
  //           });
        
  //           const result = await response.json();
  //           ////setLoading(false);
        
  //           if (response.ok) {
  //             ////setLoading(false);
  //             // OTP sent successfully
  //             // You can navigate to the OTP screen or perform other actions
  //             navigation.navigate('OTPScreen', { mobile: mobileNumber });
  //           } else {
  //            //// setLoading(false);
  //             // Handle error cases, e.g., display an error message
  //             console.error('Error sending OTP:', result.error);
  //             // You may also want to show an alert or other UI feedback
  //           }
  //         } catch (error) {
  //           ////setLoading(false);
  //           console.error('Error:', error);
  //           // Handle network errors or other exceptions
  //           // You may also want to show an alert or other UI feedback
  //         }
  //         finally{
  //           setLoading(false);
  //         }
  //       };
  //       // Call the sendOTP function when you want to send OTP
  //       send_OTP(userName); // Assuming userName is the mobile number
        
  //       //navigation.navigate('OTPScreen', { mobileNumber: userName });
  //     }
  //   } 
  // }catch (error) {
  //    //// setLoading(false);
  //     console.error('Error:', error);
  //     Alert.alert('An error occurred. Please try again later.');
  //   }
  //   finally{
  //     setLoading(false);
  //   }
  // };

  const submit = async () => {
    if(!isEnabled){
    try {
        setLoading(true);
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/GetLoginCustomer/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: userName,
            password: password,
            app_version: '1.0',
          }),
        },
      );

      console.log('Response Status:', response.status);

      const result = await response.json();
      console.log('Response Content:', result);
      ////setLoading(false);

      if (result.success) {
       //// setLoading(false);
        // Alert.alert(`Thank you ${userName}`);
        const usercode = result.usercode; //storing result.usercode
        //console.log(usercode);
        const token = result.token; //storing result.token
        // console.log(token);
        const userData = result;
        // setUserData(result);
        //console.log(result);
        navigation.navigate('Home', {
          userData: result,
          usercode: usercode,
          token: token,
          username:userName,
          password: password
        }); //passing usercode and token
      } else {
       //// setLoading(false);
        Alert.alert(result.message || 'Login failed');
      }
  }catch (error) {
     //// setLoading(false);
      // console.error('Error:', error);
      Alert.alert('An error occurred. Please try again later.');
    }
    finally{
      setLoading(false);
    }
  }
  else {
    // OTP sending logic
    // Implement the logic to send OTP
    // For example, you can navigate to another screen for OTP input
    if (userName.length !== 10) {
      Alert.alert('Error', 'Mobile number should be 10 digits');
      return;
    }
    else{
    // const send_OTP = async (mobileNumber) => {
      try {
        setLoading(true);
        const response = await fetch('https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISLoginEUOTP/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mobile: userName,
          }),
        });
    
        const result = await response.json();
        ////setLoading(false);
    
        if (result.success) {
          ////setLoading(false);
          // OTP sent successfully
          // You can navigate to the OTP screen or perform other actions
          navigation.navigate('OTPScreen', { mobile: userName });
        } else {
         //// setLoading(false);
          // Handle error cases, e.g., display an error message
          // console.error('Error sending OTP:', result.error);
          Alert.alert("Invalid Mobile Number");
          // You may also want to show an alert or other UI feedback
        }
      } catch (error) {
        ////setLoading(false);
        // console.error('Error:', error);
        Alert.alert('An error occurred. Please try again later.');
        // Handle network errors or other exceptions
        // You may also want to show an alert or other UI feedback
      }
      finally{
        setLoading(false);
      }
    };
    // Call the sendOTP function when you want to send OTP
    // send_OTP(userName); // Assuming userName is the mobile number
    
    //navigation.navigate('OTPScreen', { mobileNumber: userName });
  }
  // }
}


  return (
    <View style={styles.maincontainer}>
       {loading && (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )}
      <View style={styles.cp_logo}>
        <Image source={require('../Images/cp.jpg')} style={styles.logo_cp}/>
      </View>
      <View style={styles.mainheadercontainer}>
        <View style={styles.leftContainer}>
          <Image
            source={require('../Images/intelli_logo.jpg')}
            style={styles.logo}
          />
        </View>
      </View>
      <Text style={styles.mainHeader}>Login</Text>
      <Text style={styles.description}>Please login to your account.</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.labels}>{isEnabled ? 'Enter mobile number' : 'Enter email/mobile'}</Text>
        <TextInput
          style={styles.inputStyle}
          autoCapitalize={isEnabled ? 'none' : 'words'}
          placeholder={isEnabled ? 'Enter mobile number' : 'Enter email/mobile'}
          keyboardType={isEnabled ? 'numeric' : 'default'}
          placeholderTextColor= '#7d7d7d'
          autoCorrect={false}
          value={userName}
          onChangeText={(actualData) =>setuserName(actualData)}
        />
      </View>
      {!isEnabled && (
         <View style={styles.inputContainer}>
         <Text style={styles.labels}>Password</Text>
         <View style={styles.passwordInputContainer}>
           <TextInput
             style={[styles.inputStyle, {borderWidth: 0}]}
             autoCapitalize="none"
             placeholder='Enter Password'
             placeholderTextColor= '#7d7d7d'
             autoCorrect={false}
             secureTextEntry={isSecureEntry}
             value={password}
             onChangeText={actualData => setPassword(actualData)}
           />
           <TouchableOpacity
             style={styles.showButton}
             onPress={() => setIsSecureEntry(prev => !prev)}>
             <Text style={{color:'#7d7d7d'}}>{isSecureEntry ? 'show' : 'hide'}</Text>
           </TouchableOpacity>
         </View>
       </View>
      )}
      <View style={styles.toggle}>
      <View style={styles.toggleContainer}>
        <Text style={styles.text}>Login with OTP</Text>
        <Switch
          thumbColor={isEnabled ? '#00ff00' : '#ff0000'}
          trackColor={{ false: '#CCCCCC', true: '#CCCCCC' }}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword',{usercode: userName})}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
      <TouchableOpacity
        onPress={() => submit()}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.wrapper}>
        <Text style={styles.wrappertext}> Don't have an account? </Text>
          <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
          <Text style={{ color: 'red', fontWeight: 'bold'}}>Sign Up</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   maincontainer: {
//     height: '100%',
//     paddingHorizontal: 30,
//     paddingTop: 10,
//     backgroundColor: '#fff',
//   },
//   mainheadercontainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   cp_logo: {
//     marginLeft: 240,
//   },
//   logo_cp: {
//     width: 120,
//     height: 40,
//     resizeMode: 'contain',
//   },
//   logo: {
//     width: 200,
//     height: 70,
//     resizeMode: 'contain',
//   },
//   leftContainer: {
//     marginRight: 16,
//   },
//   rightContainer: {},
//   rightText: {
//     fontSize: 16,
//   },
//   mainHeader: {
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
//     paddingBottom: 5,
//     lineHeight: 25,
//     fontFamily: 'regular',
//   },
//   inputContainer: {
//     marginTop: 10,
//   },
//   labels: {
//     fontSize: 18,
//     color: '#7d7d7d',
//     marginTop: 10,
//     marginBottom: 5,
//     lineHeight: 25,
//     fontFamily: 'regular',
//   },
//   passwordInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(0,0,0,0.3)',
//     borderRadius: 1,
//   },
//   showButton: {
//     position: 'absolute',
//     right: 5,
//     padding: 10,
//   },
//   inputStyle: {
//     borderWidth: 1,
//     borderColor: 'rgba(0,0,0,0.3)',
//     paddingHorizontal: 15,
//     paddingVertical: 7,
//     borderRadius: 1,
//     fontFamily: 'regular',
//     fontSize: 18,
//     color: '#000000',
//   },
//   text:{
//     marginLeft:5,
//     paddingRight:10,
//     fontWeight:'500',
//     paddingTop:3
//   },
//   toggle:{
//     paddingTop:20,
//   },
//   toggleContainer: {
//     flexDirection: 'row',
//   },
//   forgot:{
//    color:'red',
//    paddingLeft:15,
//    paddingTop:3,
//    fontWeight: '700',
//    paddingLeft:30
//   },
//   wrapper: {
//     paddingTop: 20,
//     marginTop:20,
//     flexDirection: 'row',
//     justifyContent: 'center', 
//     alignItems: 'center', 
//   },
//   wrappertext: {
//     color: '#7d7d7d',
//   },
//   buttonStyle: {
//     marginTop: 20,
//   },
//   buttonText: {
//     marginTop:15,
//     textAlign: 'center',
//     backgroundColor:'red',
//     padding:8,
//     color:'white',
//     fontWeight:'700'
//   },
// });

// const styles = StyleSheet.create({
//   maincontainer: {
//     flex: 1,
//     paddingHorizontal: width * 0.08,
//     paddingTop: height * 0.012,
//     backgroundColor: '#fff',
//   },
//   mainheadercontainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: width * 0.04,
//     paddingTop: height * 0.02,
//   },
//   cp_logo: {
//     marginLeft: width * 0.58,
//   },
//   logo_cp: {
//     width: width * 0.29,
//     height: height * 0.048,
//     resizeMode: 'contain',
//   },
//   logo: {
//     width: width * 0.48,
//     height: height * 0.084,
//     resizeMode: 'contain',
//   },
//   leftContainer: {
//     marginRight: width * 0.04,
//   },
//   mainHeader: {
//     fontSize: width * 0.06,
//     color: '#344055',
//     fontWeight: '500',
//     paddingTop: height * 0.024,
//     paddingBottom: height * 0.009,
//     textTransform: 'capitalize',
//     fontFamily: 'bold',
//   },
//   description: {
//     fontSize: width * 0.048,
//     color: '#7d7d7d',
//     paddingBottom: height * 0.006,
//     lineHeight: height * 0.03,
//     fontFamily: 'regular',
//   },
//   inputContainer: {
//     marginTop: height * 0.01,
//   },
//   labels: {
//     fontSize: width * 0.045,
//     color: '#7d7d7d',
//     marginTop: height * 0.01,
//     marginBottom: height * 0.005,
//     lineHeight: height * 0.025,
//     fontFamily: 'regular',
//   },
//   passwordInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(0,0,0,0.3)',
//     borderRadius: 1,
//   },
//   showButton: {
//     position: 'absolute',
//     right: width * 0.0125,
//     padding: width * 0.025,
//   },
//   inputStyle: {
//     borderWidth: 1,
//     borderColor: 'rgba(0,0,0,0.3)',
//     paddingHorizontal: width * 0.0375,
//     paddingVertical: height * 0.0085,
//     borderRadius: 1,
//     fontFamily: 'regular',
//     fontSize: width * 0.045,
//     color: '#000000',
//   },
//   text: {
//     marginLeft: width * 0.0125,
//     paddingRight: width * 0.025,
//     fontWeight: '500',
//     paddingTop: height * 0.004,
//   },
//   toggle: {
//     paddingTop: height * 0.025,
//   },
//   toggleContainer: {
//     flexDirection: 'row',
//   },
//   forgot: {
//     color: 'red',
//     paddingLeft: width * 0.0375,
//     paddingTop: height * 0.004,
//     fontWeight: '700',
//   },
//   wrapper: {
//     paddingTop: height * 0.02,
//     marginTop: height * 0.01,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   wrappertext: {
//     color: '#7d7d7d',
//   },
//   buttonStyle: {
//     marginTop: height * 0.04,
//   },
//   buttonText: {
//     marginTop: height * 0.03,
//     textAlign: 'center',
//     backgroundColor: 'red',
//     padding: width * 0.025,
//     color: 'white',
//     fontWeight: '700'
//   },
// });

// const styles = StyleSheet.create({
//   maincontainer: {
//     height: '100%',
//     paddingHorizontal: 30 * width / 411.4285,
//     paddingTop: 10 * height / 826,
//     backgroundColor: '#fff',
//   },
//   loader: {
//     ...StyleSheet.absoluteFillObject,
//     //justifyContent: 'center',
//     //alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.1)', // Semi-transparent background
//   },
//   mainheadercontainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 16 * width / 411.4285,
//     paddingTop: 16 * height / 826,
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 5 * height / 826,
//   },
//   cp_logo: {
//     marginLeft: 240 * width / 411.4285,
//   },
//   logo_cp: {
//     width: 120 * width / 411.4285,
//     height: 40 * height / 826,
//     resizeMode: 'contain',
//   },
//   logo: {
//     width: 200 * width / 411.4285,
//     height: 70 * height / 826,
//     resizeMode: 'contain',
//   },
//   leftContainer: {
//     marginRight: 16 * width / 411.4285,
//   },
//   rightContainer: {},
//   rightText: {
//     fontSize: 16 * width / 411.4285,
//   },
//   mainHeader: {
//     fontSize: 25 * width / 411.4285,
//     color: '#344055',
//     fontWeight: '500',
//     paddingTop: 20 * height / 826,
//     paddingBottom: 8 * height / 826,
//     textTransform: 'capitalize',
//     fontFamily: 'bold',
//   },
//   description: {
//     fontSize: 20 * width / 411.4285,
//     color: '#7d7d7d',
//     paddingBottom: 5 * height / 826,
//     lineHeight: 25 * height / 826,
//     fontFamily: 'regular',
//   },
//   inputContainer: {
//     marginTop: 10 * height / 826,
//   },
//   labels: {
//     fontSize: 18 * width / 411.4285,
//     color: '#7d7d7d',
//     marginTop: 10 * height / 826,
//     marginBottom: 5 * height / 826,
//     lineHeight: 25 * height / 826,
//     fontFamily: 'regular',
//   },
//   passwordInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(0,0,0,0.3)',
//     borderRadius: 1,
//   },
//   showButton: {
//     position: 'absolute',
//     right: 5 * width / 411.4285,
//     padding: 10 * width / 411.4285,
//   },
//   inputStyle: {
//     borderWidth: 1,
//     borderColor: 'rgba(0,0,0,0.3)',
//     paddingHorizontal: 15 * width / 411.4285,
//     paddingVertical: 7 * height / 826,
//     borderRadius: 1,
//     fontFamily: 'regular',
//     fontSize: 18 * width / 411.4285,
//     color: '#000000',
//   },
//   text: {
//     marginLeft: 5 * width / 411.4285,
//     paddingRight: 10 * width / 411.4285,
//     fontWeight: '500',
//     paddingTop: 3 * height / 826,
//   },
//   toggle: {
//     paddingTop: 20 * height / 826,
//   },
//   toggleContainer: {
//     flexDirection: 'row',
//   },
//   forgot: {
//     color: 'red',
//     paddingLeft: 15 * width / 411.4285,
//     paddingTop: 3 * height / 826,
//     fontWeight: '700',
//   },
//   wrapper: {
//     paddingTop: 20 * height / 826,
//     marginTop: 10 * height / 826,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   wrappertext: {
//     color: '#7d7d7d',
//   },
//   buttonStyle: {
//     marginTop: 20 * height / 826,
//   },
//   buttonText: {
//     marginTop: 15 * height / 826,
//     textAlign: 'center',
//     backgroundColor: 'red',
//     padding: 8 * width / 411.4285,
//     color: 'white',
//     fontWeight: '700'
//   },
// });

const styles = StyleSheet.create({
  maincontainer: {
    height: '100%',
    paddingHorizontal: 30 * scale,
    paddingTop: 10 * scale1,
    backgroundColor: '#fff',
  },
  mainheadercontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16 * scale,
    paddingTop: 16 * scale1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5 * scale1,
  },
  cp_logo: {
    marginLeft: 240 * scale,
  },
  logo_cp: {
    width: 120 * scale,
    height: 40 * scale1,
    resizeMode: 'contain',
  },
  logo: {
    width: 200 * scale,
    height: 70 * scale1,
    resizeMode: 'contain',
  },
  leftContainer: {
    marginRight: 16 * scale,
  },
  rightContainer: {},
  rightText: {
    fontSize: 16 * scale,
  },
  mainHeader: {
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
    paddingBottom: 5 * scale1,
    lineHeight: 25 * scale1,
    fontFamily: 'regular',
  },
  inputContainer: {
    marginTop: 10 * scale1,
  },
  labels: {
    fontSize: 18 * scale,
    color: '#7d7d7d',
    marginTop: 10 * scale1,
    marginBottom: 5 * scale1,
    lineHeight: 25 * scale1,
    fontFamily: 'regular',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1 * scale,
    borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 1 * scale,
  },
  showButton: {
    position: 'absolute',
    right: 5 * scale,
    padding: 10 * scale1
  },
  inputStyle: {
    borderWidth: 1 * scale,
    borderColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 15 * scale,
    paddingVertical: 7 * scale1,
    borderRadius: 1 * scale,
    fontFamily: 'regular',
    fontSize: 18 * scale,
    color:'#000000'
  },
  text:{
    marginLeft:5 * scale,
    paddingRight:10 * scale,
    fontWeight:'500',
    paddingTop:3 * scale1,
    color:'#7d7d7d'
  },
  toggle:{
    paddingTop:20 * scale1,
  },
  toggleContainer: {
    flexDirection: 'row',
  },
  forgot:{
    color:'red',
    paddingLeft:15 * scale,
    paddingTop:3 * scale1,
    fontWeight: '700',
    paddingLeft:30 * scale
  },
  wrapper: {
    paddingTop: 20 * scale1,
    marginTop:20 * scale1,
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  wrappertext: {
    color: '#7d7d7d',
  },
  buttonStyle: {
    marginTop: 20 * scale1,
  },
  buttonText: {
    marginTop:15 * scale1,
    textAlign: 'center',
    backgroundColor:'red',
    padding:8 * scale,
    color:'white',
    fontWeight:'700'
  },
});

export default AppPro;