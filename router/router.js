let router = require("koa-router")();
let newAccountController = require("../controllers/newAccount")
let trasactionConytoller = require("../controllers/transaction")
let accountController = require("../controllers/account");
let tokenController = require("../controllers/token");

//创建钱包账户
router.get("/newaccount",newAccountController.newAccoutHtml)
//提交钱包账户
router.post("/newaccount",newAccountController.newAccout)
//发送交易
router.post("/sendTransaction",trasactionConytoller.sendTransaction)
//查看交易相请
router.get("/checktransaction",trasactionConytoller.checkTransactionHtml)
router.post("/checktransaction",trasactionConytoller.checkTransaction)
//获取转账的页面
router.get("/transaction",trasactionConytoller.transactionHtml)
//通过私钥解锁账户
router.post("/privateunlock",accountController.unlockAccountWithPrivate)
//通过私钥解锁账户
router.post("/Keystoreunlock",accountController.unlockAccountWithkeystore)

//token转账
router.post("/sendToken",tokenController.sendToken)

module.exports = router