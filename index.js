const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("mongodb+srv://KJTECH:admin@cluster0.7lrlcbh.mongodb.net/Kavach");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/Login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "login success", user: user });
      } else {
        res.send({ message: "wrong credentials" });
      }
    } else {
      res.send({ message: "not registered" });
    }
  });
});

app.post("/Register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "user already exists" });
    } else {
      const newUser = new User({ name, email, password });
      newUser.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "successfully registered" });
        }
      });
    }
  });
});

mongoose.connection.once("open", () => {
  console.log("connected to DB");
  app.listen(6969, () => {
    console.log("server started");
  });
});
