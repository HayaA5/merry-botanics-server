const itemModel = require ('../Model/item.model')


async function create(data){
return await itemModel.create(data)
}
async function read(filter = {}){
return await itemModel.find(filter)
}
async function readOne(filter = {}){
    const x=await itemModel.findOne(filter) //findOne
    console.log('x',x)
    return x
//return await itemModel.findOne(filter)
}
async function update(filter,data){
return await itemModel.updateOne(filter,data, { runValidators: true })
}
async function del(filter){
    return await itemModel.updateOne( {_id:filter},{isActive:false})

}

module.exports={create,read,readOne,update,del}