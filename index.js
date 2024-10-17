let form = document.getElementById("form");
let regionInput = document.getElementById("textInput");
let townInput = document.getElementById("textInput1");
let streetInput = document.getElementById("textInput2");
let houseInput = document.getElementById("textInput3");
let roomInput = document.getElementById("textInput4");
var geo_lat = "";
var geo_lon = "";

// проверка вводимой информации. Заголовок задания не должен быть пустым
let formValidation = () => {
  if (townInput.value === "") {
    msg1.innerHTML = "Заполните поле!";
    console.log("Запись провалена");
    return false;
  } else if (streetInput.value === ""){
    msg2.innerHTML = "Заполните поле!";
    console.log("Запись провалена");
    return false;
  } else if (houseInput.value === ""){
    msg3.innerHTML = "Заполните поле!";
    console.log("Запись провалена");
    return false;
  } else {
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
})();

let FindAll = () => {
  var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  var token = "0cdfd79774bc6eaf02e906349eab624342c1844d";
  var query = adress;
  console.log(query)

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
    .then(response =>{
      response.json()
    .then(r => {
      if (r.suggestions.length>0){
        geo_lat=r.suggestions[0].data.geo_lat
        geo_lon=r.suggestions[0].data.geo_lon
        Coord_Find()
      }})
    })
    .catch(error => {
      console.log("error", error)
    });
}

function Coord_Find(){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geo_lat}&lon=${geo_lon}&appid=70f3a9c2d617493de79c5fec2b5612c5`)
  .then(function(resp) {
    return resp.json()
  })
  .then(function(data) {
    console.log(data);
    document.querySelector('.address').textContent = data.name;
    document.querySelector('.temp').textContent = Math.round(data.main.temp - 273) + '°';
      modal.style.display = "block";
  })
  .catch(function(e) {
    console.log(e)
  });
} 

var modal = document.getElementById("my_modal");
var btn = document.getElementById("put");
var span = document.getElementsByClassName("close_modal_window")[0];

btn.onclick=function(){
  formValidation()
}

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal)
    modal.style.display = "none";
}

function Close_window(){
  modal.style.display = "none";
}
