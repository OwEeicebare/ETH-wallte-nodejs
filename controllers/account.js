let web3 = require("../utils/myUtils").getweb3();
let fs = require("fs");

async function getAccountBalance(address) {
    let balance = await web3.eth.getBalance("0x407d73d8a49eeb85d32cf465507dd71d507100c1");

    return web3.utils.fromWei(balance,"ether");
}

module.exports = {
    unlockAccountWithPrivate:async (ctx)=>{
        //1.获取私钥
        let privatekey = ctx.request.body.privatekey
        console.log(privatekey+"++++++_______")
        //2.通过私钥解锁账户
        let account =await  web3.eth.accounts.privateKeyToAccount("0x42C4E140169828F9663F2552F9BBF50CB526CC3C0417143D123D860DE53DA94E");
        console.log(account+"()()()()((")
        let address = account.address;
        console.log(address+"!!!!")
        //3.获取账户余额
        let balance =await web3.eth.getBalance(address);
        console.log(account.privateKey+"OPOPOP")
        //4.返回相应数据给前端
        responseData = {
            code:0,
            status:"success",
            data:{
                balance: balance,
                balance2: address,
                privateKey:account.privateKey
            }
        }
        ctx.body = responseData;
    },

    unlockAccountWithkeystore:async (ctx)=>{
        //1.获取前端数据
       let password = ctx.request.body.password
        console.log(password)
        let keystore = ctx.request.files.file;
       console.log(keystore)
        //2.读取缓存文件中的数据
        let keystoreData = fs.readFileSync(keystore.path);
       console.log(keystoreData)
        //3.解锁账户
        let account = web3.eth.accounts.decrypt(JSON.parse(keystoreData),password);
       console.log(account)
        let address = account.address;
        //4.获取账户余额
        let balance = await getAccountBalance(address);
        console.log(account.privateKey+"OPOPOP")
        //5.返回相应数据给前端
        responseData = {
            code:0,
            status:"success",
            data:{
                balance: balance,
                balance2: address,
                privatekey:account.privateKey
            }
        }
        ctx.body = responseData;
    }
}