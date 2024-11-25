import React, {useState,useContext} from 'react';
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
// import { AuthContext } from '../Components/AuthContext';

const {width, height} = Dimensions.get('window');
const scale = width / 411.4285;
const scale1 = height / 826;

const ChangePassword = ({navigation,route}) => {
  const {username,token} = route.params;
    // const [loginDetails, setLoginDetails] = useState({
    //     gst_number: '',
    //     contact_no: '',
    //     email_address: '',
    //     password: '',
    //     re_password: '',
    //     re_new_password:''
    //   });

    // const { loginDetails, setLoginDetails } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const [oldPassword, setOldPassword] = useState('');
    
    const [passwordData, setPasswordData] = useState({
      newPassword: '',
      confirmPassword: '',
    });
      
      const [isSecureEntry, setIsSecureEntry] = useState(true);
      const [secureEntry, setSecureEntry] = useState(true);
      const [secure1Entry, setSecure1Entry] = useState(true);

      const PasswordSave = async () =>{
          try{
            setLoading(true);
            const response = await fetch('https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISChangePassword/',
            {
              method:'POST',
              headers:{
                'Content-type':'application/json'
              },
              body:JSON.stringify({
                username:username,
                old_pwd:oldPassword,
                new_pwd:passwordData.newPassword,
                confirm_new_pwd:passwordData.confirmPassword,
                token:token
              }),
            },
            )
            console.log('Response Status',response.status);
            const result = await response.json();
            console.log('Response Content:', result);

            if(result.retstatus.success==1){
              // Alert.alert(result.retstatus.message);
              setTimeout(() => {
                navigation.navigate('Login');
              }, 2000);
            }else if(result.retstatus.success==0){
              Alert.alert(result.retstatus.message);
            }
          }catch(error){
            // console.error('Error:', error);
            Alert.alert('An error occurred. Please try again later.');
          }finally{
            setLoading(false);
          }
      }
      
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
      
      <View style={styles.passwordContainer}>
        
      <View style={styles.inputContainer}>
            <Text
              style={[
                styles.placeholder,
                oldPassword ? styles.placeholderActive : '',
              ]}>
              Old Password*
            </Text>
            <TextInput
              style={styles.input}
              placeholder=""
              secureTextEntry={isSecureEntry}
              value={oldPassword}
              onChangeText={(text) =>
                setOldPassword(text)
              }
            />
             <TouchableOpacity
              style={styles.showButton}
              onPress={() => setIsSecureEntry(prev => !prev)}>
              <Text style={{color:'#7d7d7d'}}>{isSecureEntry ? 'show' : 'hide'}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
            <Text
              style={[
                styles.placeholder,
                passwordData.newPassword ? styles.placeholderActive : '',
              ]}>
              New Password*
            </Text>
            <TextInput
              style={styles.input}
              placeholder=""
              secureTextEntry={secureEntry}
              value={passwordData.newPassword}
              onChangeText={text =>
                setPasswordData({...passwordData, newPassword: text})
              }
            />

            <TouchableOpacity
              style={styles.showButton}
              onPress={() => setSecureEntry(prev => !prev)}>
              <Text style={{color:'#7d7d7d'}}>{secureEntry ? 'show' : 'hide'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text
              style={[
                styles.placeholder,
                passwordData.confirmPassword ? styles.placeholderActive : '',
              ]}>
              Re-enter New Password*
            </Text>
            <TextInput
              style={styles.input}
              placeholder=""
              secureTextEntry={secure1Entry}
              value={passwordData.confirmPassword}
              onChangeText={text =>
                setPasswordData({...passwordData, confirmPassword: text})
              }
            />

            <TouchableOpacity
              style={styles.showButton}
              onPress={() => setSecure1Entry(prev => !prev)}>
              <Text style={{color:'#7d7d7d'}}>{secure1Entry ? 'show' : 'hide'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={PasswordSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

        
      </View>

    </View>
  );
};
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

  passwordContainer:{
    height:'100%',
    marginTop:25*scale1
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 12 * scale1,
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
  input: {
    borderBottomWidth: 1 * scale,
    borderColor: '#a9a9a9',
    padding: 5 * scale,
    paddingLeft: 0,
    fontSize: 16 * scale,
    paddingTop: 12 * scale1,
    color: 'black',
  },
  showButton: {
    position: 'absolute',
    right: 0,
    top: 15 * scale1,
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
  }
});

export default ChangePassword;
