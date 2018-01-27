import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Web3 from 'web3';

import { ROUTE_NAMES } from '../routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class HomeScreen extends React.Component {
  state = {
    connection: 'Loading ...',
  };

  componentDidMount() {
    this.web3.eth.net.isListening().then((isConnected) => {
      this.setState({
        connection: isConnected ?
          'The Blockchain is online!' : 'Oops..something wrong with connection',
      });
    });
  }

  host = 'http://10.16.82.48:8545';
  web3 = new Web3(new Web3.providers.HttpProvider(this.host));

  render() {
    return (
      <View style={styles.container}>
        <Text>This is Home Screen.</Text>
        <Text>
          {this.state.connection}
        </Text>
        <Button
          title="Generate QR Code"
          onPress={() => this.props.navigation.navigate(ROUTE_NAMES.QR_CODE)}
        />
      </View>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default HomeScreen;
