import Persons from "../models/Persons.js";
import Entries from "../models/Entries.js";

export const findPerson = async (req, res) => {
    try {
        const { dni , lastname, name, address,page = 0,size=10 }= req.query;

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

        if(filters.name && filters.lastname === undefined && filters.dni === undefined){
            return res.status(400).json({status:400,message: 'Faltan datos para realizar la busqueda, por favor ingrese por lo menos nombre y apellido o DNI'});
        };


        const person = await Persons.findAll({
            where: filters,
            include: {
                model: Entries,
                as: 'entries',
            },
            attributes: ['dni', 'lastname', 'name', 'address', 'class'],
            limit: size,
            offset: page * size
        });
        if(person.length === 0){
            return res.status(400).json({status:400,message: 'No se encontraron registros que coincidan con los datos ingresados'});
        }
        return res.status(200).json({status:200, data: person});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Error al obtener los registros'});
    };
};
