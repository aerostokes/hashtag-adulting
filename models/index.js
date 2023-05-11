const User = require("./User");
const Category = require("./Category");
const Reminder = require("./Reminder");
const TemplateCategory = require("./TemplateCategory")
const TemplateReminder = require("./TemplateReminder")

Category.belongsTo(User, { onDelete: "CASCADE" });
User.hasMany(Category);

Reminder.belongsTo(Category, { onDelete: "CASCADE" });
Category.hasMany(Reminder);

TemplateReminder.belongsTo(TemplateCategory, { onDelete: "CASCADE" });
TemplateCategory.hasMany(TemplateReminder);

module.exports = {
    User: User,
    Category: Category,
    Reminder: Reminder,
    TemplateCategory: TemplateCategory,
    TemplateReminder: TemplateReminder,
};