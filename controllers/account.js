let web3 = require("../utils/myUtils").getweb3();
let fs = require("fs");
let myContract = require("../models/contract").getContract()

//获取账户余额转换成ether为单位的
async function getAccountBalance(address) {
    let balance = await web3.eth.getBalance(address);

    return web3.utils.fromWei(balance, "ether");
}

//设置响应数据
async function setResponseData(account) {
    //获取账户余额wei
    //let balance =await web3.eth.getBalance(account.address);
    //console.log(balance)

    //获得账户地址
    let address = account.address
    //调用方法获得以ether为单位的余额
    let balance = await getAccountBalance(address);
    //获取代币的数据
    let myBalance = await myContract.methods.balanceOf(account.address).call()
    let decimals = await myContract.methods.decimals().call()
    myBalance = myBalance / Math.pow(10, decimals)
    let symbol = await  myContract.methods.symbol().call()
    //返回相应数据给前端
    return responseData = {
        code: 0,
        status: "success",
        data: {
            balance: balance,
            balance2: account.address,
            privateKey: account.privateKey,
            tokenbalance: myBalance,
            tokenname: symbol

        }
    }
}

module.exports = {
    //输入密码解锁账户
    unlockAccountWithPrivate: async (ctx) => {
        //1.获取私钥
        let privatekey = ctx.request.body.privatekey
        console.log("私钥为:" + privatekey)
        //2.通过私钥解锁账户
        let account = await  web3.eth.accounts.privateKeyToAccount(privatekey);
        console.log(account)


        ctx.body = await setResponseData(account);
    },
    //通过keystore文件来解锁账户
    unlockAccountWithkeystore: async (ctx) => {
        //1.获取前端数据
        let password = ctx.request.body.password
        console.log(password)
        let keystore = ctx.request.files.file;
        console.log(keystore)
        //2.读取缓存文件中的数据
        let keystoreData = fs.readFileSync(keystore.path);
        console.log(keystoreData)
        //3.解锁账户
        let account = web3.eth.accounts.decrypt(JSON.parse(keystoreData), password);
        console.log(account)


        ctx.body = await setResponseData(account);
    }
}