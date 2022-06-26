import express from "express";
import { User } from "../models/user/user.model.js";

const manage = express.Router();

manage.patch("/deposit/:id", async (req, res) => {
  try {
    const amount = parseFloat(req.body.amount);
    if (amount < 0 || isNaN(amount))
      throw new Error("you cant deposit nagative number");
    const user = await User.findOne({ passportId: req.params.id });
    if (!user) throw new Error("user id " + req.params.id + " not exist");
    user.cash += amount;
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

manage.patch("/withdraw/:id", async (req, res) => {
  const amount = parseFloat(req.body.amount);
  try {
    if (amount < 0 || isNaN(amount))
      throw new Error("you cant withdraw nagative number");
    const user = await User.findOne({ passportId: req.params.id });
    if (!user) throw new Error("user id " + req.params.id + " not exist");
    if (amount > user.cash + user.credit)
      throw new Error("user " + req.params.id + " dont have enough money");
    user.cash -= amount;
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

manage.patch("/credit/:id", async (req, res) => {
  try {
    const amount = parseFloat(req.body.amount);
    if (amount < 0 || isNaN(amount))
      throw new Error("you cant update credit to nagative number");
    const user = await User.findOne({ passportId: req.params.id });
    if (!user) throw new Error("user id " + req.params.id + " not exist");
    user.credit = amount;
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

manage.patch("/transfer", async (req, res) => {
  try {
    const amount = parseFloat(req.body.amount);
    if (amount < 0 || isNaN(amount))
      throw new Error("you cant transfer nagative number");
    const from = await User.findOne({ passportId: req.body.from });
    if (!from) throw new Error("user id " + req.body.from + " not exist");
    if (amount > from.cash + from.credit)
      throw new Error("user " + req.body.from + " dont have enough money");
    const to = await User.findOne({ passportId: req.body.to });
    if (!to) throw new Error("user id " + req.body.to + " not exist");
    from.cash -= amount;
    to.cash += amount;
    // await from.save();
    // await to.save();
    await Promise.all([from.save(), to.save()]);
    res.status(200).send({ from, to });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export { manage };
