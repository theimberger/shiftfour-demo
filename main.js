s4(() => {

  //code for todo widget

  setTodos();
  var addTodo = s4(".add_todo")
  var addButton = s4('.add_button');

  addTodo.on("keydown", createTodo);
  addButton.on("click", createTodo);

  //code for the color grid widget

  createTable();
  var cells = s4('td');
  var colorReset = s4('#color_reset');
  var colorFill = s4('#color_fill');

  cells.on("mouseenter", (e) =>
    changeColor(e.currentTarget)
  );

  colorReset.on('click', () => {
    cells.css("background-color", "#ffffff");
  });

  colorReset.on('click', () => {
    cells.css("background-color", "#ffffff");
  });

  colorFill.on('click', () => {
    cells.children().forEach( el => changeColor(el));
  });

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

const createTable = () => {
  let table = s4('tbody');
  let i = 0;
  let tr = "<tr></tr>";
  let td = "<td></td>";
  let current;

  while (i < 20) {
    table.append(tr);
    current = s4('tr').last();
    let j = 0;
    while (j < 20) {
      current.append(td);
      j ++;
    }
    i ++;
  }
};

const changeColor = (element) => {
  let color = "";
  let characters = "0123456789abcdef";
  for (let i = 0; i < 6; i++){
    color += characters[Math.floor(Math.random() * 16)];
  }
  color = "#" + color;
  s4(element).css("background-color", color);
};
