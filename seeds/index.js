const sequelize = require("../config/connection");
const { User, Category, Reminder } = require("../models");

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
        color: 'color1',
        UserId: 1,
    },
    {
        name: 'House 1',
        emoji: '🏠',
        color: 'color2',
        UserId: 1,
    },    
    {
        name: 'Car 2',
        emoji: '🚙',
        color: 'color3',
        UserId: 2,
    },
    {
        name: 'House 2',
        emoji: '🏡',
        color: 'color4',
        UserId: 2,
    },
];

const remindersArr = [
    {
        task: "Oil change 1",
        lastDone: "2022-09-01",
        isRecurring: true,
        numPeriods: 3,
        timePeriod: "month",
        nextDue: "2023-01-01",
        note: "",
        CategoryId: 1,
    },{
        task: "Rotate tires 1",
        lastDone: "2023-01-01",
        isRecurring: true,
        numPeriods: 6,
        timePeriod: "month",
        nextDue: "2023-07-01",
        note: "",
        CategoryId: 1,
    },{
        task: "Rotate tires 3",
        lastDone: "2023-06-01",
        isRecurring: true,
        numPeriods: 6,
        timePeriod: "month",
        nextDue: "2023-12-01",
        note: "",
        CategoryId: 3,
    },{
        task: "Check smoke detector batteries",
        lastDone: "2023-01-01",
        isRecurring: true,
        numPeriods: 1,
        timePeriod: "year",
        nextDue: "2023-12-01",
        note: "",
        CategoryId: 2,
    },{
        task: "Paint the deck",
        isRecurring: false,
        nextDue: "2023-05-15",
        note: "one time task",
        CategoryId: 2,
    },
];

const startSeedin = async () => {
    try {
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

