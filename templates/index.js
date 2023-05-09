const sequelize = require("../config/connection");
const { TemplateCategory, TemplateReminder } = require("../models");

const buildTemplates = async () => {
    try {
        // Drop existing Template tables and then sync database
        await TemplateReminder.drop();
        await TemplateCategory.drop();
        await sequelize.sync(); // DO NOT FORCE

//------------------------------------------------
        // Call all templates to be (re)created:
        await require("./house");
        await require("./car");
//------------------------------------------------

        process.exit(0);
    } catch(err) {
        console.log(err);
    };
};

buildTemplates();

