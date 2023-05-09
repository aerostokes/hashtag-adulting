const { TemplateCategory, TemplateReminder } = require("../models");


//----------------------------------------------------------------
// Enter Template Info Here
const templateRemindersArr = [
    {
        task: "Check smoke detector batteries",
        isRecurring: true,
        numPeriods: 1,
        timePeriod: "year",
        note: "",
    },{
        task: "Change filters",
        isRecurring: true,
        numPeriods: 6,
        timePeriod: "month",
        note: "",
    },
];

const templateCategoryObj = {
        name: 'House',
        emoji: '🏠',
        color: 'yellow',
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