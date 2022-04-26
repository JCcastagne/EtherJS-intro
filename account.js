const { ethers } = require('ethers')

const INFURIA_KEYS = {
  name: 'test',
  endpoints: {
    httpProtocol:
      'https://mainnet.infura.io/v3/d3779648f1084bb0a450b3e74f00b4cd',
    wssProtocol:
      'wss://mainnet.infura.io/ws/v3/d3779648f1084bb0a450b3e74f00b4cd'
  }
}
const INFURIA_ID = 'd3779648f1084bb0a450b3e74f00b4cd'

//* Create protocol/connection to talk to Eth nodes/blockchain *//

// ethers.getDefaultProvider( [ network , [ options ] ] ) ⇒ Provider
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURIA_ID}`
) // connection now has been made

//* Fetching account balances *//

// random account address:
const address = '0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8'

// balance of the account
const main = async () => {
  const balance = await provider.getBalance(address)
  console.log(`ETH Balance of ${address}: ${balance}`)
  console.log(`Formatted balance: ${ethers.utils.formatEther(balance)} ETH`)
}

main()
