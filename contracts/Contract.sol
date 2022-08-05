// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract TestContract {
    string public test;
    constructor(string memory _test) {
        test = _test;
    }
}
