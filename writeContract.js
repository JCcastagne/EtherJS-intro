const { ethers } = require('ethers')

const INFURIA_ID = 'd3779648f1084bb0a450b3e74f00b4cd'
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURIA_ID}`
)

//metamask test account address (sender)
const account1 = '0xEB3B074990eE85dBb70b5Aeb8CeB36F92C08A113'

//random eth wallet address (recipient)
const account2 = '0x570b65E13445035651fed59aBB8Fc36822e9cD9d'

//to create a transaction, you need your private key to sign them
//sender private key
const privateKey1 =
  '9704558344f8b151c3aa82bb60d8527c6fa28333603d0f1432e05a34bb5d65a8'

//create a wallet instance
const walletInstance = new ethers.Wallet(privateKey1, provider)

const ERC20_ABI = [
  'function balanceOf(address) view returns (uint)',
  'function transfer(address to, uint amount) returns (bool)'
]

const address = '0xa36085F69e2889c224210F603D836748e7dC0088'
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
  //don't need to sign anything just to get balance
  const balance = await contract.balanceOf(account1)

  console.log(`
    Reading from ${address}
    Balance of sender: ${balance}
  `)

  //here we need to sign the contract with out wallet
  const contractWithWallet = contract.connect(walletInstance)

  //sending it
  const tx = await contractWithWallet.transfer(account2, balance)

  await tx.wait()

  console.log(tx)

  const balanceOfSender = await contract.balanceOf(account1)
  const balanceOfReceiver = await contract.balanceOf(account1)
  console.log(`
    Balance of sender ${balanceOfSender}
    Balance of receiver: ${balanceOfReceiver}
  `)
}

main()
