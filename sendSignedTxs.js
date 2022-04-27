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

//now that a wallet instance has been created, we can call sendTransaction on the wallet itself

const main = async () => {
  //show account 1 balance before transfer
  const senderBalanceBefore = await provider.getBalance(account1)
  //show account 2 balance before transfer
  const receiverBalanceBefore = await provider.getBalance(account2)

  console.log(`
    Sender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}
    Receiver balance before: ${ethers.utils.formatEther(receiverBalanceBefore)}
  `)

  //send Ether
  //walletInstance.sendTransaction({to: , value: })
  const tx = await walletInstance.sendTransaction({
    to: account2,
    value: ethers.utils.parseEther('0.0001')
  })

  //fetch transaction

  //wait until the tx has been mined before console.log'ing the transaction/tx
  await tx.wait()
  console.log(tx)

  //show account 1 balance after transfer
  const senderBalanceAfter = await provider.getBalance(account1)
  //show account 2 balance after transfer
  const receiverBalanceAfter = await provider.getBalance(account2)

  console.log(`
    Sender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}
    Receiver balance after: ${ethers.utils.formatEther(receiverBalanceAfter)}
  `)
}

main()
