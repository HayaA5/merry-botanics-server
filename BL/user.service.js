const userController = require("../DL/Controller/user.controller"),
  auth = require("../middleware/auth"),
//  { sendOrderEmail } = require("../BL/email.services"),
  bcrypt = require("bcrypt"),
  SALT_ROUNDS = Number(process.env.SALT_ROUNDS);





const validateUserData = (data) => {//it doesnt work!!
 
  if (
    data.email &&
    !/^[\w.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data?.email)
  )
    throw { code: 401,  message: "Invalid email" };
  
  if (data.password && typeof data?.password !== "string")
    throw {  code: 401, message: "Invalid password" };

  return true;
};

const register = async (data) => {
  try {
    validateUserData(data);
    console.log("email...");
    const emailExists = await userController.readOne({ email: data.email });
   // console.log('emailexists',emailExists);
    //if(emailExists){console.log('email exists')}
    if (emailExists) return { code: 401, message: "The user already exists" }; //throw?

   
      const hashedPassword=await bcrypt.hash(data.password, SALT_ROUNDS);
     
      console.log('hashed password', hashedPassword)

    // data.salt=salt;
     //data.hashedPassword=hashedPassword;

   // const x= bcrypt.hashSync(data.password, SALT_ROUNDS);
   // consloe.log('x',x)
   // data.password = bcrypt.hashSync(data.password, SALT_ROUNDS);
  // data.password=x;
    console.log('password ',data.password)
    const user=await userController.create({fullName:data.fullName, email:data.email, password:hashedPassword});
    const token =await auth.createLoginToken(user._id)
     console.log(token);
     return {code:200, message:token}
    
   // return "The user has been registered successfully";
  } catch (error) {
    throw { code: 401, msg: "Internal server error" };
  }

};

//from playlist
async function register2(data) {
    // console.log("blabla");
     // const { email, password, firstName, lastName } = data
     const { email, password } = data
   
     // if (!email || !password || !firstName || !lastName)
     //   throw ({ code: 400, message: "missing data" })
     if (!email || !password )
       throw ({ code: 400, message: "missing data" })
   
     console.log("blabla");
     const existUser = await userController.readOne({ email })
     if (existUser) throw ({ code: 405, message: "duplicated email" })
     //const salt= await bcrypt.genSalt();
     const hashedPassword=await bcrypt.hash(password, SALT_ROUNDS);
    // data.salt=salt;
     //data.hashedPassword=hashedPassword;
   console.log('hashed password', hashedPassword);
   console.log("blabla2");
   //password=hashedPassword
   //console.log(password)
     const user = await userController.create({email,password:hashedPassword})
     console.log("blabla3")
     console.log(user)
     const token =await auth.createLoginToken(user._id)
     console.log(token);
     return token
    }

const login = async (data) => {
  try {
   // validateUserData(data);
    const user = await userController.readOne({ email: data.email }, "+password");
    console.log("user",user)
    if (!user) {console.log("no user"); return { code: 401, message: "user not found" };}
    
    const comparison=bcrypt.compareSync(data.password, user.password)
    console.log(comparison)
    if (!bcrypt.compareSync(data.password, user.password)){
      console.log("not correct password")
      return { code: 401, message: "not correct password" };
    }
      
    await userController.update({email:user.email}, { lastConnectedDate: new Date() }); // update last login
    console.log("haya")
    const token = await auth.createLoginToken({ email: user.email, id: user._id }); // create new token
    //return { token,  email: user.email }; // return token
    return {code:200, message:{token, userDetails:user}}
  } catch (error) {
    throw { code: 401, message: "Internal server error" };
  }
};

const createTokenForPasswordReset = async (data) => {
  try {
    validateUserData(data);
    const user = await userController.readOne({ email: data.email });
    if (!user) throw { code: 401, msg: "user not found" };
    const token = await auth.createTokenForPasswordChange({ email: user.email, id: user._id, });
    
   // return token;
    // const result = await sendOrderEmail(
    //   user.email,
    //   "Change password",
    //   data.html(data.token)
    // );
    // return "The email was sent successfully";
  } catch (error) {
    throw { code: 401, msg: "Internal server error" };
  }
};

const resetPassword=async (data)=>{
  const user = await userController.readOne({ email: data.email });
  if (!user) throw { code: 401, msg: "user not found" };
  const token = await auth.createTokenForPasswordChange({ email: user.email, id: user._id, });
  const hashedPassword=await bcrypt.hash("0000", SALT_ROUNDS);
  await userController.update({email:data.email},{password:hashedPassword})
  return token
}
// const getUser = async (filter) => {
  
//    validateUserData(filter);
//     const user= userController.readOne(filter);
//     if (!user) throw {code:400, message:"user not found"}
//   return user

// }

const getUser = async ({email}) => {
  
  //validateUserData(filter);
  const user=await userController.readOne({email});

  if (!user) {throw {code:400, message:"user not found get user"}}
  return user

}


// const user= await userController.readOne({_id:id});
//     console.log(user);
   
//     return user;
    
const getAllUsers = async () => {
  
    const users= await userController.readMany();
    if(users.length==0)  throw({code:400, message:"There is no user in this application!"});
    return users

}

const getPasswordVerification = async (data) => {
  try {
    validateUserData(data);
    data.passwordVerification = bcrypt.hashSync(data.password, SALT_ROUNDS);
    if (data.password !== data.passwordVerification) throw {
      msg: 'Password not the same as the password verification', code: 401
    };
    console.log('------', data)
    await userController.update({ email: data.email }, { password: data.password });
    return "Password changed successfully";
  } catch (error) {
    throw { code: 401, msg: "Internal server error" };
  }
}
//getPasswordVerification({email:"aminovhaya@gmail.com", password:"xxx"})
module.exports = {resetPassword, register, login, getUser, getAllUsers, getPasswordVerification, createTokenForPasswordReset, register2 };

