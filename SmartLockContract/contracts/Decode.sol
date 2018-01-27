pragma solidity ^0.4.15;

library Decode{
    function decode(bytes memory sha3Message, bytes memory signedStr) returns (address){
        bytes memory signedString = signedStr;

        bytes32 sha3Msg = bytesToBytes32(sha3Message);
        bytes32 r = bytesToBytes32(slice(signedString, 0, 32));
        bytes32 s = bytesToBytes32(slice(signedString, 32, 32));
        byte v = slice(signedString, 64, 1)[0];

        return ecrecoverDecode(sha3Msg, r, s, v);
    }

    function slice(bytes memory data, uint start, uint len) returns (bytes){
        bytes memory b = new bytes(len);

        for(uint i = 0; i < len; i++){
            b[i] = data[i + start];
        }

        return b;
    }

    function ecrecoverDecode(bytes32 sha3Msg, bytes32 r, bytes32 s, byte v1) returns (address addr){
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(prefix, sha3Msg);
        uint8 v = uint8(v1) + 27;
        addr = ecrecover(prefixedHash, v, r, s);
    }

    function bytesToBytes32(bytes memory source) returns (bytes32 result) {
        assembly {
            result := mload(add(source, 32))
        }
    }
}