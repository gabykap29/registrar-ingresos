import {Sequelize, DataTypes} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        define: {
            timestamps: false,
        },
        logging: console.log,
    }
);
export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database conectada con éxito!.');
      } catch (error) {
        console.error('Error al conectar la base de datos:', error);
      }
};

export  {sequelize};