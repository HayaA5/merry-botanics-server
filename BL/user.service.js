const userController = require("../DL/Controller/user.controller"),
  auth = require("../middleware/auth"),
  bcrypt = require("bcrypt"),
  SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

  const getUser = async ({email}) => {
    const user=await userController.readOne({email});
    if (!user) {throw {code:400, message:"user not found get user"}}
    return user
  }
      
  const getAllUsers = async () => {
      const users= await userController.readMany();
      if(users.length==0)  throw({code:400, message:"There is no user in this application!"});
      return users
  }

const register = async (data) => {
  try {
    if(!data.email || !data.password || !data.fullName) return {code:402, message:"missing data"}
    const emailExists = await userController.readOne({ email: data.email });
    if (emailExists) return { code: 401, message: "The user already exists" };
    const hashedPassword=await bcrypt.hash(data.password, SALT_ROUNDS);
    const user=await userController.create({fullName:data.fullName, email:data.email, password:hashedPassword});
    const token =await auth.createLoginToken(user._id)
     return {code:200, message:token}
   // return "The user has been registered successfully";
  } catch (error) {
    throw { code: 401, msg: "Internal server error" };
  }
};

const login = async (data) => {
  try {
    const user = await userController.readOne({ email: data.email }, "+password");
    if (!user) {return { code: 401, message: "user not found" };}
   
    if (!bcrypt.compareSync(data.password, user.password)){
      return { code: 401, message: "not correct password" };
    }
    await userController.update({email:user.email}, { lastConnectedDate: new Date() }); // update last login
    const token = await auth.createLoginToken({ email: user.email, id: user._id }); // create new token
    return {code:200, message:{token, userDetails:user}}
  } catch (error) {
    throw { code: 401, message: "Internal server error" };
  }
};

// const createTokenForPasswordReset = async (data) => {
//   try {
//     const user = await userController.readOne({ email: data.email });
//     if (!user) throw { code: 401, msg: "user not found" };
//     const token = await auth.createTokenForPasswordChange({ email: user.email, id: user._id, });
    
//    // return token;
//     // const result = await sendOrderEmail(
//     //   user.email,
//     //   "Change password",
//     //   data.html(data.token)
//     // );
//     // return "The email was sent successfully";
//   } catch (error) {
//     throw { code: 401, msg: "Internal server error" };
//   }
// };

// const resetPassword=async (data)=>{
//   const user = await userController.readOne({ email: data.email });
//   if (!user) throw { code: 401, msg: "user not found" };
//   const token = await auth.createTokenForPasswordChange({ email: user.email, id: user._id, });
//   const hashedPassword=await bcrypt.hash("0000", SALT_ROUNDS);
//   await userController.update({email:data.email},{password:hashedPassword})
//   return token
// }




// const getPasswordVerification = async (data) => {
//   try {
//     data.passwordVerification = bcrypt.hashSync(data.password, SALT_ROUNDS);
//     if (data.password !== data.passwordVerification) throw {
//       msg: 'Password not the same as the password verification', code: 401
//     };
//     console.log('------', data)
//     await userController.update({ email: data.email }, { password: data.password });
//     return "Password changed successfully";
//   } catch (error) {
//     throw { code: 401, msg: "Internal server error" };
//   }
// }
//getPasswordVerification({email:"aminovhaya@gmail.com", password:"xxx"})
module.exports = { register, login, getUser, getAllUsers};

