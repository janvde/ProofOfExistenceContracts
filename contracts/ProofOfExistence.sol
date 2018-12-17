pragma solidity ^0.4.24;

contract ProofOfExistence {
    event ProofSet(
        bytes32 proof,
        uint blockNumber
    );

    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    mapping(bytes32 => uint) public proofs;

    function setProof(bytes32 proof) public {
        require(proofs[proof] == 0);

        proofs[proof] = block.number;

        emit ProofSet(proof, block.number);
    }

    function getBlockNumber(bytes32 proof) public view returns (uint) {
        return proofs[proof];
    }
}
