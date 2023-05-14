const { TemplateCategory, TemplateReminder } = require("../models");


// Customize Template Info Here: ----------------------------------
const templateRemindersArr = [
    {
        task: "Oil change",
        isRecurring: true,
        numPeriods: 3,
        timePeriod: "month",
    },{
        task: "Rotate tires",
        isRecurring: true,
        numPeriods: 6,
        timePeriod: "month",
    },{
        task: "Routine maintenance check",
        isRecurring: true,
        numPeriods: 1,
        timePeriod: "year",
    },{
        task: "Change your air filters",
        isRecurring: true,
        numPeriods: 1,
        timePeriod: "year",
    },{
        task: "Check spark plugs and brake pads",
        isRecurring: true,
        numPeriods: 2,
        timePeriod: "year",
    },
];

const templateCategoryObj = {
        name: "Car",
        emoji: "🚗",
        color: "color2",
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