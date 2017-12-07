const express = require('express');
const bodyParser = require('body-parser');

// const knex = require('knex');
const sqlite = require('sqlite3');
// const db = require('./db');
const knex = require('./db');

const server = express();

server.use(bodyParser.json());

// endpoints here
// POST /api/zoos - a new zoo should be created in the zoos table.
server.post('/api/zoos', function (req, res) {
    const zoo = req.body;
    knex
        .insert(zoo)
        .into('zoos')
        .then(function (ids) {
            res.status(201).json({ ids: ids });
        })
        .catch(function (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                res.status(422).json({ error: 'The Zoo already exists' });
            } else {
                res.status(500).json(err);
            }
        });
});

// GET /api/zoos - return a list of all the zoos in the database, w/ error handling and status codes.
server.get('/api/zoos', function (req, res) {
    const zoos = knex('zoos')
        .then(function (records) {
            res.status(200).json(records);
        })
        .catch(function (error) {
            res.status(500).json({ error });
        });
});

// GET /api/zoos/:id - find and return the zoo associated w/ the given id.
server.get('/api/zoos/:id', function (req, res) {
    const { id } = req.params;

    const zoos = knex('zoos')
        .where('id', id)
        .then(function (records) {
            res.status(200).json(records);
        })
        .catch(function (error) {
            res.status(500).json({ error: `No zoo with matching id: ${id}` });
        });
});

// PUT /api/zoos/:id - update zoo by id.
server.put('/api/zoos/:id', function (req, res) {
    const { id } = req.params;

    const zoos = knex('zoos')
        .where('id', id)
        .update(req.body)
        .then(function (count) {
            res.status(200).json({ updated: count });
        })
        .catch(function (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                res.status(422).json({ error: 'The Zoo already exists' });
            } else {
                res.status(500).json(err);
            }
        });
});

// DELETE /api/zoos/:id - delete zoo by id
server.delete('/api/zoos/:id', function (req, res) {
    const { id } = req.params;
    knex('zoos')
        .where('id', id)
        .del()
        .then(function (count) {
            res.status(200).json({ deleted: count });
        })
        .catch(function (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                res.status(422).json({ error: 'The Zoo already existss' });
            } else {
                res.status(500).json(err);
            }
        });
});

const port = 3000;
server.listen(port, function () {
    console.log(`Server Listening on ${port}`);
});

/*
zoo table:
id: primary key, autoincrements.
name: unique, alphanumneric up to 255 char long.
created_at: should automatically default to the current date and time.
*/