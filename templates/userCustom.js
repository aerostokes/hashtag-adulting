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
        isRecurring: false,
    },
];

const templateCategoryObj = {
        name: 'Build Your Own Cateogry',
        emoji: '🛠️',
        color: 'yellow',
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