from web3 import Web3, HTTPProvider, IPCProvider, eth, contract
import pprint
import sys

rentMontyPerDay = 1
lockAddress = "lockAddress"
node_address = 'https://ropsten.etherscan.io/address'
contractAddress = '0x1907029AabE75Df630517D469A72d7A5405724e6'

w3 = Web3(HTTPProvider(node_address))

abi = [
    {
        "constant": True,
        "inputs": [
            {
                "name": "landlord",
                "type": "address"
            }
        ],
        "name": "isLandlord",
        "outputs": [
            {
                "name": "res",
                "type": "bool"
            }
        ],
        "payable": False,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": True,
        "inputs": [],
        "name": "canIOpenThisDoor",
        "outputs": [
            {
                "name": "res",
                "type": "bool"
            }
        ],
        "payable": False,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": False,
        "inputs": [
            {
                "name": "lockAddress",
                "type": "bytes32"
            },
            {
                "name": "rentMoneyPerDay",
                "type": "uint256"
            }
        ],
        "name": "registerLandlord",
        "outputs": [],
        "payable": False,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": True,
        "inputs": [],
        "name": "isLockAvailiable",
        "outputs": [
            {
                "name": "res",
                "type": "bool"
            }
        ],
        "payable": False,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": True,
        "inputs": [],
        "name": "amIRentedThisRoom",
        "outputs": [
            {
                "name": "res",
                "type": "bool"
            }
        ],
        "payable": False,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": True,
        "inputs": [],
        "name": "getRentMoneyPerDay",
        "outputs": [
            {
                "name": "rentMoneyPerDay",
                "type": "uint256"
            }
        ],
        "payable": False,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": False,
        "inputs": [],
        "name": "wantToRent",
        "outputs": [],
        "payable": True,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "payable": True,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": False,
        "inputs": [
            {
                "indexed": False,
                "name": "landlord",
                "type": "address"
            },
            {
                "indexed": False,
                "name": "lockAddress",
                "type": "bytes32"
            },
            {
                "indexed": False,
                "name": "rentMoneyPerDay",
                "type": "uint256"
            }
        ],
        "name": "RegisterLandlord",
        "type": "event"
    }
]

contract = w3.eth.contract(address=contractAddress, contract_name='SmartLock', abi=abi)


def verify_is_lock_avaliable():
    print(contract.call().isLockAvailiable())


def can_open_door(args):
    return contract.call().canIOpenThisDoor(args.msg, args.sig)
