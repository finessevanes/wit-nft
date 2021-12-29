require('dotenv').config()

const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("ClipArtNumber");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log(`the nftContract.address: ${nftContract.address}`);

  // call the minting function from ClipArtNumber
  let txn = await nftContract.mintNFT();

  // wait for it to finsih
  await txn.wait()

  console.log("this finished")

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