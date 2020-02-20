export const BasOwnerAddresses = {
  1:'0x00A',
  3:'0x003',
  9527:'0x00L'
}

export const BasOwnerABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "A_Root_Type_Len",
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
		"inputs": [
			{
				"internalType": "bytes",
				"name": "name",
				"type": "bytes"
			}
		],
		"name": "isARoot",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
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
				"internalType": "bytes",
				"name": "name",
				"type": "bytes"
			}
		],
		"name": "validCheck",
		"outputs": [],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	}
]

export default {
  BasOwnerAddresses,
  BasOwnerABI
}
