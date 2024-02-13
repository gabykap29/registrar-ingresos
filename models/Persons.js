import {sequelize}from '../database/db.js';
import {DataTypes} from 'sequelize';

const Persons = sequelize.define('Persons', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    dni:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    address:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    class:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    locality:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    },{
        sequelize,
        modelName:'Persons',
        tableName:'Persons',
        timestamps: false,
    }
);

export default Persons;