// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title MockUSDT
 * @dev A mock ERC20 token to represent USDT on the testnet.
 * We need this so you have an actual token contract to test your NFT minting fee logic!
 */
contract MockUSDT is ERC20 {
    constructor() ERC20("Mock USDT", "USDT") {
        // Mint 1,000,000 USDT to the deployer for testing
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // Allow anyone to mint themselves some test USDT 
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
