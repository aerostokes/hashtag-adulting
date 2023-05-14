const { TemplateCategory, TemplateReminder } = require("../models");



// Customize Template Info Here: ----------------------------------
const templateRemindersArr = [
    {
        task: "Your Task 1",
        isRecurring: true,
        numPeriods: 3,
        timePeriod: "month",
    },{
        task: "Your Task 2",
        isRecurring: true,
        numPeriods: 1,
        timePeriod: "year",
    },
];

const templateCategoryObj = {
        name: "Your Custom",
        emoji: "⭐️",
        color: "color6",
        TemplateReminders: templateRemindersArr
    };
//----------------------------------------------------------------

const seedTemplate = async () => {
    try {
        await TemplateCategory.create(templateCategoryObj, {include: [TemplateReminder]});
        console.log(`Seeded ${templateCategoryObj.name} Template`);
    } catch(err) {
        console.log(err);
    };
}

module.exports = seedTemplate();