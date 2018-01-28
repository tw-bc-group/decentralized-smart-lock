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
        return Promise.resolve(web3.net.listening);
    },
    getSignature() {
        if (web3 && web3.currentProvider) {
            web3 = new Web3(web3.currentProvider);
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider(CONFIG.BLOCKCHAIN.ADDRESS));
        }
        const message = web3.sha3(CONFIG.ACCOUNT.ADDRESS);
        let sign = web3.eth.sign(CONFIG.ACCOUNT.ADDRESS, message, function (res) {
            console.log(res);
        });
        return JSON.stringify({
            msg: message,
            sig: sign,
        });
    },
};
