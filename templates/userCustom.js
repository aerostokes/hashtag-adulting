const { TemplateCategory, TemplateReminder } = require("../models");



// Customize Template Info Here: ----------------------------------
const templateRemindersArr = [
    {
        task: "Your Task 1",
        isRecurring: true,
        numIntervals: 3,
        timeInterval: "month",
    },{
        task: "Your Task 2",
        isRecurring: true,
        numIntervals: 1,
        timeInterval: "year",
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