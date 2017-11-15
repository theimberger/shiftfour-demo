s4(() => {

  setTodos();
  var addTodo = s4(".add_todo")
  var addButton = s4('.add_button');

  addTodo.on("keydown", createTodo);

  addButton.on("click", createTodo);
});

const setTodos = () => {
  var close = s4('.close');
  close.on("click", (e) => {
    s4(e.currentTarget).parent().remove();
  });
};

const createTodo = (e) => {
  let input = s4('.add_todo');
  if (e.type === "click" || e.keyCode === 13) {
    s4('.todo_list').append(
      `<li class="todo">
        <span>${input.attr("value")}</span>
        <span class="close">✕</span>
      </li>`
    );
    input.arr[0].value = ("");
    setTodos();
  }
};
