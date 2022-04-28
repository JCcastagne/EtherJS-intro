const { ethers } = require('ethers')

const INFURIA_ID = 'd3779648f1084bb0a450b3e74f00b4cd'
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURIA_ID}`
)

const main = async () => {
  //get a certain block:
  //  const block10004 = await provider.getBlock(10004)
  //or just get latest block:
  const latestBlock = await provider.getBlockNumber()
  console.log(`Latest Block number: ${latestBlock}`)

  //get Block information
  const blockInfo = await provider.getBlock(latestBlock)
  console.log(blockInfo)

  //get transactions of the block
  const { transactions } = await provider.getBlockWithTransactions(latestBlock)
  //get a specific transaction from the block
  console.log(
    `First transaction of the block: ${JSON.stringify(transactions[0])}`
  )
}

main()
