import express from "express";
const router = express.Router();
import {
  getPrice,
  getPriceById,
  priceRegister,
  deletePrice,
  updatePrice,
} from "../controllers/priceController.js";

router.route("/").get(getPrice);
router.route("/register").post(priceRegister);
router.route("/:id").delete(deletePrice).get(getPriceById).put(updatePrice);

export default router;
