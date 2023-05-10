const { TemplateCategory, TemplateReminder } = require("../models");


// Customize Template Info Here: ----------------------------------
const templateRemindersArr = [
    {
        task: "Check smoke detector batteries",
        isRecurring: true,
        numPeriods: 1,
        timePeriod: "year",
    },{
        task: "Change filters",
        isRecurring: true,
        numPeriods: 6,
        timePeriod: "month",
    },
];

const templateCategoryObj = {
        name: 'House',
        emoji: '🏠',
        color: 'blue',
        // choose from: blue, yel-grn, pink, teal, yellow, magenta
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