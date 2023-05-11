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
    },
];

const templateCategoryObj = {
        name: "Car",
        emoji: "🚗",
        color: "#F469F4",
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