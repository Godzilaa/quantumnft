// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TuftToken
 * @dev TUFT — in-platform currency for TreasureFun
 *
 * Features:
 *  - Fixed max supply of 1 billion TUFT
 *  - Owner can mint up to the max supply (platform rewards, airdrops, etc.)
 *  - Any holder can burn their own tokens
 *  - 18 decimals (standard ERC-20)
 */
contract TuftToken is ERC20, ERC20Burnable, Ownable {
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10 ** 18; // 1 billion TUFT

    error MaxSupplyExceeded(uint256 requested, uint256 available);

    constructor(address initialOwner)
        ERC20("Tuft", "TUFT")
        Ownable(initialOwner)
    {
        // Mint 100 million TUFT to the deployer as initial platform reserve
        _mint(initialOwner, 100_000_000 * 10 ** 18);
    }

    /**
     * @notice Mint new TUFT tokens (only owner — e.g. platform treasury contract)
     * @param to     Recipient address
     * @param amount Amount in wei (18 decimals)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        uint256 available = MAX_SUPPLY - totalSupply();
        if (amount > available) {
            revert MaxSupplyExceeded(amount, available);
        }
        _mint(to, amount);
    }
}
