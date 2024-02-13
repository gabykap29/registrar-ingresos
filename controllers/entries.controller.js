import Entries from "../models/Entries.js";
import Persons from "../models/Persons.js";
import { Op } from "sequelize";
import dayjs from "dayjs";
export const createEntry = async (req, res) => {
    try {
        const { ingreso, dni, lastname, name, address='Sin datos', clase='sin Datos', description='Sin datos'} = req.body;
        
        const person = await Persons.findOne({where: {dni:dni}});

        if (!person) {
            const newPerson = await Persons.create({
                dni,
                lastname,
                name,
                address,
                clase,
            });
            const newEntry = await Entries.create({
                date: ingreso,
                person_id: newPerson.id,
                description,
            });
            if(newEntry){
                return res.status(201).json({status:201,message: 'Registro creado correctamente'});
            }else{
                return res.status(400).json({status:400,message: 'Error al crear el registro, registre los campo y vuelva a intentar'});
            }
        };
        const newEntry = await Entries.create({
            date: ingreso,
            person_id: person.id,
            description,
        });
        if(newEntry){
            return res.status(201).json({status:201,message: 'Registro creado correctamente'});
        }else{
            return res.status(400).json({status:400, message: 'Error al crear el registro, registre los campo y vuelva a intentar'});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Error al crear el registro'});
    };
};

export const getEntries = async (req, res) => {
    try {
        const {page= 0, size=10} = req.query;
        
        const entries = await Entries.findAll({
            include: [{
                model: Persons,
                as: 'persons',
            }],
            
            size: size,
            offset: page * size,
            order: [['date', 'DESC']], 
        });
        
        return res.status(200).json(entries);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Error al obtener los registros'});
    };
};



export const getEntriesByDate = async (req, res) => {
    try {
        const { dateStart, dateEnd } = req.query;
        
        const entries = await Entries.findAll({
            include: [{
                model: Persons,
                as: 'persons',
            }],
            where: {
                date: {
                    [Op.between]: [new Date(dateStart), new Date(dateEnd)],
                },
            },
            order: [['date', 'DESC']], 
        });
        
        if (entries.length === 0) {
            return res.status(404).json({ status: 404, message: 'No se encontraron registros que coincidan con la búsqueda' });
        }
        
        return res.status(200).json(entries);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: 'Error al obtener los registros' });
    }
};

