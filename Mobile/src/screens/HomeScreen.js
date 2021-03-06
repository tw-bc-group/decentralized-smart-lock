import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import { ROUTE_NAMES } from '../routes';
import blockchain from '../utilities/blockchain';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const CONNECTION = {
  READY: {
    value: 'READY',
    text: 'Ready to connect.',
  },
  CONNECTING: {
    value: 'CONNECTING',
    text: 'Loading ...',
  },
  SUCCESS: {
    value: 'SUCCESS',
    text: 'The Blockchain is online!',
  },
  FAILED: {
    value: 'FAILED',
    text: 'Oops..something wrong with connection',
  },
};

class HomeScreen extends React.Component {
  state = {
    connection: CONNECTION.READY,
  };

  componentDidMount() {
    this.connect();
  }

  connect = () => {
    this.setState({ connection: CONNECTION.CONNECTING });
    blockchain.connect().then((isConnected) => {
      this.setState({
        connection: isConnected ? CONNECTION.SUCCESS : CONNECTION.FAILED,
      });
    }).catch(() => {
      this.setState({ connection: CONNECTION.FAILED });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is Home Screen.</Text>
        <Text>
          {this.state.connection.text}
        </Text>
        <Button
          title="Settings"
          onPress={() => this.props.navigation.navigate(ROUTE_NAMES.SETTINGS)}
        />
        <Button
          title="Generate QR Code"
          onPress={() => this.props.navigation.navigate(ROUTE_NAMES.QR_CODE)}
        />
        <Button
          title="Reconnect"
          onPress={() => this.connect()}
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
