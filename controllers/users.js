const User = require("../models/user");

const loginuser = (req, res) => {
  const { emailid, password } = req.body;
  User.findOne({ email: emailid })
    .then((user) => {
      if (user) {
        if (password === user.password) {
          res.send({ message: "Login Successful", user: user });
        } else {
          res.send({ message: "Password didn't match" });
        }
      } else {
        res.send({ message: "User not found" });
      }
    })
    .catch((err) => {
      return err;
    });
};

const finduser = (req, res) => {
  const { userid } = req.body;
  User.findOne({ _id: userid }).then((user) => {
    if (user) {
      res.send({ message: "user found", user: user });
    } else {
      res.send({ message: "user not found" });
    }
  });
};

const registerUser = async (req, res) => {
  const data = req.body;
  User.findOne({ email: data.emailid })
    .then((docs) => {
      if (docs) {
        res.send({ message: "user already registered" });
      } else {
        saveuser(data);
      }
    })
    .catch((err) => {
      return err;
    });
  async function saveuser(data) {
    const { firstname, lastname, emailid, phoneno, password } = data;
    const Formdata = new User({
      firstName: firstname,
      lastName: lastname,
      email: emailid,
      phoneno: phoneno,
      password: password,
    });
    try {
      await User.insertMany(Formdata);
      res.send({ message: "successfully registed" });
    } catch (error) {
      res.send({ message: "there is an error" });
    }
  }
};

module.exports = {
  registerUser,
  loginuser,
  finduser,
};
