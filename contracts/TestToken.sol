// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";

contract TestToken is ERC20BurnableUpgradeable {
    function initialize(string memory name, string memory symbol)
        public
        virtual
        initializer
    {
        __ERC20_init(name, symbol);
        _mint(address(msg.sender), 1000000000 * (10**uint256(decimals())));
    }
}
