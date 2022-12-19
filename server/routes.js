const path = require('path');
const fs = require('fs');
const Router = require('koa-router');
const Site = require('./models/Site.js');


const router = new Router();
const api = new Router();
const readFileThunk = function(src) {
  return new Promise(function (resolve, reject) {
    fs.readFile(src, {'encoding': 'utf8'}, function (err, data) {
      if(err) return reject(err);
      resolve(data);
    });
  });
}

router
.get('/', async (ctx, next) => {
  ctx.body = await readFileThunk(path.resolve('./client','build','index.html'));
  await next();
})
.get('/api/v1/site/home', async (ctx, next) => {
  ctx.response.is('application/json');
  ctx.set('Cache-Control', 'no-cache');
  ctx.request.accepts('json', 'text');
  let site = await new Site();
  let currentSite = await site.getByHostname(ctx.state.hostname);
  if(currentSite.length === 0 ){
    await site.seed();
    currentSite = await site.getByHostname(ctx.state.hostname);
  }
  ctx.response.body = currentSite[0];
  await next();
})
.get('/api/v1/users/:token', async (ctx, next) => {
  ctx.body = 'hello world';
  await next();
})
.get('/api/v1/users/:id/:token', async (ctx, next) => {
  ctx.body = 'hello world';
  await next();
})
.get('/api/v1/users/:username/:token', async (ctx, next) => {
  ctx.body = 'hello world';
  await next();
})
.get('/api/v1/users/auth/:userId/:token', async (ctx, next) => {
  ctx.body = 'hello world';
  await next();
})
.get('/api/v1/users/login', async (ctx, next) => {
  ctx.body = 'hello world';
  await next();
})
.get('/api/v1/users/create', async (ctx, next) => {
  ctx.body = 'hello world';
  await next();
})
.get('/api/v1/posts/:userId/:token', async (ctx, next) => {
  ctx.body = 'hello world';
  await next();
})


const routes = router.routes();
module.exports =  routes;