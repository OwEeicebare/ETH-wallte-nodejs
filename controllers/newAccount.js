let fs = require("fs");
let path = require("path");
let web3 = require("../utils/myUtils").getweb3()
module.exports = {


    newAccoutHtml:async (ctx)=>{
        console.log("xxxxxxxxxxx")
        await ctx.render("newaccount.html")
    },
    newAccout:async (ctx)=>{
        console.log("newAccount")
        console.log(ctx.request.body.password+"++++++++++++++")

        let account = web3.eth.accounts.create(ctx.request.body.password);
        console.log(account)

        let keystore = account.encrypt(ctx.request.body.password);
        console.log(keystore)
        let keystoreString = JSON.stringify(keystore);

        let date = new Date();
        console.log(date)
        let fileName = 'UTC--'+date.toISOString()+'--'+account.address.slice(2)
        let newFileName =fileName.replace(/:/g, ".")
         console.log(newFileName)
        let filePath = path.join(__dirname,"../static/keystores",newFileName)

        fs.writeFileSync(filePath,keystoreString)

        await ctx.render("downloadkeystore.html",{
            "downloadurl":"keystores/"+newFileName,
            "privatekey":account.privateKey
        })

    }
}