import asyncHandler from "express-async-handler";
import Price from "../models/priceModel.js";

const getPrice = asyncHandler(async (req, res) => {
  const price = await Price.find({}).populate("centre");
  res.json(price);
});

const getPriceById = asyncHandler(async (req, res) => {
  const price = await Price.findById(req.params.id);
  if (price) {
    res.json(price);
  } else {
    res.status(404).json({ message: "Price not Found" });
  }
});

const priceRegister = asyncHandler(async (req, res) => {
  const { item, centre, price, dateTime } = req.body;

  const priceExists = await Price.findOne({
    centre: centre,
    name: item,
  }).populate("centre", "items");

  if (priceExists) {
    console.log("Price already exists");
    res.status(400);
    throw new Error("Price already exists");
  } else {
    const priceCreate = await Price.create({
      centre: centre,
      name: item,
      price: price,
      date: new Date(),
    }).populate("centre", "items");

    if (priceCreate) {
      console.log("yes");
      res.status(201).json();
    } else {
      console.log("no");
      res.status(400);
      throw new Error("Invalid Price data");
    }
  }
});

const deletePrice = asyncHandler(async (req, res) => {
  const price = await Price.findById(req.params.id);

  if (price) {
    await price.remove();
    res.json({ message: "Price removed" });
  } else {
    res.status(404).json({ message: "Price not Found" });
  }
});

const updatePrice = asyncHandler(async (req, res) => {
  const price = await Price.findById(req.params.id);

  if (price) {
    price.name = req.body.name || price.name;

    const updatedCentre = await price.save();

    res.json({
      _id: updatedCentre._id,
      name: updatedCentre.name,
    });
  } else {
    res.status(404).json({ message: "Price not Found" });
  }
});

export { getPrice, getPriceById, priceRegister, deletePrice, updatePrice };
