const DataModel = require('../database/DataModel');

class User extends DataModel{
    constructor(params){
      super(params);
      console.log(this.conn);
      this.username="username";
      this.password="password";
    }
    save(){
      return {
        username: this.username,
        password: this.password,
      }
    }
    create(username, password){
      this.username = username;
      this.password = password;
    }
  }

  module.exports = User;