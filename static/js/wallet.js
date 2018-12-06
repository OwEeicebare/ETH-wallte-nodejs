

function saveKeystoreNext() {
    alert("haha")
    $("#save-privatekey").show()
    $("#save-keystore").hide()

}

$("#unlock").ready(function () {
    $("input[name=unlocktype]").change(function () {
        if (this.value==1){
            $("#unlock-account-privatekey").hide()
            $("#unlock-account-keystore").show()
        }else {
            $("#unlock-account-privatekey").show()
            $("#unlock-account-keystore").hide()

        }
    })

    $("#send-transaction-form").validate({
        rules:{
            toaddress:{
                required:true
            },
            number:{
                required:true
            }
        },
        messages:{
            toaddress:{
                required:"请输入对方地址"
            },
            number:{
                required:"请输入转账额度"
            }
        },
        submitHandler:function (form) {
            console.log("()()()()()()()")
            var urlStr
            let tokenType = $("#send-token-kind").val()
            if (tokenType ==1){
                 urlStr = "/sendtransaction"
            }else {
                urlStr = "/sendToken"
            }

            alert("urlStr:"+urlStr)
            $(form).ajaxSubmit({
                url:urlStr,
                type:"post",
                dataType:"json",
                success:function (res, status) {
                    console.log(status+JSON.stringify(res))
                    if (res.code==0){
                        $("#transaction-complate-hash").text(res.data.transactionHash)
                        $("#transaction-complate-blockhash").text(res.data.blockHash)
                        $("#transaction-complate").show()
                    }
                },
                error:function (res, status) {
                    console.log(status+JSON.stringify(res))
                }
            })
        }
    })
})

function unlockAccountWithPrivatekey() {
    let privatekey = $("#input-privatekey").val()
    console.log(privatekey)
    $.post("/privateunlock",`privatekey=${privatekey}`,function (res, status) {
        console.log(status+JSON.stringify(res))
        //success{"code":0,"status":"success","data":{"balance":"0","balance2":"0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01","addresss":"sdfsdfsdfsdf"}}
        if (res.code == 0){

            $("#account-address").text(res.data.balance2)
            $("#account-balance").text(res.data.balance)

            $("#transaction-first").hide()
            $("#transaction-second").show()

            $("input[name=fromaddress]").val(res.data.balance2)
            $("input[name=privateKey]").val(res.data.privateKey)

            $("#account-token-info").text(res.data.tokenbalance+"  "+res.data.tokenname)
            $("#token-kind").text(res.data.tokenname)
        }
    })
}

function checkTransaction() {
    let hash = $("#transaction-info-hash").val();
    console.log(hash)
    $.post("/checktransaction",`hash=${hash}`, function (data, status) {
        console.log(status+JSON.stringify(data))
        if (data.code == 0){
            $("#transaction-info").text(JSON.stringify(data.data,null,4))
        }
    })
}

function unlockAccountWithkeystore() {
   var filedata = $("#unlock-accoutn-file").val()
    if (filedata.length <= 0){
       alert("请选择文件")
        return
    }
    //文件上传通过Formdata去储存文件的数据
    var data= new FormData()
    data.append("file",$("#unlock-accoutn-file")[0].files[0])
    data.append("password",$("#unlockaccountpassword").val())
    alert(data)
    var urlStr = "/Keystoreunlock"
    $.ajax({
        url:urlStr,
        type: "post",
        dataType:"json",
        contentType:false,
        data:data,
        processData: false,
        success:function (res, status) {
            alert(JSON.stringify(res))
            if (res.code == 0){

                $("#account-address").text(res.data.balance2)
                $("#account-balance").text(res.data.balance)

                $("#transaction-first").hide()
                $("#transaction-second").show()

                $("input[name=fromaddress]").val(res.data.balance2)
                $("input[name=privateKey]").val(res.data.privateKey)

                $("#account-token-info").text(res.data.tokenbalance+"  "+res.data.tokenname)
                $("#token-kind").text(res.data.tokenname)
            }
            },
        error:function (data, status) {
            alert(JSON.stringify(data))
            alert("密码不正确")
        }
    })


}