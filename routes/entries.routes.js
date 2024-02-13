import express from 'express';
const routerEntries = express.Router();

import { createEntry, getEntries, getEntriesByDate } from '../controllers/entries.controller.js';

routerEntries.get('/registros/crear', (req, res) => {
    res.render('entries/create')
});
routerEntries.get('/registros/filtrar', (req, res) => {
    res.render('entries/show')
});


//APIS
routerEntries.post('/create', createEntry);
routerEntries.get('/api/registros', getEntries);
routerEntries.get('/api/registros/filtrar',getEntriesByDate);

export default routerEntries;
