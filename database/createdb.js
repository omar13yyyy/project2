const fs =require("fs")
const runsql = require("./commitsql");
const sql = fs.readFileSync("./database/DB.sql", "utf8");
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
async function createdb(){

    
   await runsql(sql)
   
}
module.exports= createdb;


