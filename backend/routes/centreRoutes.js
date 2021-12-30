import express from "express";
const router = express.Router();
import {
  getCentres,
  getCentreById,
  centreRegister,
  deleteCentre,
  updateCentre,
} from "../controllers/centreController.js";

router.route("/").get(getCentres);
router.route("/register").post(centreRegister);
router.route("/:id").delete(deleteCentre).get(getCentreById).put(updateCentre);

export default router;
