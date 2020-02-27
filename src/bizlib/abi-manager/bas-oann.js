/**
 * 0xA23fFD128C8eA5E0610fC47A7d6D6a2Cdb98Faeb
 * 0xCf1FFcFB1A6e1ADfde8bBd7B59636D5cB4080355
 */
export const BasOANNAddresses = {
  1:'0x00A',
  3:'0xbfa8f1A14c2F58855a1A643d56a71022FAa50438',
  9527:'0x00L'
}

export const BasOANNABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "newA",
				"type": "address"
			}
		],
		"name": "changeAsset",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "d",
				"type": "uint8"
			}
		],
		"name": "validDuration",
		"outputs": [
			{
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
		"inputs": [],
		"name": "asset",
		"outputs": [
			{
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
				"name": "rootHash",
				"type": "bytes32"
			},
			{
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
		"constant": true,
		"inputs": [
			{
				"name": "rName",
				"type": "bytes"
			},
			{
				"name": "sName",
				"type": "bytes"
			},
			{
				"name": "durationInYear",
				"type": "uint8"
			}
		],
		"name": "evalueSubPrice",
		"outputs": [
			{
				"name": "isValid",
				"type": "bool"
			},
			{
				"name": "rootOwner",
				"type": "address"
			},
			{
				"name": "isCustomed",
				"type": "bool"
			},
			{
				"name": "cost",
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
		"name": "MAX_DAYS_REG",
		"outputs": [
			{
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
		"name": "accountant",
		"outputs": [
			{
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
		"name": "MAX_YEAR_REG",
		"outputs": [
			{
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
		"name": "CUSTOMED_PRICE_GAS",
		"outputs": [
			{
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
				"name": "newT",
				"type": "address"
			}
		],
		"name": "changeToken",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "nameHash",
				"type": "bytes32"
			},
			{
				"name": "durationInYear",
				"type": "uint8"
			}
		],
		"name": "rechargeSub",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "bytes"
			},
			{
				"name": "isOpen",
				"type": "bool"
			},
			{
				"name": "isCustomed",
				"type": "bool"
			},
			{
				"name": "cusPrice",
				"type": "uint256"
			},
			{
				"name": "durationInYear",
				"type": "uint8"
			}
		],
		"name": "registerRoot",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "AROOT_GAS",
		"outputs": [
			{
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
				"name": "nameHash",
				"type": "bytes32"
			},
			{
				"name": "durationInYear",
				"type": "uint8"
			}
		],
		"name": "rechargeRoot",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newGas",
				"type": "uint256"
			}
		],
		"name": "setARootGas",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newGas",
				"type": "uint256"
			}
		],
		"name": "setBRootGas",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
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
		"constant": true,
		"inputs": [
			{
				"name": "name",
				"type": "bytes"
			},
			{
				"name": "isCustomed",
				"type": "bool"
			},
			{
				"name": "durationInYear",
				"type": "uint8"
			}
		],
		"name": "evalueRootPrice",
		"outputs": [
			{
				"name": "isValid",
				"type": "bool"
			},
			{
				"name": "isARoot",
				"type": "bool"
			},
			{
				"name": "cost",
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
				"name": "rName",
				"type": "bytes"
			},
			{
				"name": "sName",
				"type": "bytes"
			},
			{
				"name": "durationInYear",
				"type": "uint8"
			}
		],
		"name": "registerSub",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "SUB_GAS",
		"outputs": [
			{
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
				"name": "newM",
				"type": "address"
			}
		],
		"name": "changeAccountant",
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
		"name": "BROOT_GAS",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "t",
				"type": "address"
			},
			{
				"name": "m",
				"type": "address"
			},
			{
				"name": "a",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]

export default {
  BasOANNAddresses,
  BasOANNABI
}
