import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notfound, errorHandler } from "./middleware/errorMiddleware.js";

import CentreRoutes from "./routes/centreRoutes.js";
import ItemRoutes from "./routes/itemRouter.js";
import UserRoutes from "./routes/userRoutes.js";
import priceRoutes from "./routes/priceRoutes.js";

dotenv.config();
connectDB();
const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("centres");
});

app.use("/api/admin/centres", CentreRoutes);
app.use("/api/admin/items", ItemRoutes);
app.use("/api/admin/users", UserRoutes);
app.use("/api/admin/price", priceRoutes);

app.use(notfound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
