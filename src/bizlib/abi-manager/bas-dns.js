export const BasDnsAddresses = {
  1:'0xEc784426d352fF80E6c4192a10B009dc45e92DBD',
  3:'0x8951f6B80b880E8A47d0d18000A4c90F288F61a3',
  9527:''
}

export const BasDnsABI = [
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
    "name": "DNSChanged",
    "type": "event"
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
    "name": "DNS",
    "outputs": [
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
    "name": "_a_update",
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
      }
    ],
    "name": "_c_clearRecord",
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
        "name": "aName",
        "type": "string"
      }
    ],
    "name": "_c_setAlias",
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
        "name": "bcAddress",
        "type": "bytes"
      }
    ],
    "name": "_c_setBCAddress",
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
    "name": "_c_setIP",
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
    "name": "_c_setOpData",
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
    "name": "_c_update",
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
    "name": "query",
    "outputs": [
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
  }
]

export default {
  BasDnsAddresses,
  BasDnsABI
}
