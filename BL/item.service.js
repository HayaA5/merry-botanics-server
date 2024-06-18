const itemController = require('../DL/Controller/item.controller')

async function getItemByBarcode(barcode) {
  let item = await itemController.readOne({ barcode: barcode })
  return item
}
async function getItemByName(name) {
  let item = await itemController.readOne({ name })
  return item
}
async function getAllItems() {
  let items = await itemController.read()
  // console.log('haya--', items)
  return items
}

async function updateItem(barcode, data) {
  if (!barcode) throw { code: 400, message: "missing barcode in arguments" }
  let item = await itemController.readOne({ barcode: barcode })
  if (!item) throw { code: 400, message: "this item (with such a barcode) doesn't exist" }
  if (data.barcode && data.barcode !== barcode) {//if we want to update the barcode
    let item = await itemController.readOne({ barcode: data.barcode })//we check that it doesn't exist another item with this new barcode that should be unique
    if (item) throw { code: 400, message: "another item exists with this new barcode- it's impossible to change it" }
  }
  if (!data.name && data.price == undefined && data.stock == undefined && !data.cover && data.light == undefined && data.water == undefined && !data.category && !data.barcode) throw { code: 400, message: "missing data" }

  let itemByName = await getItemByName(data.name)
  if (itemByName) throw { code: 400, message: "an article already has this name that should be unique" }
  if (data.price && (!Number(data.price) || data.price < 0)) throw { code: 400, message: "price must be a positive number" }
  if (data.stock && (!Number(data.stock) || data.stock < 0)) throw { code: 400, message: "stock should be a positive or null number" }
  if (data.light <= 0 || data.light > 3) throw { code: 400, message: "light value should be between 1 and 3" }
  if (data.water <= 0 || data.water > 3) throw { code: 400, message: " water value should be between 1 and 3" }
  if (data.category && !['classic', 'outdoor', 'perennial plant'].includes(data.category)) throw { code: 400, message: "item must include category value: classic, perennial plant or outdoor" }

  item = await itemController.update({ barcode: barcode }, data)
  let updatedItem = await itemController.readOne(data.barcode ? { barcode: data.barcode } : { barcode })
  return updatedItem
}

async function addItem(data) {
  let item = await getItemByBarcode(data.barcode)
  let itemByName = await getItemByName(data.name)

  if (item) throw { code: 400, message: "item already exists (with this barcode)" }
  if (itemByName) throw { code: 400, message: "an article already has this name that should be unique" }
  if (data.price < 0) throw { code: 400, message: "price must be positive" }
  if (data.price == undefined) throw { code: 400, message: "item must include a price" }
  if (!data.name) throw { code: 400, message: "item must include a name" }
  if (!data.cover) throw { code: 400, message: "item must include an image" }
  if (!data.barcode) throw { code: 400, message: "item must include unique barcode" }
  if (data.stock < 0) throw { code: 400, message: "stock should be positive or null" }
  if (!data.light || data.light <= 0 || data.light > 3) throw { code: 400, message: "item must include light value between 1 and 3" }
  if (!data.water || data.water <= 0 || data.water > 3) throw { code: 400, message: "item must include light value between 1 and 3" }
  if (!data.category || !['classic', 'outdoor', 'perennial plant'].includes(data.category)) throw { code: 400, message: "item must include category value: classic, perennial plant or outdoor" }
  item = await itemController.create(data)
  return item
}

async function removeItem(barcode) {
  let item = await getItemByBarcode(barcode)
  if (!item) throw { code: 400, message: "item not found- impossible to delete it" }
  return await itemController.del(item._id)
}
module.exports = { addItem, getItemByBarcode, getAllItems, updateItem, removeItem }
