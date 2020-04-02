export const BasMinerAddresses = {
  1:'0x00A',
  3:'0x34149F28b03B2Db2778Cc4F3d99e0ca71C34cc95',
  9527:'0x00L'
}

export const BasMinerABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "t",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "team",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "AllocationChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "MinerChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "receiptNumber",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amout",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "allocation",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "from",
        "type": "address"
      }
    ],
    "name": "Receipt",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "drawer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amout",
        "type": "uint256"
      }
    ],
    "name": "Withdraw",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "AllocationCustomedSub",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "AllocationRoot",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "AllocationSelfSub",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "AllocationSub",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "GetAllMainNodeAddress",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
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
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "MainNode",
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
    "inputs": [],
    "name": "MainNodeSize",
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
    "name": "OANNAddress",
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
    "inputs": [],
    "name": "Satoshi_Nakamoto",
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
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "_a_changeAdmin",
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
        "name": "conAddr",
        "type": "address"
      }
    ],
    "name": "_a_changeContract",
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
        "name": "m",
        "type": "address"
      }
    ],
    "name": "addMiner",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "admin",
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
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "cost",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "allocateType",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "receiptNumber",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "rootOwner",
        "type": "address"
      }
    ],
    "name": "allocateProfit",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "balanceOf",
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
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "admin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "burn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "miner",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "root",
        "type": "uint256"
      }
    ],
    "name": "changeCustomedSubSetting",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "admin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "burn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "miner",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "root",
        "type": "uint256"
      }
    ],
    "name": "changeDefaultSubSetting",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "admin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "burn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "miner",
        "type": "uint256"
      }
    ],
    "name": "changeRootSetting",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "admin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "burn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "miner",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "root",
        "type": "uint256"
      }
    ],
    "name": "changeSelfSubSetting",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "contractCaller",
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
    "inputs": [],
    "name": "customedSubSetting",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "toAdmin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "toBurn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "toMiner",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "toRootOwner",
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
    "name": "defaultSubSetting",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "toAdmin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "toBurn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "toMiner",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "toRootOwner",
        "type": "uint256"
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
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "no",
        "type": "uint256"
      }
    ],
    "name": "emergencyWithdraw",
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
        "name": "miner",
        "type": "address"
      }
    ],
    "name": "removeMiner",
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
        "name": "oldM",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "newM",
        "type": "address"
      }
    ],
    "name": "replaceMiner",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "rootSetting",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "toAdmin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "toBurn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "toMiner",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "toRootOwner",
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
    "name": "selfSubSetting",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "toAdmin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "toBurn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "toMiner",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "toRootOwner",
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
    "name": "token",
    "outputs": [
      {
        "internalType": "contract BasToken",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]


export default {
  BasMinerAddresses,
  BasMinerABI
}
