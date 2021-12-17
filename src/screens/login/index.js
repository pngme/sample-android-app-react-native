import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { TextField } from '@softmedialab/react-native-material-textfield';
import styles from './styles';

const Login = () => {

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
              value="username"
              disabled
            />
        
            <TextField
              label="Password"
              value="********"
              disabled
            />
          </View>
          
          <View style={styles.buttonsWrapper}>
            <Button 
              title='Sign in'
              disabled
            />
            <View style={styles.secondButtonMarginTop}>
              <Button
                title='Sign up'
                onPress={() => {}}
              />
            </View>
          </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
