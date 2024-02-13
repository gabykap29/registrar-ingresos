import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/router.js';
import { connectDB } from './database/db.js';
import Persons from './models/associations/Associations.js';
import Entries from './models/associations/Associations.js';
import routerEntries from './routes/entries.routes.js';
import routerPerson from './routes/person.routes.js';
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(router);
app.use(routerEntries);
app.use(routerPerson);
app.listen(process.env.PORT,'0.0.0.0', () => {
    connectDB();
    console.log(`servidor corriendo en http://0.0.0.0:${process.env.PORT}`);
});