import Persons from "../models/Persons.js";
import Entries from "../models/Entries.js";

export const findPerson = async (req, res) => {
    try {
        const { dni , lastname, name, address, }= req.query;

        const filters = {};

        if (dni) {
            filters.dni = dni
        };
        if (lastname) {
            filters.lastname = lastname
        };
        if (name) {
            filters.name = name
        };
        if (address) {
            filters.address = address
        };

        const person = await Persons.findAll({
            where: filters,
            include: {
                model: Entries,
                as: 'entries',
            },
            attributes: ['dni', 'lastname', 'name', 'address', 'class'],
        });
        return res.status(200).json(person);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Error al obtener los registros'});
    };
};
