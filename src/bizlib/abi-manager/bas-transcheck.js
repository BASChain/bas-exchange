export const BasTransCheckAddresses = {
  1: '0xBef3f1deF2340C0820E0992D463C4A60b260A815',
  3: '0xC256A5348b9ECF162007adFe50Faa1363fA87417',
  9527: ''
}

export const BasTransCheckABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_t",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_o",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_a",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_d",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_oann",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_market",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "nameHash",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      }
    ],
    "name": "checkBuyFromSell",
    "outputs": [
      {
        "internalType": "bool",
        "name": "sellerOwns",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "sellerAllows",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "sellOrderExist",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "buyerEth",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "buyerBalance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "buyerAllowance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "nameHash",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      }
    ],
    "name": "checkSellToAsk",
    "outputs": [
      {
        "internalType": "bool",
        "name": "sellerOwns",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "sellerAllows",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "askOrderExist",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "sellerEth",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "buyerBalance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "buyerAllowance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "checkUserState",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "ethBalance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "basBalance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "allowanceOANN",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "allowanceMarket",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "nameHash",
        "type": "bytes32"
      }
    ],
    "name": "queryRootInfo",
    "outputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "expiration",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "rootName",
        "type": "bytes"
      },
      {
        "internalType": "bool",
        "name": "isOpen",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isCustomed",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "isCustomedPrice",
        "type": "uint256"
      },
      {
        "internalType": "bytes4",
        "name": "ipv4",
        "type": "bytes4"
      },
      {
        "internalType": "bytes16",
        "name": "ipv6",
        "type": "bytes16"
      },
      {
        "internalType": "bytes",
        "name": "bca",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "opData",
        "type": "bytes"
      },
      {
        "internalType": "string",
        "name": "aliasName",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "nameHash",
        "type": "bytes32"
      }
    ],
    "name": "querySubInfo",
    "outputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "expiration",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "totalName",
        "type": "bytes"
      },
      {
        "internalType": "bytes4",
        "name": "ipv4",
        "type": "bytes4"
      },
      {
        "internalType": "bytes16",
        "name": "ipv6",
        "type": "bytes16"
      },
      {
        "internalType": "bytes",
        "name": "bca",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "opData",
        "type": "bytes"
      },
      {
        "internalType": "string",
        "name": "aliasName",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "rootHash",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "rootOwner",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]

export default {
  BasTransCheckAddresses,
  BasTransCheckABI,
}
