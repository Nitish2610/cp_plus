import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

const Scanner = ({ route, navigation }) => {
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef(null);
  const { onScanComplete } = route.params;

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // Invoke the callback with the scanned data
    if (onScanComplete) {
      onScanComplete(data);
    }
    // Optionally, navigate back after scanning
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headertext}>Check Warranty With Scanner</Text>
      <View style={styles.cameraContainer}>
        <RNCamera
          ref={cameraRef}
          style={styles.camera}
          onBarCodeRead={scanned ? undefined : handleBarCodeScanned}
          captureAudio={false}
        />
        {!scanned && (
          <View style={styles.squareBox}>
            <View style={styles.greenContainer}>
              <View style={styles.redLine} />
            </View>
          </View>
        )}
      </View>
      <Text style={styles.middletext}>Place a bar code inside the viewfinder rectangle to scan it.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  headertext: {
    fontSize: 24,
    textAlign: 'center',
    margin: 20,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    height: '100%',
    width: '100%',
  },
  squareBox: {
    position: 'absolute',
    borderColor: '#008000',
    borderWidth: 2,
    height: 200,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redLine: {
    width: 180,
    height: 2,
    backgroundColor: 'red',
  },
  middletext: {
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
});

export default Scanner;
