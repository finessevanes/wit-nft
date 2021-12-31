//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";

contract ClipArtNumber is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _currentId;

    constructor() ERC721("ClipArtNumber", "CLPART") {}

    function mintNFT() public {
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);

        string
            memory baseImageURI = "ipfs://QmV7DEwpJT1ovKt9arqLy5qEgHPAe3tzoxVSNP44EZdkg1/";

        string memory randomNum = "3";

        string memory finalURI = string(
            abi.encodePacked(baseImageURI, randomNum, ".json")
        );

        _safeMint(msg.sender, newItemId);

        _setTokenURI(newItemId, finalURI);

        console.log("finalURI", finalURI);
        console.log("person who clicked", msg.sender);

        console.log(
            "An NFT w/ ID %s has been minted to %s",
            newItemId,
            msg.sender
        );

        // increment the coiunter for the next NFT is minted
        _tokenIds.increment();
    }
}
