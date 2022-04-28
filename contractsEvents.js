const { ethers } = require('ethers')

const INFURIA_ID = 'd3779648f1084bb0a450b3e74f00b4cd'
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURIA_ID}`
)

const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint)',
  'event Transfer(address indexed from, address indexed to, uint amount)'
]

//DAI token contract
const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F'

const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
  //we can listen to events on this contract
  //  const transferEvents = await contract.queryFilter('Transfer')

  //issue with only .queryFilter'ing 'Transfer' would return millions of events.
  //this is why we can filter through a certain block to narrow down what we get in return

  //we can also do {await provider.getBlockNumber() to get the latest block number}
  const latestBlock = await provider.getBlockNumber()

  const transferEvents = await contract.queryFilter(
    'Transfer',
    latestBlock - 5,
    latestBlock
  )
  console.log(transferEvents)
}

main()
