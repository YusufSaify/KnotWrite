const express = require('express')
const note = require('../models/note')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const fetchUser = require('../midddleware/fetchUser')

//route 1 fecthing all notes
router.get('/getnotes', fetchUser, async (req, res) => {

    allnotes = await note.find({ user: req.user.id })
    res.json(allnotes)
})


//route 2 adding note 
router.post('/addnote', fetchUser, [

    //validating data enter by the user is valid or not by express-validator
    body('title', 'please enter a valid title').isLength({ min: 3 }),
    body('description', 'please enter valid description').isLength({ min: 5 }),
], async (req, res) => {
    //koi error ager ati h validation me to vo error me ajayegi 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ eroor: errors.array() })
    }
    try {
        const newnote = new note({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description
        })

        const savenote = await newnote.save()
        res.status(200).json(savenote);

    } catch (error) {
        console.log(error.messsage)
        res.status(500).json("Internal server error");
    }

})

//update note
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        const { title, description } = req.body;
        const newnote = {};

        if (title) {
            newnote.title = title;
        }

        if (description) {
            newnote.description = description;
        }

        const n = await note.findById(req.params.id);

        if (!n) {
            return res.status(404).json({ error: "Note not found" });
        }

        if(n.user.toString()!=req.user.id){
            return res.status(404).json({ error: "not allowed" });

        }

        const updatedNote = await note.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });

        res.status(200).json({ updatedNote });
    } catch (error) {
        console.error(error.message); // Corrected typo
        res.status(500).json({ error: "Internal server error" });
    }
});

//delete note
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        
        const n = await note.findById(req.params.id);

        if (!n) {
            return res.status(404).json({ error: "Note not found" });
        }

        if(n.user.toString()!=req.user.id){
            return res.status(404).json({ error: "Not Allowed" });

        }

        const deletedNote = await note.findByIdAndDelete(req.params.id);

        res.status(200).json({"success":"note has been deleted "});
    } catch (error) {
        console.error(error.message); // Corrected typo
        res.status(500).json({ error: "Internal server error" });
    }
});



module.exports = router