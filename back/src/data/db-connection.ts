import mongoose, { Mongoose }  from 'mongoose';
import fs from 'fs';

export default class DbConnection {

    private static MIGRATIONS_DIRECTORY = './migrations';

    static connection: Mongoose;

    static async load() {

        this.connection = await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`);
    }

    
}