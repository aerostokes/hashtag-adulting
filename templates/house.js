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
    },{
        task: "Check your furnace and HVAC filters",
        isRecurring: true,
        numPeriods: 1,
        timePeriod: "year",
    },{
        task: "Check and touch up exterior paint",
        isRecurring: true,
        numPeriods: 1,
        timePeriod: "year",
    },
];

const templateCategoryObj = {
        name: "House",
        emoji: "🏠",
        color: "color4",
        // choose from: color1, color2, color3, color4, color5, color6
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