const mysql = require("mysql2/promise");

const sequelize = require("../config/connection");
const { User, Category, Reminder } = require("../models");

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const usersArr = [
    {
        email: "user1@email.com",
        password: "password",
        mobile: "123-456-1111",
        contact_email: true,
        contact_text: false,
    },{
        email: "user2@email.com",
        password: "password",
        mobile: "123-456-2222",
        contact_email: false,
        contact_text: true,
    },
];

const categoriesArr = [
    {
        name: 'Car 1',
        emoji: '🚗',
        color: 'blue',
        UserId: 1,
    },
    {
        name: 'House 1',
        emoji: '🏠',
        color: 'green',
        UserId: 1,
    },    
    {
        name: 'Car 2',
        emoji: '🚙',
        color: 'yellow',
        UserId: 2,
    },
    {
        name: 'House 2',
        emoji: '🏡',
        color: 'pink',
        UserId: 2,
    },
];

const remindersArr = [
    {
        task: "Oil change 1",
        lastDone: 2023-01-01,
        isRecurring: true,
        numPeriods: 3,
        timePeriod: "month",
        nextDue: 2023-04-01,
        note: "",
        CategoryId: 1,
    },{
        task: "Rotate tires 1",
        lastDone: 2023-01-01,
        isRecurring: true,
        numPeriods: 6,
        timePeriod: "month",
        nextDue: 2023-07-01,
        note: "",
        CategoryId: 1,
    },{
        task: "Rotate tires 3",
        lastDone: 2023-06-01,
        isRecurring: true,
        numPeriods: 6,
        timePeriod: "month",
        nextDue: 2023-12-01,
        note: "",
        CategoryId: 3,
    },{
        task: "Check smoke detector batteries",
        lastDone: 2023-01-01,
        isRecurring: true,
        numPeriods: 1,
        timePeriod: "year",
        nextDue: 2023-12-01,
        note: "",
        CategoryId: 2,
    },{
        task: "Paint the deck",
        isRecurring: false,
        nextDue: 2023-12-01,
        note: "one time task",
        CategoryId: 2,
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

        await User.bulkCreate(usersArr, { individualHooks: true });
        await Category.bulkCreate(categoriesArr);
        await Reminder.bulkCreate(remindersArr);

        console.log("Seeded Users, Categories and Reminders");
        process.exit(0);
    } catch(err) {
        console.log(err);
    };
};

startSeedin();

