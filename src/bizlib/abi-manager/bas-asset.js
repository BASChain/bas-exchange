/**
 * 0x654A6D9e9FD8735Baf2249ABdD4B868bA0e1c896
 * 0xFD2d0B61f1d956CFC69b73c60F7647f3a1b9500D
 * 0xa4EF38F89ea0f9aC37D4C515B983A7aCeb3980B1
 * 0xCDF7A205DE6f35b60a540dE5B9ebF419c2303e61
 * 0309: 0x5346aDb387D87009C133c4773deD55Bbc47A595B
 */
export const BasAssetAddresses = {
  1:'0x00A',
  3:'0x5346aDb387D87009C133c4773deD55Bbc47A595B',
  9527:'0x00L'
}

export const BasAssetABI = [
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "nameHash",
        "type": "bytes32"
      }
    ],
    "name": "approve",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
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
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "AssertTransfer",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "nameHash",
        "type": "bytes32"
      }
    ],
    "name": "clearRecord",
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
        "name": "rootHash",
        "type": "bytes32"
      }
    ],
    "name": "closeCustomedPrice",
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
        "name": "rootHash",
        "type": "bytes32"
      }
    ],
    "name": "closeToPublic",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
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
    "name": "DNSRecordChange",
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
    "name": "DNSRecordRemove",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "hash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "name",
        "type": "bytes"
      }
    ],
    "name": "MintAsset",
    "type": "event"
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
        "internalType": "bytes",
        "name": "name",
        "type": "bytes"
      },
      {
        "internalType": "uint256",
        "name": "expire",
        "type": "uint256"
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
        "name": "cusPrice",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isAType",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "mintRootAsset",
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
        "name": "sHash",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "sname",
        "type": "bytes"
      },
      {
        "internalType": "bytes32",
        "name": "rHash",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "expire",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "mintSubAsset",
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
        "name": "rootHash",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "openCustomedPrice",
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
        "name": "rootHash",
        "type": "bytes32"
      }
    ],
    "name": "openToPublic",
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
        "internalType": "uint256",
        "name": "expire",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isRoot",
        "type": "bool"
      }
    ],
    "name": "recharge",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "hash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "duration",
        "type": "uint256"
      }
    ],
    "name": "RechargeAsset",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "nameHash",
        "type": "bytes32"
      }
    ],
    "name": "revoke",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
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
    "name": "RootAdded",
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
    "name": "RootChanged",
    "type": "event"
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
        "internalType": "string",
        "name": "aName",
        "type": "string"
      }
    ],
    "name": "setAlias",
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
        "internalType": "string",
        "name": "bcAddress",
        "type": "string"
      }
    ],
    "name": "setBCAddress",
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
        "internalType": "bytes4",
        "name": "ipv4",
        "type": "bytes4"
      },
      {
        "internalType": "bytes16",
        "name": "ipv6",
        "type": "bytes16"
      }
    ],
    "name": "setIP",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "newOANN",
        "type": "address"
      }
    ],
    "name": "setOANN",
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
        "internalType": "bytes",
        "name": "opData",
        "type": "bytes"
      }
    ],
    "name": "setOpData",
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
        "internalType": "string",
        "name": "bcAddress",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "opData",
        "type": "bytes"
      },
      {
        "internalType": "string",
        "name": "aName",
        "type": "string"
      }
    ],
    "name": "setRecord",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
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
    "name": "SubAdded",
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
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "oldOwner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "hash",
        "type": "bytes32"
      }
    ],
    "name": "TakeoverAsset",
    "type": "event"
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
        "internalType": "uint256",
        "name": "expire",
        "type": "uint256"
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
        "name": "cusPrice",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "oldOwner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "takeoverRoot",
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
        "name": "sHash",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "expire",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "oldOwner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "takeoverSubName",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "nameHash",
        "type": "bytes32"
      }
    ],
    "name": "transfer",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferContractOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "nameHash",
        "type": "bytes32"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "Alias_LEN",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
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
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "nameHash",
        "type": "bytes32"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "address",
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
    "name": "AssetDetailsByHash",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "name",
        "type": "bytes"
      },
      {
        "internalType": "uint256",
        "name": "expire",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isRoot",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "r_openToPublic",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "r_isCustomed",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "r_isPureA",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "r_customPrice",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "s_rootHash",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "BADDRESS_LEN",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "ContractOwner",
    "outputs": [
      {
        "internalType": "address",
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
    "name": "currentOwnerOf",
    "outputs": [
      {
        "internalType": "address",
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
    "name": "DnsDetailsByHash",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "name",
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
        "internalType": "string",
        "name": "bcAddr",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "opData",
        "type": "bytes"
      },
      {
        "internalType": "string",
        "name": "aName",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "EXTEND_LEN",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
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
        "internalType": "uint256",
        "name": "idx",
        "type": "uint256"
      }
    ],
    "name": "getDomainOfIndex",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
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
        "internalType": "bytes32",
        "name": "nameHash",
        "type": "bytes32"
      }
    ],
    "name": "GetExpire",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
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
        "internalType": "uint256",
        "name": "idx",
        "type": "uint256"
      }
    ],
    "name": "getMayAssetIndexOf",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
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
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "Hash",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      },
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
        "name": "nameHash",
        "type": "bytes32"
      }
    ],
    "name": "isExpired",
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
    "name": "lastOwnerOf",
    "outputs": [
      {
        "internalType": "address",
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
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "myAssetCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalDomainSize",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
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
