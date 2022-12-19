## install the development steps

1. install ipfs and set ipfs api port on 5001 and ipfs gateway on 9090
2. install rethinkdb and its driver for python
3. cmd: rethinkdb restore taosimnet_seed 
this command is to init the database
4. cmd: npm install
this command is to install dependency
5. cmd: npm run build //to build the client app 
6. cmd: npm start //to start a development server to serve the client app
7. cmd: node ./server/index.js //to start a the koa server side
8. server listen on localhost:8361
9. client listen on localhost:3000