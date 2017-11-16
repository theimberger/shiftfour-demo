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

  //code for youtube fetcher
  var weatherSearch = s4('.weather_search');
  var weatherGo = s4('.weather_go');

  weatherSearch.on("keydown", requestWeather);
  weatherGo.on('click', requestWeather);


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

const requestWeather = (e) => {
  if (e.type === "keydown" && e.keyCode !== 13) {
    return;
  }
  console.log("fired");

  let query = s4('.weather_search').attr("value")[0];

  const gotWeather = (data) => {
    if (data.target.status !== 200) {
      weatherFail();
      return;
    }

    let weather = JSON.parse(data.target.response);
    weather.main = weather.main.temp;
    weather.main = Math.floor(weather.main * 9/5 - 459.67);
    weather.weather = weather.weather[0].main;
    console.log(weather);
    s4(".weather_info").html(
      `The current temperature/weather in ${query} is ${weather.main}°F / ${weather.weather}.`
    );
  };

  const weatherFail = () => {
    s4(".weather_info").html(
      `Couldn't get the weather for ${query}.`
    );
  }

  s4.ajax({
    method: "GET",
    url: `http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=b7a8f75ded6b46eb224c6a0ef234d186`,
    success: gotWeather,
    failure: weatherFail
  });

};


//
//
//
//
// 'GET',
//                 '/youtube/v3/search',
//                 {'maxResults': '25',
//                  'part': 'snippet',
//                  'q': 'surfing',
//                  'type': ''});
