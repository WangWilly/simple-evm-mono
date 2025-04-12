// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract MessageStore {
    string private message;
    address private owner;

    event MessageStored(string newMessage);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function storeMessage(string calldata newMessage) external onlyOwner {
        require(bytes(newMessage).length > 0, "Message cannot be empty");
        message = newMessage;
        emit MessageStored(newMessage);
    }

    function retrieveMessage() external view returns (string memory) {
        return message;
    }
}
