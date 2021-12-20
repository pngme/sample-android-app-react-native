import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { TextField } from '@softmedialab/react-native-material-textfield';

import { useUser } from '../../context/user-context';
import styles from './styles';

const SignUp = (props) => {

  const { navigation } = props;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const { setUser } = useUser();

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
              onPress={() => {
                setUser({
                  firstName,
                  lastName,
                  email,
                  phoneNumber,
                });
                navigation.navigate('LoggedWelcomeScreen');
              }}
              disabled={!firstName || !lastName || !email || !phoneNumber}
            />
          </View>
          
        </View>        
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
