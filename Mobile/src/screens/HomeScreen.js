import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { ROUTE_NAMES } from '../routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <Text>This is Home Screen.</Text>
      <Button
        title="Generate QR Code"
        onPress={() => props.navigation.navigate(ROUTE_NAMES.QR_CODE)}
      />
    </View>
  );
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default HomeScreen;
