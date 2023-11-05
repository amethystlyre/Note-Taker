const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');


// GET Route for retrieving all notes
notes.get('/', (req, res) => {
    // fs.readFile("./db/db.json", 'utf8', (err, data) => {
    //     if (err) {
    //       console.error(err);
    //     } else {
    //       const parsedData = JSON.parse(data);
    //       res.json(parsedData);
    //     }
    //   });
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

// GET Route for retrieving a specific note based on note id
notes.get('/:id', (req, res) => {
    const noteId = req.params.id;

    // fs.readFile("./db/db.json", 'utf8', (err, data) => {
    //     if (err) {
    //       console.error(err);
    //     } else {
    //       const parsedData = JSON.parse(data);
    //       const result = parsedData.filter((note) => note.id === noteId);
    //       return result.length > 0
    //       ? res.json(result)
    //       : res.json('No note with that ID');
    //     }
    //   });

    readFromFile('./db/db.json')
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
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding note');
    }
  });

// DELETE Route for removing a note in the DB based on given id
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((note) => note.id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
      });
  });
  
  module.exports = notes;
