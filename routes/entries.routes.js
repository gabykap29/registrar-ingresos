import express from 'express';
const routerEntries = express.Router();
import {body, validationResult} from 'express-validator';
import { createEntry, getEntries, getEntriesByDate } from '../controllers/entries.controller.js';

routerEntries.get('/registros/crear', (req, res) => {
    res.render('entries/create')
});
routerEntries.get('/registros/filtrar', (req, res) => {
    res.render('entries/show')
});


//APIS
routerEntries.post('/create', [
    body('dni').not().isEmpty().isInt().isLength({min:7, max:8}).withMessage('El DNI es requerido, debe contener entre 7 y 8 caracteres numéricos'),
    body('lastname').not().isEmpty().isLength({min:3}).withMessage('El apellido es requerido, debe contener al menos 3 caracteres'),
    body('name').not().isEmpty().isLength({min:3}).withMessage('El nombre es requerido, debe contener al menos 3 caracteres'),
    body('clase').optional().isLength({min:3}).isInt().withMessage('La clase ingresada es inválida, recuerde que debe ser el año de nacimiento de la persona!'),
    body('ingreso').not().isEmpty().withMessage('La fecha es requerida').custom((value)=>{
        const today = new Date();
        const userDate = new Date(value);
        return new Date(userDate) < today;
    }).withMessage('La fecha no puede ser mayor a la fecha actual'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    createEntry(req, res);
});

routerEntries.get('/api/registros', getEntries);
routerEntries.get('/api/registros/filtrar',getEntriesByDate);

export default routerEntries;
