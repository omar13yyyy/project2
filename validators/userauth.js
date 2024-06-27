const jwt = require('jsonwebtoken');

const userMiddleware= (req, res, next) => {
  const authHeader = req.headers.authorization;    if (!authHeader) {
        return res.status(401).send({ message: 'Unauthorized' });
      }console.log(authHeader)
       var userId

      jwt.verify(authHeader, process.env.TOKEN_SECRET, (error, decoded) => {
       userId = decoded.id; 
       role = decoded.role; 

       exports.userId 
  console.log(role+"kjhgf")
  
  req.userId = userId;
  next(); 

    }); 
  };module.exports = userMiddleware;
 


