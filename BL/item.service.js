const itemController = require ('../DL/Controller/item.controller')


async function getItemByBarcode (barcode){
  let item = await itemController.readOne({barcode:barcode})//readOne
  console.log(item)
  return item
}
async function getItemByName(name){
    let item=await itemController.readOne({name})
    return item
}
async function getAllItems(){
  let items = await itemController.read()
  return items
}

async function updateItem (barcode,data){
  if (!barcode) throw {code:400, message:"missing barcode in arguments"}
  let item = await itemController.readOne({barcode:barcode})
  if (!item) throw {code:400, message:"this item (with such a barcode) doesn't exist"}
  if (!data.name && !data.price && !data.stock && !data.cover && !data.light && !data.water && !data.category && !data.barcode ) throw {code:400, message:"missing data"} 
 
 //
 let itemByName=await getItemByName(data.name)
 console.log('---itemByname',itemByName)
 if(itemByName) throw {code:400, message:"an article already has this name that should be unique"} 
 if (data.price < 0) throw {code:400, message:"price must be positive"}


 if(data.stock<0) throw {code:400, message:"stock should be positive or null"} 



 
  item = await itemController.update({barcode:barcode}, data)
  let filter=data.barcode? {barcode:data.barcode}:{barcode}
 // let updatedItem = await itemController.readOne({barcode:barcode})
 let updatedItem = await itemController.readOne(filter)
  return updatedItem
}

async function addItem (data){//error code to update? cf in google+ add other required fields==>each one 1 if
  let item = await getItemByBarcode(data.barcode)
  let itemByName=await getItemByName(data.name)
  console.log('data.barcode', data.barcode)
  console.log('---a',item)
  console.log('---b',itemByName)
  if (item) throw {code:400, message:"item already exists (with this barcode)"}
  if(itemByName) throw {code:400, message:"an article already has this name that should be unique"} 
  if (data.price < 0) throw {code:400, message:"price must be positive"}
  if (!data.name) throw {code:400, message:"item must include a name"} 
  if (!data.cover) throw {code:400, message:"item must include an image"}
  if (!data.barcode) throw {code:400, message:"item must include unique barcode"}
  if(data.stock<0) throw {code:400, message:"stock should be positive or null"} 
  item = await itemController.create(data)
  return item 
}

async function removeItem(barcode){
  let item = await getItemByBarcode(barcode)
  if (!item) throw{ code:400, message:"item not found- impossible to delete it"}
  
    return await itemController.del(item._id)
  
  
}
module.exports = {addItem,getItemByBarcode,getAllItems,updateItem, removeItem}
