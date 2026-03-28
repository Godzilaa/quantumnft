// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title TreasureFunNFT
 * @dev An ERC721 NFT Contract that allows users to mint NFTs by paying a fee in USDT.
 * Deployable on any EVM-compatible chain (BSC, Polygon, Ethereum, etc)
 */
contract TreasureFunNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    
    // Interface for the USDT Token contract on your chosen blockchain
    IERC20 public usdtToken;
    
    // The cost to mint 1 NFT in USDT variants (Keep in mind decimals: ETH = 6, BSC = 18 usually)
    uint256 public mintFee;

    // Events to allow tracking via frontend
    event NFTMinted(address indexed minter, uint256 indexed tokenId, string tokenURI);
    event MintFeeUpdated(uint256 newFee);

    /**
     * @param _usdtAddress The smart contract address of USDT 
     * @param _mintFee The initial fee to mint an NFT
     */
    constructor(address _usdtAddress, uint256 _mintFee) 
        ERC721("Treasure Fun Collection", "TUFT") 
        Ownable(msg.sender) 
    {
        usdtToken = IERC20(_usdtAddress);
        mintFee = _mintFee; 
    }

    /**
     * @dev Mint a new NFT by paying the USDT fee
     * @param uri The metadata URI (Usually an IPFS link pointing to a JSON with name, description, and image)
     */
    function mintNFT(string memory uri) public returns (uint256) {
        // 1. Ensure the user has approved THIS contract to spend their USDT
        require(
            usdtToken.allowance(msg.sender, address(this)) >= mintFee, 
            "Insufficient USDT allowance. Approve contract first."
        );
        
        // 2. Transfer USDT from minter to the contract owner's wallet
        // Requires the user to have enough balance
        bool success = usdtToken.transferFrom(msg.sender, owner(), mintFee);
        require(success, "USDT transfer failed");

        // 3. Mint the actual NFT to the user's wallet
        _nextTokenId++;
        uint256 newItemId = _nextTokenId;
        
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, uri);

        emit NFTMinted(msg.sender, newItemId, uri);

        return newItemId;
    }

    /**
     * @dev Allow owner to change the minting fee later
     */
    function setMintFee(uint256 newFee) public onlyOwner {
        mintFee = newFee;
        emit MintFeeUpdated(newFee);
    }

    /**
     * @dev Allow owner to update the USDT contract address just in case
     */
    function setUsdtToken(address _newUsdtAddress) public onlyOwner {
        require(_newUsdtAddress != address(0), "Invalid address");
        usdtToken = IERC20(_newUsdtAddress);
    }
}