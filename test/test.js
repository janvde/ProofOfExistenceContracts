const ProofOfExistence = artifacts.require('contracts/ProofOfExistence.sol');


contract('ProofOfExistence', function (accounts) {


    it("non existing hash should return blocknumber 0", function () {
        return ProofOfExistence.deployed().then(function (instance) {
            return instance.getBlockNumber.call("fcf52912003e5d702d22596df8a65e5da493a58ea20f05edb3ab71f1ead6f550");
        }).then(function (balance) {
            assert.equal(balance.valueOf(), 0);
        });
    });


    it("should return non zero blocknumber", function () {
        let poe;
        let beforeNumber
        return ProofOfExistence.deployed().then(function (instance) {
            poe = instance;
            return poe.getBlockNumber.call('fcf52912003e5d702d22596df8a65e5da493a58ea20f05edb3ab71f1ead6f551');
        }).then(function (blockNumber) {
            beforeNumber = blockNumber
            return poe.setProof('fcf52912003e5d702d22596df8a65e5da493a58ea20f05edb3ab71f1ead6f551');
        }).then(function () {
            return poe.getBlockNumber.call('fcf52912003e5d702d22596df8a65e5da493a58ea20f05edb3ab71f1ead6f551');
        }).then(function (blockNumber) {
            assert.equal(beforeNumber.toNumber(), 0, "Before setProof the block number is 0");
            assert.equal(blockNumber.toNumber(), 5, "After setProof the block number is 5");
        });
    });

});