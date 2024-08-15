
require('dotenv').config();
const createdb =require('./database/createdb');
const seeder =require('./database/seeder');
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
async function db() {
    await createdb();
    await sleep(1);
   // await seeder();
  }
  db()