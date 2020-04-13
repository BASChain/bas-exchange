/**
 * 0309: 0x5346aDb387D87009C133c4773deD55Bbc47A595B
 */
export const BasAssetAddresses = {
  1:'0x36631a815bbecfb8947e814196DbF1768397d75b',
  3:'0x5346aDb387D87009C133c4773deD55Bbc47A595B',
  9527:'0x00L'
}

export const BasAssetABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_o",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "nameHash",
        "type": "bytes32"
      }
    ],
    "name": "RootChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "nameHash",
        "type": "bytes32"
      }
    ],
    "name": "SubChanged",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes",
        "name": "name",
        "type": "bytes"
      }
    ],
    "name": "Hash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "Root",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "rootName",
        "type": "bytes"
      },
      {
        "internalType": "bool",
        "name": "openToPublic",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isCustomed",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "customedPrice",
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
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "Sub",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "totalName",
        "type": "bytes"
      },
      {
        "internalType": "bytes32",
        "name": "rootHash",
        "type": "bytes32"
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
        "internalType": "bytes",
        "name": "sName",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "rName",
        "type": "bytes"
      }
    ],
    "name": "TotalNameHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes",
        "name": "rootName",
        "type": "bytes"
      },
      {
        "internalType": "bool",
        "name": "openToPublic",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isCustomed",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "customedPrice",
        "type": "uint256"
      }
    ],
    "name": "_a_updateRoot",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes",
        "name": "totalName",
        "type": "bytes"
      },
      {
        "internalType": "bytes32",
        "name": "rootHash",
        "type": "bytes32"
      }
    ],
    "name": "_a_updateSub",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes",
        "name": "rootName",
        "type": "bytes"
      },
      {
        "internalType": "bool",
        "name": "openToPublic",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isCustomed",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "customedPrice",
        "type": "uint256"
      }
    ],
    "name": "_c_addRoot",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes",
        "name": "totalName",
        "type": "bytes"
      },
      {
        "internalType": "bytes32",
        "name": "rootHash",
        "type": "bytes32"
      }
    ],
    "name": "_c_addSub",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "nameHash",
        "type": "bytes32"
      },
      {
        "internalType": "bool",
        "name": "openToPublic",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isCustomed",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "customedPrice",
        "type": "uint256"
      }
    ],
    "name": "_c_updateRoot",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "o",
    "outputs": [
      {
        "internalType": "contract BasOwnership",
        "name": "",
        "type": "address"
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
    "name": "rootExist",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
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
    "name": "subExist",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]

export default {
  BasAssetAddresses,
  BasAssetABI
}
