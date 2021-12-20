import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useUser } from '../../context/user-context';

  
import styles from './styles';

const permissions = (props) => {

  const { navigation } = props;

  const { user, setUser } = useUser();
  const [toggleCheckBox, setToggleCheckBox] = useState(user.pngmePermissionWasSelected);
  

  const handleContinue = () => {
    // If confirm that wants pngme permission we store it and next time it will be selected y default
    if (toggleCheckBox) {
      setUser({
        pngmePermissionWasSelected: true,
      });
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
