const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const JWT_SECRET = "herry is a good boy";
const fechuser=require('../middleware/fechuser')

// endpoint for signup using POST
router.post(
  "/createuser",
  [
    body("email", "enter a valid email").isEmail(),
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("password", "password must be atleast 5 characters").isLength({ min:5}),
  ],
  async (req, res) => {
    let success=false

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: "sorry a user with this email is already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: { id: user.id },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      // res.json(user)
      success=true
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);
// endpoint for login using POST
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const{email,password}=req.body
    try {
        let user=await User.findOne({email})
        if(!user){
            return   res.status(400).json(success ,{error:"please try to login with correct crendential"})
        }
        const comparepassword=await bcrypt.compare(password,user.password)
        if(!comparepassword){
            return   res.status(400).json({success, error:"please try to login with correct crendential"})

          
        }
        const data = {
            user: { id: user.id },
          };
          const authtoken = jwt.sign(data, JWT_SECRET);
       success=true
           
      res.json({success, authtoken });

    }  catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
      }

})


// endpoint for userdetail using POST. login required

router.post(
  "/getuser",fechuser,async (req, res) => {
try {
  userId=req.user.id
 
  const user=await User.findById(userId).select('-password')
  res.send(user)

  
} catch (error) {
  console.error(error.message);
  res.status(500).send("internal server error");
}
  })

module.exports = router;
