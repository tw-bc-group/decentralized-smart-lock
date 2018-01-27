import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode';

import blockchain from '../utilities/blockchain';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  data: {
    color: '#999',
    marginHorizontal: 30,
    marginVertical: 20,
  },
});

class QRCodeScreen extends React.Component {
  state = {
    data: blockchain.getSignature(),
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is QR Code Screen.</Text>
        <QRCode
          size={SCREEN_WIDTH * 0.4}
          value={this.state.data}
        />
        <Text style={styles.data}>{this.state.data}</Text>
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
