const supertest= require ("supertest")
const fs = require ("fs")
const createdb =require('../database/createdb');


module.exports= () => { 
    describe('createCleanDB',()=>{
    var token ;
    function sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }
        it('should retutns a 200',async ()=>{

         await createdb();
             
         await sleep(1);
        
    })
})

}