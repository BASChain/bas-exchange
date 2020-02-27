/**
 * 0x654A6D9e9FD8735Baf2249ABdD4B868bA0e1c896
 * 0xFD2d0B61f1d956CFC69b73c60F7647f3a1b9500D
 */
export const BasAssetAddresses = {
  1:'0x00A',
  3:'0xFD2d0B61f1d956CFC69b73c60F7647f3a1b9500D',
  9527:'0x00L'
}

export const BasAssetABI = [
	{
		"constant": false,
		"inputs": [
			{
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
				"name": "nameHash",
				"type": "bytes32"
			},
			{
				"name": "expire",
				"type": "uint256"
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
				"name": "oldOwner",
				"type": "address"
			},
			{
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
				"name": "nameHash",
				"type": "bytes32"
			},
			{
				"name": "expire",
				"type": "uint256"
			},
			{
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
		"constant": true,
		"inputs": [],
		"name": "totalDomainSize",
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
		"inputs": [
			{
				"name": "nameHash",
				"type": "bytes32"
			}
		],
		"name": "DnsDetailsByHash",
		"outputs": [
			{
				"name": "name",
				"type": "bytes"
			},
			{
				"name": "ipv4",
				"type": "bytes4"
			},
			{
				"name": "ipv6",
				"type": "bytes16"
			},
			{
				"name": "bcAddr",
				"type": "string"
			},
			{
				"name": "opData",
				"type": "bytes"
			},
			{
				"name": "aName",
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
				"name": "idx",
				"type": "uint256"
			}
		],
		"name": "getMayAssetIndexOf",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
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
		"constant": true,
		"inputs": [],
		"name": "EXTEND_LEN",
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
				"name": "ipv4",
				"type": "bytes4"
			},
			{
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
		"constant": true,
		"inputs": [
			{
				"name": "nameHash",
				"type": "bytes32"
			}
		],
		"name": "lastOwnerOf",
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
				"name": "spender",
				"type": "address"
			},
			{
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
		"constant": true,
		"inputs": [],
		"name": "BADDRESS_LEN",
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
		"inputs": [
			{
				"name": "nameHash",
				"type": "bytes32"
			}
		],
		"name": "AssetDetailsByHash",
		"outputs": [
			{
				"name": "name",
				"type": "bytes"
			},
			{
				"name": "expire",
				"type": "uint256"
			},
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "isRoot",
				"type": "bool"
			},
			{
				"name": "r_openToPublic",
				"type": "bool"
			},
			{
				"name": "r_isCustomed",
				"type": "bool"
			},
			{
				"name": "r_isPureA",
				"type": "bool"
			},
			{
				"name": "r_customPrice",
				"type": "uint256"
			},
			{
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
		"inputs": [
			{
				"name": "nameHash",
				"type": "bytes32"
			}
		],
		"name": "isExpired",
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
		"constant": false,
		"inputs": [
			{
				"name": "nameHash",
				"type": "bytes32"
			},
			{
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
				"name": "to",
				"type": "address"
			},
			{
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
		"constant": true,
		"inputs": [
			{
				"name": "nameHash",
				"type": "bytes32"
			}
		],
		"name": "GetExpire",
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
		"inputs": [
			{
				"name": "nameHash",
				"type": "bytes32"
			}
		],
		"name": "currentOwnerOf",
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
				"name": "from",
				"type": "address"
			},
			{
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
		"constant": false,
		"inputs": [
			{
				"name": "nameHash",
				"type": "bytes32"
			},
			{
				"name": "ipv4",
				"type": "bytes4"
			},
			{
				"name": "ipv6",
				"type": "bytes16"
			},
			{
				"name": "bcAddress",
				"type": "string"
			},
			{
				"name": "opData",
				"type": "bytes"
			},
			{
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
		"constant": true,
		"inputs": [
			{
				"name": "owner",
				"type": "address"
			}
		],
		"name": "myAssetCount",
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
				"name": "from",
				"type": "address"
			},
			{
				"name": "to",
				"type": "address"
			},
			{
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
		"constant": false,
		"inputs": [
			{
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
		"constant": true,
		"inputs": [
			{
				"name": "name",
				"type": "string"
			}
		],
		"name": "Hash",
		"outputs": [
			{
				"name": "",
				"type": "bytes"
			},
			{
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
				"name": "owner",
				"type": "address"
			},
			{
				"name": "nameHash",
				"type": "bytes32"
			}
		],
		"name": "allowance",
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
			}
		],
		"name": "closeCustomedPrice",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "idx",
				"type": "uint256"
			}
		],
		"name": "getDomainOfIndex",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
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
				"name": "sHash",
				"type": "bytes32"
			},
			{
				"name": "sname",
				"type": "bytes"
			},
			{
				"name": "rHash",
				"type": "bytes32"
			},
			{
				"name": "expire",
				"type": "uint256"
			},
			{
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
		"constant": false,
		"inputs": [
			{
				"name": "sHash",
				"type": "bytes32"
			},
			{
				"name": "expire",
				"type": "uint256"
			},
			{
				"name": "oldOwner",
				"type": "address"
			},
			{
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
		"constant": true,
		"inputs": [],
		"name": "Alias_LEN",
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
				"name": "nameHash",
				"type": "bytes32"
			},
			{
				"name": "name",
				"type": "bytes"
			},
			{
				"name": "expire",
				"type": "uint256"
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
				"name": "isAType",
				"type": "bool"
			},
			{
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
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "hash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "bytes"
			}
		],
		"name": "MintAsset",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "oldOwner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "newOwner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "hash",
				"type": "bytes32"
			}
		],
		"name": "TakeoverAsset",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "hash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "duration",
				"type": "uint256"
			}
		],
		"name": "RechargeAsset",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
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
				"name": "nameHash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "to",
				"type": "address"
			}
		],
		"name": "AssertTransfer",
		"type": "event"
	}
]

export default {
  BasAssetAddresses,
  BasAssetABI
}
