const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readDB, writeDB} = require('../helper/accessDB.js');

const DB_LOCATION = "./db/db.json";

// GET Route for retrieving all notes
notes.get('/', (req, res) => {
    readDB(DB_LOCATION
    ).then((data) => res.json(JSON.parse(data)));
  });

// GET Route for retrieving a specific note based on note id
notes.get('/:id', (req, res) => {
    const noteId = req.params.id;

    readDB(DB_LOCATION)
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === noteId);
          return result.length > 0
          ? res.json(result)
          : res.status(400).json('No note with that ID');
    });
  });

// POST Route for saving a new note
notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text} = req.body;
  
    if (title && text) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };

      readDB(DB_LOCATION)
      .then((data) => JSON.parse(data))
      .then((json) =>{
        json.push(newNote);
        writeDB(DB_LOCATION,json);
      })

      res.json(`Note added successfully`);
    } else {
      res.status(400).json('Error in adding note');
    }
    
  });

// DELETE Route for removing a note in the DB based on given id
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;

    readDB(DB_LOCATION)
    .then((data) => JSON.parse(data))
    .then((json) =>{
      //remove the note with the given id from the json DB
      const result = json.filter((note) => note.id !== noteId);

      //write the new Json list into the DB
      writeDB(DB_LOCATION, result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted.`);

    });
    
  });
  
  module.exports = notes;
