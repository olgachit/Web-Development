let todosArray = [];
let nextId = 1;

function addOne(task, completed, dueDate) {
    if (!task || completed === undefined || !dueDate) {
        return false;
    }

    const newTodo = {
        id: nextId++,
        task,
        completed,
        dueDate
    };

    todosArray.push(newTodo);
    return newTodo;
}
if (require.main === module) {
    let result = addOne("Buy groceries", false, "01/07/2024");
    console.log(result);
    result = addOne("Walk the dog", true, "30/06/2024");
    console.log(result);
}

function getAll() {
    return todosArray;
}
if (require.main === module) {
    console.log("getAll called:", getAll());
}

function findById(id) {
    const numericId = Number(id);
    const todo = todosArray.find(item => item.id === numericId);
    return todo || false;
}
if (require.main === module) {
    console.log("findById called:", findById(1));
}

function updateOneById(id, updatedData) {
    const todo = findById(id);
    if (todo) {
        if (updatedData.task) todo.task = updatedData.task;
        if (updatedData.completed !== undefined) todo.completed = updatedData.completed;
        if (updatedData.dueDate) todo.dueDate = updatedData.dueDate;
        return todo;
    }
    return false;
}
if (require.main === module) {
    console.log("updateOneById called:", updateOneById(1, { task: "Updated Task", completed: true }));
}

function deleteOneById(id) {
    const todo = findById(id);
    if (todo) {
        const initialLength = todosArray.length;
        todosArray = todosArray.filter(item => item.id !== Number(id));
        return todosArray.length < initialLength;
    }
    return false;
}
if (require.main === module) {
    console.log("deleteOneById called:", deleteOneById(1));
}