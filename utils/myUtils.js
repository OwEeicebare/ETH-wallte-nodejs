module.exports = {
    getweb3:()=>{
        let Web3 = require("web3");
//let ganache = require("ganache-cli");
//let web3 = new Web3(ganache.provider());
        let HDWalletProvider = require("truffle-hdwallet-provider");
//npm i -S truffle-hdwallet-provider@0.0.3

        let mnemonic = "laundry hat okay reform escape under bundle dentist rapid scene meadow resemble";
        let provider = new HDWalletProvider(mnemonic,'https://rinkeby.infura.io/v3/a0d7b499a2204dad90d26a89f54358cb');
        let web3 = new Web3(provider);

        return web3
    }
}