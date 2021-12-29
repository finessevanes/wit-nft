import './App.css';
import { useEffect, useState } from 'react';
// import clipArtNumber from './utils/ClipArtNumber.json';
// import { ethers } from "ethers";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
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

  const connectWallet =  () => {
    try {
      // const { ethereum } = window;

      // if (!ethereum) {
      //   alert("Get MetaMask!");
      //   return;
      // }

      console.log("test")
      /*
      * Fancy method to request access to account.
      */
    //   const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    //   /*
    //   * Boom! This should print out public address once we authorize Metamask.
    //   */
    //   console.log("Connected", accounts[0]);
    //   setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error)
    }
  }

  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="">
      Connect to Wallet
    </button>
  );

  // useEffect(() => {
  //   checkIfWalletIsConnected()
  // }, [])

  return (
    <div className="flex h-screen bg-gray-200">
      <div className="m-auto">
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="flex items-center justify-between">
            {currentAccount === "" ? (
            renderNotConnectedContainer()
          ) : (
            <button onClick={null} className="cta-button connect-wallet-button">
              Mint NFT
            </button>
          )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
