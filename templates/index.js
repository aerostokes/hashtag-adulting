const sequelize = require("../config/connection");
const { TemplateCategory, TemplateReminder } = require("../models");

const buildTemplates = async () => {
    try {
        // Drop existing Template tables and then sync database
        await TemplateReminder.drop();
        await TemplateCategory.drop();
        await sequelize.sync(); // DO NOT FORCE

// Call template files here:------------------------------
        await require("./house");
        await require("./car");
        await require("./dog");
        await require("./apartment");
//--------------------------------------------------------------------
        await require("./userCustom");

        process.exit(0);
    } catch(err) {
        console.log(err);
    };
};

buildTemplates();

