import React from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window'); 
const scale = width / 411.4285;
const scale1= height/826;

const ProfilePage = ({ route }) => {
  // Extract user data from route params
  const { profile } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Contact Person:</Text>
      <Text style={styles.text}>{profile.TransportInfo[0].ContactPerson}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.text}>{profile.TransportInfo[0].Email}</Text>
      <Text style={styles.label}>Phone:</Text>
      <Text style={styles.text}>{profile.TransportInfo[0].ContactNo}</Text>
      <Text style={styles.label}>Address:</Text>
      <Text style={styles.text}>{profile.TransportInfo[0].Address1}</Text>
      <Text style={styles.label}>State:</Text>
      <Text style={styles.text}>{profile.TransportInfo[0].State}</Text>
      <Text style={styles.label}>Pincode:</Text>
      <Text style={styles.text}>{profile.TransportInfo[0].Pincode}</Text>
      <Text style={styles.label}>Customer Type:</Text>
      <Text style={styles.text}>{profile.TransportInfo[0].CustomerType}</Text>
      {/* Add more profile details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20*scale1
  },
  profilePic: {
    width: 150*scale,
    height: 150*scale1,
    borderRadius: 75*scale,
    marginBottom: 20*scale1,
  },
  label: {
    fontSize: 18*scale,
    fontWeight: 'bold',
    marginTop: 10*scale1,
  },
  text: {
    fontSize: 16*scale,
    marginBottom: 10*scale1,
  },
});

export default ProfilePage;
