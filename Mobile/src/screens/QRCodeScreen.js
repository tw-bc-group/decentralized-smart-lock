import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class QRCodeScreen extends React.Component {
  state = {
    data: Date.now().toString(),
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
