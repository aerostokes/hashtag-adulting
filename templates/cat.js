const { TemplateCategory, TemplateReminder } = require("../models");


// Customize Template Info Here: ----------------------------------
const templateRemindersArr = [
    {
        task: "Vaccinations",
        isRecurring: true,
        numIntervals: 1,
        timeInterval: "year",
    },{
        task: "Annual Exorcism",
        isRecurring: true,
        numIntervals: 6,
        timeInterval: "month",
    },
];

const templateCategoryObj = {
        name: "Cat",
        emoji: "😼",
        color: "color5",
        // choose from: color1, color2, color3, color4, color5, color6
        TemplateReminders: templateRemindersArr
    };
//----------------------------------------------------------------

const seedTemplate = async () => {
    try {
        await TemplateCategory.create(templateCategoryObj, {include: [TemplateReminder]});
        console.log(`\x1b[36m\n\n----------------------------------Seeded ${templateCategoryObj.name} Template----------------------------------\n\n\x1b[37m`);
    } catch(err) {
        console.log(err);
    };
}

module.exports = seedTemplate();