
module.exports = {
  
testMatch: [
   	"**/__tests__/**/fullTest.test.js?(x)",
   //	"**/?(*.)+(spec|test).js?(x)"
 	],
   bail: true,
   verbose: true,
  forceExit: true,
  setupFilesAfterEnv: ["./__tests__/setup.js"],
  
  };