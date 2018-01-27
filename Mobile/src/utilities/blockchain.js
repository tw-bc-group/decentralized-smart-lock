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
    return web3.eth.net.isListening();
  },
  getSignature() {
    const message = web3.utils.toHex(web3.utils.sha3(CONFIG.ACCOUNT.ADDRESS));
    return JSON.stringify({
      msg: message,
      sig: Web3.utils.toHex(web3.eth.sign(message, CONFIG.ACCOUNT.ADDRESS)),
    });
  },
};
