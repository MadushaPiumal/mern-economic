import dotenv from "dotenv";

import centres from "./data/centerData.js";
import Centres from"./models/centreModel.js";

import items from"./data/itemData.js";
import Items from"./models/itemModel.js";

import users from"./data/users.js";
import Users from"./models/users.js";

import connectDB from"./config/db.js";


connectDB();

const importData = async () => {
  try {
    // await Centres.deleteMany();
    // await Centres.insertMany(centres);

    await Users.deleteMany();
    await Users.insertMany(users);

    // await Items.deleteMany();
    // await Items.insertMany(items)

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Centres.deleteMany();
    await Items.deleteMany();
    await Users.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
