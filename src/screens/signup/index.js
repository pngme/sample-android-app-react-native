import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { TextField } from '@softmedialab/react-native-material-textfield';
import styles from './styles';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <SafeAreaView
      style={styles.safeAreaContent}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollViewWrapper}
      >
        <View style={styles.screenWrapper}>

          <View style={styles.content}>
            <TextField
              label="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextField
              label="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
            <TextField
              label="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextField
              label="Phone"
              prefix="+234"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={styles.buttonsWrapper}>
            <Button
              title="CREATE ACCOUNT"
              onPress={() => {}}
            />
          </View>
          
        </View>        
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
