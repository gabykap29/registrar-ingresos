import {sequelize} from '../database/db.js';
import {DataTypes} from 'sequelize';

const Entries = sequelize.define('Entries', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    person_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
    },
},{
    sequelize,
    modelName:'Entries',
    tableName:'Entries',
    timestamps: false,
});

export default Entries;