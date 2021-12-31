import './App.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import clipArtNumber from './utils/ClipArtNumber.json';

const App = () => {
  const CONTRACT_ADDRESS = "0xB1837452D1C03A83528A35C200044a3553d1AC52"
  const [currentAccount, setCurrentAccount] = useState("");

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

        console.log("calling mintNFT()");
        let nftTxn = await connectedContract.mintNFT();

        console.log("minning");
        await nftTxn.wait();

        console.log(`mined: ${nftTxn.hash}`);
        console.log(`keys: ${Object.keys(nftTxn)}`)
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

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])
  return (
    <div className="flex h-screen bg-gray-200">
      <div className="m-auto">
        <div className="w-full max-w-xs">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="flex items-center justify-between">
              {currentAccount === "" ? (
                renderNotConnectedContainer()
              ) : (
                <button onClick={askContractToMintNFT} className="bg-blue-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                  Mint NFFT
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;



