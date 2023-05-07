// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

contract TripleEntryAccounting {
    struct Data{
        uint id;
        string hashedValue;
    }

    Data[] public data;

    function addData(uint id,string memory hashedValue) public {
        Data memory newData = Data(id, hashedValue);
        data.push(newData);
    }

    function getData() public view returns (Data[] memory) {
        return(data);
    }

    
}