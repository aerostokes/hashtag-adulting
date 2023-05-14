const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const brcrypt = require("bcrypt");
const { sendMail } = require("../services")

class User extends Model{};
User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8],
        },
    },
    mobile: {
        type: DataTypes.STRING,
        validate: {
            //TODO: add regexp for phone number
        },
    },
    contactEmail: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    contactText: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
},{
    sequelize,
    hooks: {
        beforeCreate: userObj => {
            userObj.password = brcrypt.hashSync(userObj.password, 3);
            return userObj;
        },
        afterCreate: userObj => {
            sendMail(
                userObj.email, 
                `
                    <img width="200px" height="200px" alt="Adulting Logo" src="https://hashtag-adulting.herokuapp.com/images/hashtagAdultingIcon.png" />
                    <h1> Welcome to #Adulting - Hassel free reminders for your busy life!  </h1>
                    <p> Dear fellow adult, </p>
                    <p> Welcome to #Adulting! We're thrilled to have you on board as a user of our app, designed to make your adulting journey a breeze. As life gets busier, we understand the need for a reliable tool to help you stay on top of your responsibilities that you might not have even known about! That's where #Adulting comes in!</p>
                    <p> We believe that adulting should be stress-free, and with #Adulting, we're committed to making that a reality for you. We're constantly working on new features and improvements to enhance your experience, and we'd love to hear your feedback and suggestions along the way.</p>
                    <p> Thank you once again for choosing #Adulting as your set it and forget it app! We're excited to be apart of your journey as you conquer the world of adulting with confidence!
                    </p>
                    <p> Best regards,</p>
                    <p> The #Adulting Team</p>
                `,
            );
        },
    },
});

module.exports = User;