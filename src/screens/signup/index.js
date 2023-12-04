import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import TextField from '../../components/TextInputField';

import { useUser } from '../../context/user-context';
import styles from './styles';

const SignUp = (props) => {

  const { navigation } = props;

  const [externalId, setExternalId] = useState('');
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
              label="External ID"
              value={externalId}
              onChangeText={setExternalId}
            />
          </View>
          
          <View style={styles.buttonsWrapper}>
            <Button
              title="CREATE ACCOUNT"
              onPress={() => {
                setUser({
                  externalId,
                });
                navigation.navigate('LoggedWelcomeScreen');
              }}
              disabled={!externalId}
            />
          </View>
          
        </View>        
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
