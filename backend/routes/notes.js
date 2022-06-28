const express = require('express')
const router = express.Router()
const fechuser = require('../middleware/fechuser')
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");



// get all notes using GET request,login required
router.get('/fechallnotes', fechuser, async (req, res) => {
    try {
    const notes = await Note.find({ user: req.user.id })
    res.json(notes)
} catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
})

// get all notes using post request,login required

router.post('/addnotes', fechuser, [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 character").isLength({ min: 5 }),
], async (req, res) => {
    try {
    const { title, description, tag } = req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({ title, description, tag, user: req.user.id })
    const savedNote=await note.save()
    res.json(savedNote)
} catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
})

// get all notes using put request,login required
router.put('/updatenote/:id', fechuser, async (req, res) => {
try {
    

const{title,description,tag}=req.body
 const newNote={}
 if(title){newNote.title=title}
 if(description){newNote.description=description}
 if(tag){newNote.tag=tag}

//  find the note to be updated and to update it
let note=await Note.findById(req.params.id)
if(!note){return res.status(404).send('not found')}


// allow updation only if user owner of this note
if(note.user.toString()!==req.user.id){
    return res.status(401).send('not allowed')
}
note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
res.json({note})} catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
})
// delete existing notes using delete request,login required
router.delete('/deletenote/:id', fechuser, async (req, res) => {
try {
    

//  find the note to be delete and to delete it
let note=await Note.findById(req.params.id)
if(!note){return res.status(404).send('not found')}
// allow deletion only if user owner of this note
if(note.user.toString()!==req.user.id){
    return res.status(401).send('not allowed')
}
note=await Note.findByIdAndDelete(req.params.id)
res.json({"success":"note has been deleted",note:note})} catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
})

module.exports = router
