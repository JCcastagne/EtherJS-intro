// SmartContract that we will be using for an example: Dai Stablecoin

const { ethers } = require('ethers')

// DAI contract address:
const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
// https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f

const INFURIA_ID = 'd3779648f1084bb0a450b3e74f00b4cd'

const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURIA_ID}`
)

// To talk with a SmartContract, you need to set up a new contract object.

// new ethers.Contract(address, abi, signerOrProvider) => Contract
//  address: contract address
//  abi: abstract binary interface (json object that describes how the smart contract works)
//  signerOrProvider: (Infuria provider)

// to pull the info from the ABI of this SmartContract, you would get a huge chunk of code. Instead, we will use Ethers' functionality to only pull the information we need:
const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) returns (uint)'
]

// create a new contract
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
  const name = await contract.name()
  const symbol = await contract.symbol()
  const totalSupply = await contract.totalSupply()

  console.log(`
    Reading from ${address}
    Name: ${name}
    Symbol: ${symbol}
    Total Supply: ${totalSupply}
  `)

  try {
    const balance = await contract.balanceOf(
      '0x6c6Bc977E13Df9b0de53b251522280BB72383700'
    )
    console.log(`Balance returned: ${balance}`)
  } catch (error) {
    console.log(error)
  }
}

main()
