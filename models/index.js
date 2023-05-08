const User = require("./User");


// Category.belongsTo(User, { onDelete: "CASCADE" });
// User.hasMany(Post);

module.exports = {
    User: User,
};