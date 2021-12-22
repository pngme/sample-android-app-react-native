import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  PermissionsAndroid,
  NativeModules,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {
  go,
  isPermissionGranted,
  resetPermissionFlow,
} from '@pngme/react-native-sms-pngme-android';
import RNConfig from 'react-native-config';
 

import { useUser } from '../../context/user-context';

  
import styles from './styles';

const permissions = (props) => {

  const { navigation } = props;

  const { user, setUser } = useUser();
  const [toggleCheckBox, setToggleCheckBox] = useState(user.pngmePermissionWasSelected);
  
  const navigateToLoanScreen = () => {
    navigation.navigate('LoanApplicationAmount');
  }

  const pngmeGo = async() => {
    await go({
      clientKey: RNConfig.PNGME_CLIENT_KEY,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: `234${user.phone}`,
      isKycVerified: false,
      companyName: 'Acme Bank',
      externalId: '',
    });
    navigateToLoanScreen();
  }

  // Here we check if permission can be asked again, if user clicks on `never ask again` it will return false
  const canPermissionBeAskedAgain = async() => {
    try {
      const canIt = await NativeModules.PermissionsAndroid.shouldShowRequestPermissionRationale(PermissionsAndroid.PERMISSIONS.READ_SMS)
      return canIt;
    } catch(e) {
      return true
    }
  }

  const handleContinue = async() => {
    
    if (toggleCheckBox) {
      // If user confirm that wants pngme permission we store it and next time it will be selected by default
      setUser({ pngmePermissionWasSelected: true });
      
      const permissionGranted = await isPermissionGranted();
      const canPermissionBeAsked = await canPermissionBeAskedAgain();
      debugger;
      if (!permissionGranted && canPermissionBeAsked) {
        resetPermissionFlow();
      }
      pngmeGo();
    } else {
      debugger;
      navigateToLoanScreen();
    }
  }

  const renderCheckboxLine = (label, isSelected, onValueChange, disabled = false) => (
    <View style={styles.checkboxContainer}>
      <CheckBox
        value={isSelected}
        onValueChange={onValueChange}
        style={styles.checkbox}
        disabled={disabled}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );

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
            <Text style={styles.title}>
              Select Optional permissions
            </Text>
          </View>
          <View style={styles.permissionsCheckbox}>
            {renderCheckboxLine("Share location", false, () => {}, true)}
            {renderCheckboxLine("Receive promotions", false, () => {}, true)}
            {renderCheckboxLine("Use Pngme", toggleCheckBox, setToggleCheckBox, user.pngmePermissionWasSelected)}
          </View>
          
          <View style={styles.buttonsWrapper}>
            <Button
              title="CONTINUE"
              onPress={handleContinue}
            />
          </View>
          
        </View>        
      </ScrollView>
    </SafeAreaView>
  );
};

export default permissions;
