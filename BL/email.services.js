const nodemailer = require('nodemailer');
//const { getMaxListeners } = require('../DL/Model/user.model');

// const transporter3 = nodemailer.createTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//       user: "aminovhaya@gmail.com",
//       pass: "hayA1989",
//     },
//   });

//   const SENDMAIL = async (mailDetails, callback) => {
//     try {
//       const info = await transporter3.sendMail(mailDetails)
//       callback(info);
//     } catch (error) {
//       console.log(error);
//     } 
//   };

let transporter= nodemailer.createTransport({
    service:"gmail",
    secure:false,
    auth:{
        user:"raquel.bellilty@gmail.com",
        pass:env.
    }
})

// let mailOptions2 = {
//     from: '"Raquel Bellilty" <raquel.bellilty@gmail.com>',
//     to: 'aminovhaya@gmail.com',
//     subject: 'Nice Nodemailer test',
//     text: 'Hey there, it’s our first message sent with Nodemailer 😉 ',
//     html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer'
// };
// let transport = nodemailer.createTransport({
//     //host: "smtp.mailtrap.io",
//     //port: 3001,
//     service:"gmail",
//     auth: {
//       user: "raquel.bellilty@gmail.com",
//       pass: "hayA1989"
//     }
//   });

// transport.sendMail(mailOptions2, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message sent: %s', info.messageId);
// });

//need email address, title=title of the email, html=component with all data end css ,text=text or html
async function sendOrderEmail({email,title,html,text}){
    console.log("send email server")
    const mailOptions={
        from :"aminovhaya@gmail.com",
        to:"raquel.bellilty@gmail.com",
        subject:title,
        html:html,
        text:text
    }
    console.log("send email server2")
    // return transport.sendMail(mailOptions2, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('Message sent: %s', info.messageId);
    // });
    
   return transporter.sendMail(mailOptions,(err,info)=>{
            if(err){throw err}
            else{
                console.log("no pb>>")
                res.send("email send to -"+info.response)}
        })
}

module.exports = { sendOrderEmail }

// const fakeData={size:{height:50,width:30},email:"yosef74526@gmail.com",html:'<h1>goooo <h2>nnnnnn</h2></h1>'}
// router.get ("/mail1", async (req,res)=>{
//    try{ const email = await emailServices.sendOrderEmail(fakeData)
//     res.send("email send to -"+fakeData.email)}
//     catch(err){ console.log(err)}
// })
