const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

// create an Express REST API server that return JSON data i.e "Salam Malaysia Madani!!" when a user sends a GET request to the server's /api/ path
app.get('/api/', (req, res) => {
  res.send('Salam Malaysia Madani!!');
});



// create a route in the Express server that returns the JSON data from the "negeri.json" file when a user sends a GET request to the server's /api/negeri path
const negeri = require('./negeri.json');
app.get('/api/negeri', (req, res) => {
    res.json(negeri);
});



// create a POST request route in the Express server that add a new state as JSON object to the JSON data array from the "negeri.json" file and save the file
app.use(express.json());
app.post('/api/negeri', (req, res) => {
    fs.readFile('negeri.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const negeri = JSON.parse(data);
            negeri.push(req.body);
            fs.writeFile('negeri.json', JSON.stringify(negeri), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    res.json({ message: 'State added successfully' });
                }
            });
        }
    });
});


// create a PUT request route in the Express server that edit a state name as JSON object to the JSON data array from the "negeri.json" file and update the state name in the file
app.put('/api/negeri/:name', (req, res) => {
    fs.readFile('negeri.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const negeri = JSON.parse(data);
            const index = negeri.findIndex((state) => state.name === req.params.name);
            if (index === -1) {
                res.status(404).json({ error: 'State not found' });
            } else {
                negeri[index] = req.body;
                fs.writeFile('negeri.json', JSON.stringify(negeri), (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        res.json({ message: 'State updated successfully' });
                    }
                });
            }
        }
    });
});





// TODO: Challenge #2


module.exports = app;
