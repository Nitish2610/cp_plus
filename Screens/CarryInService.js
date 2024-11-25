import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator,Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');
const scale = width / 411.4285;
const scale1 = height / 826;


const CarryInService = ({navigation, route}) => {
  const {username, token, userData} = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSelected, setIsSelected] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://devservice.adityagroup.com/aditya_service/rma/CPPartner/CISGetOrderDispatchedList',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            token: userData.token,
          }),
        },
      );

      const result = await response.json();
      console.log(result);

      if (result.retstatus.success == 1) {
        // Alert.alert(result.retstatus.message);
        setData(result.Listdate);
      } else {
        // console.error('Error', result.error);
        // Alert.alert('Error', 'No data found');
      }
    } catch (error) {
      // console.error('Error:', error);
      Alert.alert(
        'An unexpected error occurred. Please try again later.',
      );
    }
  };

  const handleAdd = () => {
    navigation.navigate('AddCarryInService',{username:username,token:token,userData:userData});
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Carry In Service</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.table}>
          {data && data.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableColumn}>
                <Text style={styles.tableHeaderText}>Id</Text>
                <Text style={styles.tableCell}>{item.id}</Text>
              </View>
              <View style={styles.tableColumn}>
                <Text style={styles.tableHeaderText}>Request No</Text>
                <Text style={styles.tableCell}>{item.requestNo}</Text>
              </View>
              <View style={styles.tableColumn}>
                <Text style={styles.tableHeaderText}>Request Date</Text>
                <Text style={styles.tableCell}>{item.requestDate}</Text>
              </View>
              <View style={styles.tableColumn}>
                <Text style={styles.tableHeaderText}>Total Item</Text>
                <Text style={styles.tableCell}>{item.totalItem}</Text>
              </View>
              <View style={styles.tableColumn}>
                <Text style={styles.tableHeaderText}>Status</Text>
                <Text style={styles.tableCell}>{item.status}</Text>
              </View>
              <View style={styles.tableColumn}>
                <Text style={styles.tableHeaderText}>Action</Text>
                <TouchableOpacity onPress={() => onSelect(index)} style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>{isSelected[index] ? 'Selected' : 'Select'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
    padding: 10*scale,
    backgroundColor: '#007AFF',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20*scale,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'white',
    padding: 10*scale,
    borderRadius: 5*scale,
  },
  addButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingBottom: 60*scale1, // To avoid overlapping the button
  },
  table: {
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10*scale,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableColumn: {
    width: '50%', // Adjust the width to fit two columns per row
    paddingVertical: 5*scale1,
  },
  tableHeaderText: {
    fontWeight: 'bold',
  },
  tableCell: {
    marginTop: 5*scale1,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    padding: 5*scale,
    borderRadius: 3*scale,
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default CarryInService;

