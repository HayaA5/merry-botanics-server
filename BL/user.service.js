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

module.exports = { register, login, getUser, getAllUsers};

