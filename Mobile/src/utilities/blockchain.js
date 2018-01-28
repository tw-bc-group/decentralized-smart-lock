import Web3 from 'web3';

import CONFIG from '../config.json';

let web3;
export default {
  connect() {
    if (web3 && web3.currentProvider) {
      web3 = new Web3(web3.currentProvider);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider(CONFIG.BLOCKCHAIN.ADDRESS));
    }
    return new Promise((resolve, reject) => {
      web3.net.getListening((error, result) => (error ? reject(error) : resolve(result)));
    });
  },
  getSignature() {
    const message = web3.sha3(CONFIG.ACCOUNT.ADDRESS);
    return new Promise((resolve, reject) => {
      web3.eth.sign(
        CONFIG.ACCOUNT.ADDRESS,
        message,
        (error, result) => (error ? reject(error) : resolve(JSON.stringify({
          msg: message,
          sig: result,
        }))),
      );
    });
  },
};
