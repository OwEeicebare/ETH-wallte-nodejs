let fs = require("fs");
let path = require("path");
let web3 = require("../utils/myUtils").getweb3()

module.exports = {
    //跳转新建账户页面
    newAccoutHtml:async (ctx)=>{
        await ctx.render("newaccount.html")
    },
    //新建账户
    newAccout:async (ctx)=>{
        console.log("newAccount")
        console.log("输入的密码为"+ctx.request.body.password)
        //通过web3.eth.accounts传入密码来新建账户
        let account = web3.eth.accounts.create(ctx.request.body.password);
        console.log(account)
        //通过账户的encrypt方法传入密码得到一个keystorejson对象
        let keystore = account.encrypt(ctx.request.body.password);
        console.log(keystore)
        //转换为string类型
        let keystoreString = JSON.stringify(keystore);
        //新建时间
        let date = new Date();
        //拼接字符串得到文件名
        let fileName = 'UTC--'+date.toISOString()+'--'+account.address.slice(2)
        let newFileName =fileName.replace(/:/g, ".")
        //调用path模块拼接路径
        let filePath = path.join(__dirname,"../static/keystores",newFileName)
        //写入固定文件夹中供用户下载
        fs.writeFileSync(filePath,keystoreString)
        //成功后跳转页面利用ejs模板引擎动态更新数据
        await ctx.render("downloadkeystore.html",{
            "downloadurl":"keystores/"+newFileName,
            "privatekey":account.privateKey
        })

    }
}