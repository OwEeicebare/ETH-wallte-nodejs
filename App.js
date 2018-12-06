let koa = require("koa")
let app = new koa();
let router = require("./router/router");
let path = require("path");
let views = require("koa-views");
let static = require("koa-static");
let body = require("koa-body");

app.use(async(ctx,next)=>{
    console.log(`${ctx.module}${ctx.url}`+"+++++++++++")
    await next();
})


app.use(body({multipart:true}))
app.use(static(path.join(__dirname,"static")))
app.use(views(path.join(__dirname,"views"),{extension:"ejs",map:{html:"ejs"}}))

app.use(router.routes())
console.log("监听3001端口")
app.listen(3001)