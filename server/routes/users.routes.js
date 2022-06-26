import { User } from "../models/user/user.model.js";
import express from "express";

const usersRoute = express.Router();

usersRoute.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

usersRoute.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ passportId: req.params.id });
    if (user) {
      res.status(200).send(user);
    } else {
      throw new Error("there is no user " + req.params.id);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

usersRoute.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).send(newUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

usersRoute.get("/cash/:amount", async (req, res) => {
  try {
    const amount = parseFloat(req.params.amount);
    const users = await User.find({ cash: { $gte: amount } });
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

usersRoute.get("/credit/:amount", async (req, res) => {
  try {
    const amount = parseFloat(req.params.amount);
    const users = await User.find({ credit: { $gte: amount } });
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

usersRoute.patch("/active/:id", async (req, res) => {
  try {
    const user = await User.findOne({ passportId: req.params.id });
    user.isActive = !user.isActive;
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

usersRoute.get("/active-user/cash", async (req, res) => {
  try {
    const amount = parseFloat(req.body.amount);
    const users = await User.find({ isActive: true, cash: { $gte: 1000 } });
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export { usersRoute };
