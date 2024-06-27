const fs =require("fs")
const runsql = require("./commitsql");
const sql = fs.readFileSync("./database/DB.sql", "utf8");
async function createdb(){
    runsql(sql)
}
module.exports= createdb;


