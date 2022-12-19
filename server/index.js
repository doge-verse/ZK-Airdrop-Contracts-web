const path = require('path');
const Koa = require('koa');
const send = require('koa-send');
const routes = require('./routes.js');
const Site = require('./models/Site.js');


const app = new Koa();

app.use(async (ctx, next) => {
  let site = null;
  
  switch(ctx.header.host){
    case "taosim.net":
      ctx.state = Object.assign({},ctx.state,{
        sitename: "taosim.net",
      } );
      
      await next(ctx);
      break;
    default:
      site = await new Site(); 
      let currentSite = await site.getByHostname("taosim.net");
      
      if (currentSite.length === 0) {
        console.log("taosim.net is not find first tim e");
        
        site.seed();
      }
     
      ctx.state = Object.assign({},ctx.state,{
        hostname: "taosim.net",
      } );
            
      await next(ctx);
      break;
  }
});
const json = require('koa-json');
app.use(json({ pretty: false, param: 'pretty' }))

app.use(routes);

app.use(async (ctx) => {
      const regex = /\Sapi\S/;
      if(!ctx.path.match(regex)){
       await send(ctx, ctx.path, { root: path.resolve('./client','build') });
      }
    
  }
);


app.listen(8361);
console.log("listen on 8361");
