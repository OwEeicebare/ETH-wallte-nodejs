let web3 = require("../utils/myUtils").getweb3();


let privateKeyToAccount = web3.eth.accounts.privateKeyToAccount("0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709");
//let balance = web3.eth.getBalance("0x407d73d8a49eeb85d32cf465507dd71d507100c1");
console.log(privateKeyToAccount.address)
//console.log(balance+"+++++")