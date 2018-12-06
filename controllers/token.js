/**
 * 代币转账
 */
let myContract = require("../models/contract").getContract()
let web3 = require("../utils/myUtils").getweb3();
let fail = require("../utils/myUtils")
let Tx = require("ethereumjs-tx");

module.exports = {
    sendToken: async (ctx) => {
        //拿到前端4个数据
        let fromaddress = ctx.request.body.fromaddress;
        console.log(fromaddress)
        let number = ctx.request.body.number;
        console.log(number)
        let privateKey = ctx.request.body.privateKey;
        console.log(privateKey)
        let toaddress = ctx.request.body.toaddress;
        console.log(toaddress)

        //转换为16进制数据用来签名交易数据
        privateKey = new Buffer(privateKey.slice(2), 'hex')
        //调用方法拿到nonce值
        let nonce = await web3.eth.getTransactionCount(fromaddress)
        //调用web3方法拿到预估用掉汽油值
        let gasPrice = await web3.eth.getGasPrice();
        //调用合约方法拿到给别人转的钱
        let balance = await myContract.methods.decimals().call()
        let towie = number * Math.pow(10, balance)

        //调用合约方法拿到自己的余额
        let myBalance = await myContract.methods.balanceOf(fromaddress).call()
        if (myBalance < balance) {
            ctx.body = fail("余额不足")
            return
        }
        //调用合约方法进行转账
        let tokenData = await myContract.methods.transfer(toaddress, towie).encodeABI();

        var rawTx = {
            nonce: nonce,
            gasPrice: gasPrice,
            to: myContract.options.address,
            from: fromaddress,
            data: tokenData
        }
        let gas = await web3.eth.estimateGas(rawTx)
        rawTx.gas = gas

        var tx = new Tx(rawTx);
        tx.sign(privateKey);

        var serializedTx = tx.serialize();

// console.log(serializedTx.toString('hex'));
// 0xf889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f
        let responseData;
        //签名交易
        await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, data) {
            console.log(err)
            console.log(data)
            if (err) {
                responseData = fail(err)
            }
        }).then(function (data) {
            if (data) {
                responseData = {
                    code: 0,
                    status: "success",
                    data: {
                        blockHash: data.blockHash,
                        transactionHash: data.transactionHash
                    }
                }
            } else {
                responseData = fail("交易失败")
            }
            console.log(data)
        })


        ctx.body = responseData
    }
}