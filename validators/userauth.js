const jwt = require('jsonwebtoken');

const userMiddleware= (req, res, next) => {

  if(req.headers.authorization != undefined){
  const authHeader = req.headers.authorization;

    console.log(authHeader)
    if (!authHeader) {
        return res.status(401).send({ message: 'Unauthorized' });
      }
      //console.log(authHeader)
       var userId

      jwt.verify(authHeader, process.env.TOKEN_SECRET, (error, decoded) => {
       userId = decoded.id; 
      // role = decoded.role; 

  
  req.userId = userId;
  next(); 

    }); 
  }else 
 // return res.status(401).send({ message: 'Unauthorized' });
 return res.status(200).send([{ idKey:"",name:"",email:"",number:"",address:"",date:"" }]);

  ;
}
  
  module.exports = userMiddleware;
 


