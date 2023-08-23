const express = require ('express')
const router = express.Router()

const itemServices = require ('../BL/item.service')
const { it } = require('node:test')

//Sample function using GET:


router.get ("/allitems", async (req,res)=>{
    try{
        const item = await itemServices.getAllItems()
        res.send (item)
        
        
    }
    catch (err){
        res.status(400).send(err)
    }
})

router.get ("/barcode/:barcode", async (req,res)=>{
    try{
        console.log('req params', req.params.barcode)
        const item = await itemServices.getItemByBarcode(req.params.barcode)
        console.log(item)
        res.send (item)
        
        

    }
    catch (err){
        res.status(400).send(err)
    }
})

router.post ("/additem", async (req,res)=>{
    try{
        const item = await itemServices.addItem(req.body)
        res.send(item)
    }
    catch (err){
        res.status(400).send(err)
        console.log('---',err.code, err.message)
    }
})

router.put ("/:barcode", async (req,res)=>{
    try{
        console.log('put')
        console.log(req.params.barcode)
        console.log(req.body)
       const item = await itemServices.updateItem(req.params.barcode,req.body)
       res.send (item)

    }
    catch (err){
        res.status(400).send(err)
        console.log(err, err.code, err.message)
    }
})

router.delete("/:barcode", async(req,res)=>{//it updates isActive to false but in item-element it sends back , it still shows isActive=true
    try{
        console.log("delete")
        console.log(req.params.barcode)
        const item=await itemServices.removeItem(req.params.barcode)
        res.send(item)
    }catch(err){
        res.status(400).send(err);
        console.log(err, err.code, err.message)
    }
}

)

module.exports = router