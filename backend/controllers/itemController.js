import asyncHandler from "express-async-handler";
import Item from "../models/itemModel.js";

const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find({});
  res.json(items);
});

const getItemById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not Found" });
  }
});

const itemRegister = asyncHandler(async (req, res) => {
  const { itemName } = req.body;
  
  const itemExists = await Item.findOne({ name: itemName });
  
  if (itemExists) {
    res.status(400);
    throw new Error("Item already exists");
  } else {
    const item = await Item.create({
      name: itemName,
    });

    if (item) {
      res.status(201).json({
        _id: item._id,
        name: item.name,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Item data");
    }
  }
});

const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item) {
    await item.remove();
    res.json({ message: "Centre removed" });
  } else {
    res.status(404).json({ message: "Centre not Found" });
  }
});

const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item) {
    item.name = req.body.name || item.name;

    const updatedItem = await item.save();

    res.json({
      _id: updatedItem._id,
      name: updatedItem.name,
    });
  } else {
    res.status(404).json({ message: "Item not Found" });
  }
});

export { getItems, getItemById, itemRegister, deleteItem, updateItem };
