import jwt from 'jsonwebtoken';

export const isAuth=(req,res,next)=>{
   try {
    let token=req.headers.authorization.replace('Bearer','');
    if(!token) return res.status(401).json({success:false,message:"Access Denied!!"});
      
    let {id}=jwt.verify(token,process.env.JWT_SECRET);
    req.userId=id;
    next();
    
   } catch (er) {
      return res.status(500).json({success:false,message:er.message});
   }
}