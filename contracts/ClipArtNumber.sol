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

    string baseImageURI =
        "ipfs://QmV7DEwpJT1ovKt9arqLy5qEgHPAe3tzoxVSNP44EZdkg1/";
    event ClipArtNumberMinted(address sender, uint256 tokenId);
    uint256[] mintableIds = [0, 1, 2, 3, 4, 5];

    constructor() ERC721("ClipArtNumber", "CLPART") {

    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    // One solution I can think of is to use an array a = [0, 1, 2, ..., 6] to keep track of the unminted token ids, % a.length instead of & 7, remove the id that gets minted after every call, and end the recursive calls when a has only 1 element inside of it. Otherwise, the random number algorithm can stay the same

    function getFinalTokenIdToMint(uint256 tokenId) private returns (uint256) {
        uint256 rand = random(
            string(
                abi.encodePacked(
                    "RandomNumber",
                    block.timestamp,
                    Strings.toString(tokenId)
                )
            )
        );
        uint256 randomItemNumber = rand % (mintableIds.length);
        console.log("virgin randomItemNumber", randomItemNumber);

        if (_exists(randomItemNumber) && mintableIds.length > 1) {
            for (uint i = 0; i < mintableIds.length; i++){
                if (randomItemNumber != mintableIds[i]){
                    randomItemNumber = mintableIds[0];
                }
            }
            // console.log("**randomItemNumber when it comes into if statement**", randomItemNumber);
            // console.log("removing  mintable[randomItem");
            delete mintableIds[randomItemNumber];
            // console.log("randomItemNumber.length - 1             :", mintableIds[mintableIds.length - 1]);
            // console.log("mintableIds[randomItem] 0000000:           ", mintableIds[randomItemNumber]);
            // console.log("***************************************************************************************************");
            uint256 numToMove = mintableIds[mintableIds.length - 1];
            // console.log("numToMove:::::", numToMove);
            mintableIds[randomItemNumber] = numToMove;
            // console.log("#### popping last item ####");
            // console.log("mintableIds[randomItem] updated number  ", mintableIds[randomItemNumber]);
            mintableIds.pop();
            // console.log(mintableIds[mintableIds.length - 1]);
            // getFinalTokenIdToMint(randomItemNumber);
            randomItemNumber = mintableIds[0];
        }

        delete mintableIds[randomItemNumber];
        uint256 numToMove1 = mintableIds[mintableIds.length - 1];
        mintableIds[randomItemNumber] = numToMove1;
        mintableIds.pop();
        // console.log("after pop outside of if statement, this is now the last item of the array", mintableIds.length - 1);
        console.log(mintableIds.length);

        console.log("final return value of randomItemNumber:", randomItemNumber);
        return randomItemNumber;
    }

    // mint number
    // if numver exist in array, add 1 to numver

    // function getFinalTokenIdToMint(uint256 tokenId) private returns (uint256) {
    //     uint256 rand = random(
    //         string(
    //             abi.encodePacked(
    //                 "RandomNumber",
    //                 block.timestamp,
    //                 Strings.toString(tokenId)
    //             )
    //         )
    //     );

    //     uint256 randomItemNumber = rand % 7;

    //     if (_exists(randomItemNumber)) {
    //         delete mintableIds[randomItemNumber-1];
    //         for (uint i = 0; i < 7; i++){
    //             console.log("for loop: ", mintableIds[i]);
    //         }
    //         // console.log("randomItemNumber that exists", randomItemNumber);

    //         randomItemNumber = mintableIds[mintableIds.length - 1];

    //         // console.log("new number:", randomItemNumber);
    //     }

    //     return randomItemNumber;
    // }

    function mintNFT() public {
        uint256 newItemId = _tokenIds.current();
        uint256 currentIdToMint = getFinalTokenIdToMint(newItemId);
        string memory randomNum = "2";

        string memory finalURI = string(
            abi.encodePacked(baseImageURI, randomNum, ".json")
        );

        require(newItemId < 7, "No more available to mint");

        _safeMint(msg.sender, currentIdToMint);

        _setTokenURI(currentIdToMint, finalURI);

        _tokenIds.increment();
        console.log("NFT tokenid minted: ", currentIdToMint);

        emit ClipArtNumberMinted(msg.sender, currentIdToMint);
    }
}
