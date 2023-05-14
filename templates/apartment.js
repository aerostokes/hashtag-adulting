const { TemplateCategory, TemplateReminder } = require("../models");


// Customize Template Info Here: ----------------------------------
const templateRemindersArr = [
    {
        task: "Window inspection",
        isRecurring: true,
        numPeriods: 4,
        timePeriod: "month",
    },{
        task: "Cabinet inspection and disinfection",
        isRecurring: true,
        numPeriods: 6,
        timePeriod: "month",
    },{
        task: "Air conditioner filter inspection",
        isRecurring: true,
        numPeriods: 3,
        timePeriod: "month",
    },
    {
        task: "Smoke and carbon monoxide detector test",
        isRecurring: true,
        numPeriods: 1,
        timePeriod: "month",
    },{
        task: "Smoke and carbon monoxide battery replacement",
        isRecurring: true,
        numPeriods: 1,
        timePeriod: "year",
    },
];

const templateCategoryObj = {
        name: "Apartment",
        emoji: "🏡",
        color: "color1",
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