const mysql = require("mysql2/promise");

const sequelize = require("../config/connection");
const { User, Category } = require("../models");

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const USERS = [
    {
        username: "user1",
        password: "password1",
        email: "user1@email.com",
        mobile: "123-456-1111",
        contact_email: true,
        contact_text: false,
    },{
        username: "user2",
        password: "password2",
        email: "user2@email.com",
        mobile: "123-456-2222",
        contact_email: false,
        contact_text: true,
    },
];

const CATEGORIES = [
    {
        name: 'Car',
        emoji: '🚗',
        color: 'blue',
    },
    {
        name: 'House',
        emoji: '🏠',
        color: 'green',
    },
];

const startSeedin = async () => {
    try {
        const db = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
        });

        await db.connect();
        await db.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
        
        db.destroy();

        await sequelize.sync({ force: true });

        const users = await User.bulkCreate(USERS, { individualHooks: true });

        for (let i = 0; i < users.length; i++) {
            await users[i].createCategory(CATEGORIES[0]);
            await users[i].createCategory(CATEGORIES[1]);
        }

        console.log("Seeded Users and Categories");
        process.exit(0);
    } catch(err) {
        console.log(err);
    };
};

startSeedin();