const express = require ('express')
const router = express.Router()
const emailService = require ('../BL/email.service')

//need email address, subject=title of the email, html=email content
router.post("/sendemail", async(req,res)=>{
    const data = req.body
    
    try{
        if(!data.title) throw "title is required"
        if(!data.html && !data.text) throw "html or text is required"
        if(!data.email) throw "email is required"
        else{
            await emailService.sendEmail({email:data.email,title:data.title,html:data?.html,text:data?.text})
            res.send("email send to -"+data.email)
        }
}
    catch(err){ res.send(err)}
})

module.exports = router
