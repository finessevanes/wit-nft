//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";

contract ClipArtNumber is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721 ("ClipArtNumber", "CLPART"){}

    function mintNFT() public {
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);

        // set the nfts metadata
        _setTokenURI(newItemId, "https://jsonkeeper.com/b/F846");
        console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);

        // increment the coiunter for the next NFT is minted
        _tokenIds.increment();
    }

    
}
