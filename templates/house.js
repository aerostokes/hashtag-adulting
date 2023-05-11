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
        name: "House",
        emoji: "🏠",
        color: "#38B7E3",
        // choose from: #38B7E3, #D8F226, #FF478D, #9AD8DA, #FFCA21, #F469F4
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