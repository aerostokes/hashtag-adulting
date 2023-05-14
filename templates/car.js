const { TemplateCategory, TemplateReminder } = require("../models");


// Customize Template Info Here: ----------------------------------
const templateRemindersArr = [
    {
        task: "Oil change",
        isRecurring: true,
        numIntervals: 3,
        timeInterval: "month",
    },{
        task: "Rotate tires",
        isRecurring: true,
        numIntervals: 6,
        timeInterval: "month",
    },{
        task: "Routine maintenance check",
        isRecurring: true,
        numIntervals: 1,
        timeInterval: "year",
    },{
        task: "Change your air filters",
        isRecurring: true,
        numIntervals: 1,
        timeInterval: "year",
    },{
        task: "Check spark plugs and brake pads",
        isRecurring: true,
        numIntervals: 2,
        timeInterval: "year",
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