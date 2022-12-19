const r = require('rethinkdb');
async function connect(params){
  try {
    return await r.connect(params);
  } catch (error) {
    console.log(error);
    return {
      status: "failed",
      msg: error.msg,
    };
  }
  
}
const connectParams = {host: 'localhost', port: 28015};
let conn = null;
let initConn = async ()=>{
  conn = await connect(connectParams);
}
initConn();
class DataModel{
    constructor(params){
      this.db = "taosimnet";
      this.connection = conn;
      this.r = r;
    }
    async setTable(tableName){
      this.table = await this.r.db(this.db).table(tableName);
    }
    async getTable(){
      return await this.table;
    }
   
}
module.exports = DataModel;