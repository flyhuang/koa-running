module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo', {
        item: DataTypes.STRING
    });

    return Todo;
};
