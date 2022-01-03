import './App.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import clipArtNumber from './utils/ClipArtNumber.json';

const App = () => {
  const CONTRACT_ADDRESS = "0xFABC863d329d5F7e23210620e4e4236136EB732A"
  const [currentAccount, setCurrentAccount] = useState("");
  const [outOfNFTs, setOutOfNFTs] = useState(false);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
    } else {
      console.log("We have the ethereum object", ethereum);
    }
    const accounts = await ethereum.request({ method: 'eth_accounts' });


    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account)
      setupEventListener()
    } else {
      console.log("No authorized account found")
    }
  }
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      setupEventListener() 
    } catch (error) {
      console.log(error)
    }
  }
  const setupEventListener = async () => {
    // Most of this looks the same as our function askContractToMintNft
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, clipArtNumber.abi, signer);

        // THIS IS THE MAGIC SAUCE.
        // This will essentially "capture" our event when our contract throws it.
        // If you're familiar with webhooks, it's very similar to that!
        connectedContract.on("ClipArtNumberMinted", (from, tokenId) => {
          console.log("token id that just got minted", tokenId.toNumber());
          if (tokenId.toNumber() === 6){
            setOutOfNFTs(true)
          }
        });


      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const askContractToMintNFT = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, clipArtNumber.abi, signer);

        let nftTxn = await connectedContract.mintNFT();

        console.log("minning");
        await nftTxn.wait();
        
      }

    } catch (e) {
      console.log(e)
    }
  }

  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
      Connect to Wallet
    </button>
  );

  const renderMintUI = () => {
    if (outOfNFTs){
      return (
        <button onClick={null} className="bg-green-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
        out of NFTS
      </button>
      )
    }
return (
  <button onClick={askContractToMintNFT} className="bg-blue-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
  Mint NFFT
</button>
)

  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])
  return (
    <div className="flex h-screen bg-gray-200">
      <div className="m-auto">
        <div className="w-full max-w-xs">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="flex items-center justify-between">
              {currentAccount === "" ? renderNotConnectedContainer() : renderMintUI()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;



