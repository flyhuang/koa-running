const TodoModel = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo', {
        item: DataTypes.STRING
    });

    return Todo;
};

export default TodoModel
