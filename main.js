let form = document.getElementById("form");
let regionInput = document.getElementById("textInput");
let townInput = document.getElementById("textInput1");
let streetInput = document.getElementById("textInput2");
let houseInput = document.getElementById("textInput3");
let roomInput = document.getElementById("textInput4");

if (form){
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        formValidation();
      });
}

// проверка вводимой информации. Заголовок задания не должен быть пустым
let formValidation = () => {
  if (townInput.value === "") {
      msg1.innerHTML = "Заполните поле!";
      console.log("Запись провалена");
    } else if (streetInput.value === ""){
      msg2.innerHTML = "Заполните поле!";
      console.log("Запись провалена");
    } else if (houseInput.value === ""){
      msg3.innerHTML = "Заполните поле!";
      console.log("Запись провалена");
    } else{
      msg.innerHTML = "";
      msg1.innerHTML = "";
      msg2.innerHTML = "";
      msg3.innerHTML = "";
      msg4.innerHTML = "";
      console.log("Успешная запись");
      acceptData();
    }
};

// массив данных
let data = [];
let adress;

let acceptData = () => {
  let data = [];
  data.push({
    region: textInput.value,
    town: textInput1.value,
    street: textInput2.value,
    house: textInput3.value,
    room: textInput4.value,
  });

  adress = textInput.value + ',' + textInput1.value + ',' + textInput2.value + ',' + textInput3.value + ',' + textInput4.value;
    console.log(data);
    console.log(adress);
    alert('Данные отправлены!');
    FindAll();
};

//очистка полей формы
let CleanAll = () =>
{
    textInput.value = "";
    textInput1.value = "";
    textInput2.value = "";
    textInput3.value = "";
    textInput4.value = "";
}

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
})();

let a = 1;

let FindAll = () => {
  var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  var token = "0cdfd79774bc6eaf02e906349eab624342c1844d";
  var query = adress;

var options = {
    method: "POST",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + token
    },
    body: JSON.stringify({query: query})
}

fetch(url, options)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log("error", error), a = 0);
}

var geo_lat = "";
var geo_lon = "";

let Coord_Find = () =>{
  geo_lat = "";
  geo_lon = "";
  if (!a == 1){
    let geo_lat = document.getElementById('geo_lat').value;
    let geo_lon = document.getElementById('geo_lon').value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geo_lat}&lon=${geo_lon}&appid=70f3a9c2d617493de79c5fec2b5612c5`)
    .then(function(resp) {
      return resp.json()
    })
    .then(function(data) {
      console.log(data);
      document.querySelector('.package-name').textContent = data.name;
      document.querySelector('.price').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
      document.querySelector('.disclaimer').textContent = data.weather[0]['main'];
    })
    .catch(function(e) {
      console.log(e)
    });

  } else{
    console.log('Ошибка в координатах');
  }
} 

var modal = document.getElementById("my_modal");
var btn = document.getElementById("coord");
var span = document.getElementsByClassName("close_modal_window")[0];

btn.onclick = function () {
   modal.style.display = "block";
}

span.onclick = function () {
   modal.style.display = "none";
}

window.onclick = function (event) {
   if (event.target == modal) {
       modal.style.display = "none";
   }
}

function Close_window(){
  modal.style.display = "none";
}