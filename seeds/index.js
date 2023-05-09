const sequelize = require("../config/connection");
const { User } = require("../models");

const users = [
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

const startSeedin = async () => {
    try {
        await sequelize.sync({ force: true });
        await User.bulkCreate(users, { individualHooks: true });
        console.log("Seeded Users");
        process.exit(0);
    } catch(err) {
        console.log(err);
    };
};

startSeedin();