import asyncHandler from "express-async-handler";
import Centre from "../models/centreModel.js";

const getCentres = asyncHandler(async (req, res) => {
  const centres = await Centre.find({});
  res.json(centres);
});

const getCentreById = asyncHandler(async (req, res) => {
  const centre = await Centre.findById(req.params.id);
  if (centre) {
    res.json(centre);
  } else {
    res.status(404).json({ message: "Centre not Found" });
  }
});

const centreRegister = asyncHandler(async (req, res) => {
  const { centreName } = req.body;

  const centreExists = await Centre.findOne({ name: centreName });

  if (centreExists) {
    res.status(400);
    throw new Error("Centre already exists");
  } else {
    const centre = await Centre.create({
      name: centreName,
    });

    if (centre) {
      res.status(201).json({
        _id: centre._id,
        name: centre.name,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Centre data");
    }
  }
});

const deleteCentre = asyncHandler(async (req, res) => {
  const centre = await Centre.findById(req.params.id);

  if (centre) {
    await centre.remove();
    res.json({ message: "Centre removed" });
  } else {
    res.status(404).json({ message: "Centre not Found" });
  }
});

const updateCentre = asyncHandler(async (req, res) => {
  const centre = await Centre.findById(req.params.id);

  if (centre) {
    centre.name = req.body.name || centre.name;

    const updatedCentre = await centre.save();

    res.json({
      _id: updatedCentre._id,
      name: updatedCentre.name,
    });
  } else {
    res.status(404).json({ message: "Centre not Found" });
  }
});

export {
  getCentres,
  getCentreById,
  centreRegister,
  deleteCentre,
  updateCentre,
};
