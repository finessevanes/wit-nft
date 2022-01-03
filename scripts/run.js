require('dotenv').config()

const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("ClipArtNumber");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log(`the nftContract.address: ${nftContract.address}`);


  // let txn = await nftContract.mintNFT()
  // await txn.wait()
  // console.log("%%%%%%%% 1ST NFT MINTED %%%%%%%%%");
  // txn = await nftContract.mintNFT()
  // await txn.wait()
  // console.log("%%%%%%%%% 2ND NFT MINTED %%%%%%%%");
  // txn = await nftContract.mintNFT()
  // await txn.wait()
  // console.log("%%%%%%%%% 3RD NFT MINTED %%%%%%%%");
  // txn = await nftContract.mintNFT()
  // await txn.wait()
  // console.log("%%%%%%%%% 4TH NFT MINTED %%%%%%%%");
  // txn = await nftContract.mintNFT()
  // await txn.wait()
  // console.log("%%%%%%%%% 5TH NFT MINTED %%%%%%%%");
  // txn = await nftContract.mintNFT()
  // await txn.wait()
  // console.log("%%%%%%%%% 6TH NFT MINTED %%%%%%%%");
  // txn = await nftContract.mintNFT()
  // await txn.wait()
  // console.log("%%%%%%%%% SHOULD FAIL");

  


  // send money to someone else
  // will need to get the other contract too 
  // call  a function from there to send payment

}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch(e){
    console.log(e);
    process.exit(1);
  }
}

runMain();