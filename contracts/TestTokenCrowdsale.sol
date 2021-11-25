// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract TestTokenCrowdsale {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    // How many token units a buyer gets per wei.
    // The rate is the conversion between wei and the smallest and indivisible token unit.
    // So, if you are using a rate of 1 with a ERC20Detailed token with 3 decimals called TOK
    // 1 wei will give you 1 unit, or 0.001 TOK.
    uint256 public rate;
    // Address where funds are collected
    address public wallet;
    // The token being sold
    IERC20 public token;

    constructor(
        uint256 _rate,
        address _wallet,
        IERC20 _token
    ) {
        require(_rate > 0, "CROWDSALE_RATE_IS_ZERO");
        require(_wallet != address(0), "ZERO_ADDRESS");
        require(address(_token) != address(0), "ZERO_ADDRESS");

        rate = _rate;
        wallet = _wallet;
        token = _token;
    }
}
