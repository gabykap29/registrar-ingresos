import express from 'express';
const routerPerson = express.Router();

import {  findPerson } from '../controllers/person.controller.js';

routerPerson.get('/personas/buscar', (req, res) => {
    res.render('persons/index')
});


//apis
routerPerson.get('/find', findPerson);

export default routerPerson;