require("dotenv").config();
require("./src/config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require('./src/services/jwt');
const User = require("./src/model/user");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Registro
app.post("/register", async (req, res, next) => {
  try {
    // Get user input
    const { name, username, email, password, passwordConfirmation } = req.body;

    // Validate user input
    if (!(email && password && name && username && passwordConfirmation)) {
      res.status(400).json({message: "All input is required" });
    }

    if (password !== passwordConfirmation) {
        res.status(400).json({ message: "Passwords do not match" });
    }

    // Validamos la existencia del usuario en la base de datos
    const oldUser = await User.findOne({ email });
    console.log(oldUser);

    if (oldUser) {
      return res.status(400).json({ message: "User Already Exist. Please Login" });
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Creamos un usuario en la DB
    const user = await User.create({
      name,
      username,
      email, // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Creamos el token
    //const token = jwt.sign(
    // { user_id: user._id, email },
    //  process.env.JWT_SECRET,
    //  {
    //    expiresIn: "2h",
    //  }
    //);
    // Guardamos user token
    //user.token = token;

    // return new user
    res.status(200).json(user);
  } catch (err) {
    next(err);
    console.log(err);
  }
    
});

// Login
app.post("/login", async (req, res, next) => {

  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).json({message: "All input is required" } );
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {

      const accessToken = generateAccessToken(user._id, user.email);
      res.status(200).json({accessToken});
    }else{
      res.status(404).json({message: "User not found"});
    }
    
  } catch (err) {
    next(err);
    console.log(err);
  }
});

module.exports = app;