const User = require("./User");
const Category = require("./Category");
const Reminder = require("./Reminder");


Category.belongsTo(User, { onDelete: "CASCADE" });
User.hasMany(Category);

Reminder.belongsTo(Category, { onDelete: "CASCADE" });
Category.hasMany(Reminder);

module.exports = {
    User: User,
    Category: Category,
    Reminder: Reminder,
};