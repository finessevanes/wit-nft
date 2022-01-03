//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";

contract ClipArtNumber is ERC721URIStorage, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string baseImageURI =
        "ipfs://QmV7DEwpJT1ovKt9arqLy5qEgHPAe3tzoxVSNP44EZdkg1/";

    event ClipArtNumberMinted(address sender, uint256 tokenId);


    constructor() ERC721("ClipArtNumber", "CLPART") {
        _tokenIds.increment();
    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    function mintNFT() public {
        uint256 newItemId = _tokenIds.current();

        string memory finalURI = string(
            abi.encodePacked(baseImageURI, newItemId.toString(), ".json")
        );

        require(newItemId < 7, "No more available to mint");
        
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, finalURI);
        _tokenIds.increment();

        emit ClipArtNumberMinted(msg.sender, newItemId);
    }
}
