export const BasMinerAddresses = {
  1:'0x00A',
  3:'0x003',
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
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "ViceNode",
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
		"name": "ViceNodeSize",
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
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "cost",
				"type": "uint256"
			}
		],
		"name": "rootAllocateProfit",
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
		"name": "setCustomedSubSetting",
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
		"name": "setDefaultSubSetting",
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
				"name": "oann",
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
		"name": "setRootSetting",
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
				"name": "cost",
				"type": "uint256"
			},
			{
				"internalType": "enum BasMiner.ProfitType",
				"name": "typ",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "rOwner",
				"type": "address"
			}
		],
		"name": "subNameProfit",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
