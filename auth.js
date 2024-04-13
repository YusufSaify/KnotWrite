const express = require('express');
const user = require('../models/user');
const router = express.Router()
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const jwt_secret = "yusufbhai"
const fetchUser = require('../midddleware/fetchUser')

//creating a signin route 
router.post('/signin', [
    //validating data enter by the user is valid or not by express-validator
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'enter a string password').isLength({ min: 5 })
], async (req, res) => {
    //koi error ager ati h validation me to vo error me ajayegi 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ eroor: errors.array() })
    }

    // yaha hum user create ker rahe hai
    try {
        const u = await user.findOne({ email: req.body.email })
        if (u) {
            return res.status(400).json("User already exist")
        }

        //generating salt and creating hash password using salt
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, salt)

        //creating new user and adding into data base
        newuser = await user.create({
            name: req.body.name,
            password: secpass,
            email: req.body.email
        })

        //generating authtoken by using id of the user 
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, jwt_secret)
        res.status(200).json(req.body.name)

    } catch (errors) { // yaha hum email ko catch kerlenge jo duplicate 
        console.error(error.massage)
        res.status(500).json("server problem")
    }



})




//2
//creating a login route 
router.post('/login', [
    //validating data enter by the user is valid or not by express-validator
    body('email', 'Enter valid email').isEmail(),
    body('password', 'password can not be blank').exists()
], async (req, res) => {
    //koi error ager ati h validation me to vo error me ajayegi 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ error: errors.array() })
    }

    // yaha hum user create ker rahe hai
    const { email, password } = req.body;

    try {
        const u = await user.findOne({ email })
        if (!u) {
            return res.status(400).json("please login with correct credentials 1")
        }

        //generating salt and creating hash password using salt
        const passcompare = await bcrypt.compare(password, u.password)

        if (!passcompare) {
            return res.status(400).json("please login with correct credentials 2")
        }
        console.log(u.name)

        //generating authtoken by using id of the user 
        const data = {
            user: {
                id: u.id,
            },
           
        }
        const username=u.name;
        const authtoken = jwt.sign(data, jwt_secret)
        const data2={
            authtoken:authtoken,
            name:username,
            
        }
        // console.log(data2)
        res.status(200).json(data2);

    } catch (errors) { // yaha hum email ko catch kerlenge jo duplicate 
        console.error(error.massage)
        res.status(500).json({ error: "internal error occured :)" })
    }
})
//3 
router.post('/getuser', fetchUser, async (req, res) => {
    //koi error ager ati h validation me to vo error me ajayegi 
    try {
        const userId = req.user.id;
        const u = await user.findById(userId).select("-password")
        console.log(u)
        res.send(u)
    }
    catch (error) { // yaha hum email ko catch kerlenge jo duplicate 
        console.error(error.massage)
        res.status(500).json({ error: "internal error occured :)" })
    }
}
)

module.exports = router