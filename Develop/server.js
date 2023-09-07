const express = require('express');
const path = require('path');
const fs = require('fs'); 
// generated unique ID's
const {v4: uuidv4} = required('uuid');

const PORT = process.env.PORT || 3001;
const app = express();

// MIDDLEWEAR TO PARSE
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

// GET Route notes.html (mini-project)
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// routes for db.json
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});


// routes adding notes (POST)
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4(); // install uuid 

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const allNotes = JSON.parse(data);
        allNotes.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(allNotes, null, 2), (err) => {
            if (err) throw err;
            res.json(allNotes);
        });
    });
});


// GET Route index.html (mini-project)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});



// PORT 
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});