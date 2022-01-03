require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

// using account 1TestAccount
module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {},
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_URL}`,
      accounts: [`${process.env.REACT_APP_PRIVATE_KEY}`]
    }
  }
};
