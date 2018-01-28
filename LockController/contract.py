from web3 import Web3, HTTPProvider, contract

node_address = 'http://192.168.8.111:8545'
contractAddress = '0x9fbda871d559710256a2502a2517b794b482db40'

w3 = Web3(HTTPProvider(node_address))

ABI = [
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
        "constant": False,
        "inputs": [],
        "name": "transferRentMoney",
        "outputs": [],
        "payable": False,
        "stateMutability": "nonpayable",
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
        "inputs": [
            {
                "name": "sha3Message",
                "type": "bytes"
            },
            {
                "name": "signedStr",
                "type": "bytes"
            }
        ],
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
    },
    {
        "anonymous": False,
        "inputs": [
            {
                "indexed": False,
                "name": "renter",
                "type": "address"
            },
            {
                "indexed": False,
                "name": "totalRentMoneyFromRenter",
                "type": "uint256"
            },
            {
                "indexed": False,
                "name": "lastDate",
                "type": "uint256"
            }
        ],
        "name": "WantToRent",
        "type": "event"
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
                "name": "totalRentMoneyFromRenter",
                "type": "uint256"
            }
        ],
        "name": "TransferRentMoney",
        "type": "event"
    },
    {
        "anonymous": False,
        "inputs": [
            {
                "indexed": False,
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": False,
                "name": "now",
                "type": "uint256"
            }
        ],
        "name": "ClearContract",
        "type": "event"
    }
]

contract = w3.eth.contract(address=contractAddress, contract_name='SmartLock', abi=ABI)


def verify_is_lock_avaliable():
    print(contract.call().isLockAvailiable())


def can_open_door(args):
    print("call contract's canIOpenThisDoor")
    return contract.call().canIOpenThisDoor(args.msg, args.sig)


verify_is_lock_avaliable()
