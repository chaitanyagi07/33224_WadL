const User=require('./user.module');
const jwt = require('jsonwebtoken');

class UserController{
      async createUser(req,res){
        try {
            const {email} = req.body;
            const existingUser = await User.findOne({email});
            console.log(existingUser);
            if (existingUser) {
              return res.status(400).json({ message: 'User already exists' });
            }        
            const newUser = new User(req.body);
            await newUser.save();
            return res.status(201).json(newUser);
        } catch (error) {
            throw error;
        }
      }
      async login(req,res){
        try{
           
            const {email,password}=req.body;
            const user=await User.findOne({email});
 
            if (!user) {
             return { message: 'User not found' };
         }
 
         const isValidPassword = await user.isValidPassword(password);
 
         if (!isValidPassword) {
             return { message: 'Invalid email or password!' };
         }
            const token = jwt.sign({ userId: User._id }, 'secret', { expiresIn: '1h' });
            return res.status(200).json({ token });
       }
       catch(error){
           res.status(500).json({ error: 'Internal server error' });
       }
      }
      
    async getall(req,res){
        try{
            const result=await User.find();
            return res.status(200).json(result);
        }
        catch(error){
          console.error(error);
          return ({ message: 'Internal server error' });
        }
      }
    async deleteall(req,res){
        try{
            const deleteResult=await User.deleteMany();
            return res.status(200).json({ message: 'Deleted successfully', deleteResult });
         }
         catch(error){
            throw error;
         }
    }
}
module.exports=new UserController();