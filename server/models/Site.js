const DataModel = require('../database/DataModel');

class Site extends DataModel{
    constructor(){
      super({});
      this.setTable("sites");
    
    }
    async getByHostname(hostname){
      console.log(hostname);
      
      try {
        let table = await this.getTable();
        let cursor = await table.filter({hostname}).run(this.connection);
        
        try {
          await table.indexCreate("sitename").run(this.connection);
          return cursor.toArray();
        } catch (error) {
          return cursor.toArray();
        }
      } catch (error) {
        console.log(error);
        return error.msg;
      }
    }
    async  seed(){
      try {
        let table = await this.getTable();
        let count = await table.filter({'sitename':"taosimnet"}).count().run(this.connection);
        if(count === 0){
          return await table.insert([
            {
              hostname: "taosim.net", otherHostnames: [], sitename: "taosimnet",
              title: "道者网",
              logo: "",
              subTitle: "享受精彩链上生活",
              banner: {
               
                leftButton: {
                  text: "了解更多",
                  link: ""
  
                },
                rightButton: {
                  text: "立刻认购",
                  link: ""
                },
                bgPic: "https://eos.io/images/dawn_topbanner.jpg",
                bgColor: "" 
              },
              navs: [
                {name: "首页", link: "/"},
                {name: "资源", link: "/resource"},
                {name: "问答", link: "/faq"},
                {name: "博客", link: "/blogs"}
              ],
              blocks: [
                {
                  type: "leftPic-right",
                  pic: "",
                  rightText: ""
                },
                {
                  type: "multiple-column",
                  texts: [],
                  pics: []
                  
                },
                {
                  type: 'rightPic-left',
                  pic: "",
                  rightText: ""
                }
              ],
              footer: [
                {
                  lineTitle: "",
                  lings: [],
                },
                {
                  lingTitle: "",
                  lings: [],
                }
              ],
              legal: {
  
              }
  
            }
          ]).run(this.connection);
        }else{
          return "sitename: taosimnet already exists";
          
        }
        
      } catch (err) {
        console.log(err);
        
      }
    }
    
  }

  module.exports = Site;