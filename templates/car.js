const { TemplateCategory, TemplateReminder } = require("../models");


//----------------------------------------------------------------
// Enter Template Info Here
const templateRemindersArr = [
    {
        task: "Oil change",
        isRecurring: true,
        numPeriods: 3,
        timePeriod: "month",
        note: "",
    },{
        task: "Rotate tires",
        isRecurring: true,
        numPeriods: 6,
        timePeriod: "month",
        note: "",
    },
];

const templateCategoryObj = {
        name: 'Car',
        emoji: '🚗',
        color: 'pink',
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