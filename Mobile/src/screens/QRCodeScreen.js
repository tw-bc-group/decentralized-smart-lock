import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode';
import CONFIG from '../config.json';
import Web3 from 'web3';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class QRCodeScreen extends React.Component {
  msg = Web3.toHex(Web3.sha3(CONFIG.ACCOUNT.ADDRESS));
  data = {
    'msg': this.msg,
    'sig': Web3.toHex(Web3.eth.sign(CONFIG.ACCOUNT.PRIVATE_KEY, this.msg)),
  };
  state = {
      data: JSON.stringify(data),
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is QR Code Screen.</Text>
        <Text>{this.state.data}</Text>
        <QRCode
          value={this.state.data}
        />
        <Button
          title="Refresh"
          onPress={() => this.setState({ data: Date.now().toString() })}
        />
        <Button
          title="Back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

QRCodeScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default QRCodeScreen;
