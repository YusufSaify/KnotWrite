const express = require('express')

const image = require('../models/image');
const fetchUser = require('../midddleware/fetchUser');
const router = express.Router()
const multer = require('multer');
// const fetchUser = require('../midddleware/fetchUser')


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/upload',fetchUser, upload.single('allimage'), (req, res) => {
    console.log("jad")
    const userId = req.user.id;
    const title = req.body.title; // Assuming the title is sent in the request body
    const imageData = req.file;
    console.log(imageData)
  
    // Create a new user record with the uploaded image data and title
    const newUser = new image({ userId, title, imageData });
    console.log(newUser)
  
    // newUser.save((err) => {
    //   if (err) {
    //     console.error(err);
    //     res.status(500).json({ error: 'Error saving image and title to the database' });
    //   } else {
    //     res.status(200).json({ message: 'Image and title uploaded successfully' });
    //   }
    // });
  });

module.exports = router
