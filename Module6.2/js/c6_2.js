const wsUri = "wss://echo-ws-service.herokuapp.com";
const btnEcho = document.querySelector('.bt1');
const btnGeo = document.querySelector('.bt2');
let status = '';
let karta = false;  //карта на странице
let position = 'query=45.05236%2C35.38863';
document.getElementById('r1').innerHTML = 'Соединение с эхо-сервером не активировалось';  

// Обработчик кнопки bt1
btnEcho.addEventListener("click", async () => {
    let msg = document.getElementById('t1').value;
    let ccc = `<div class="s2" >Вы:  <span class="colortext">${msg}</div>`;
    if (karta) {
      document.getElementById('d1').innerHTML = ""; //очистка карты
      karta = false;
    }

	   d1.insertAdjacentHTML('beforeend', ccc);
	   const websocket = new WebSocket(wsUri);
     document.getElementById('r1').innerHTML = 'Открытие соединения';	
      websocket.onopen = function(evt){
      document.getElementById('r1').innerHTML = 'Отправка сообщения';  
      websocket.send(msg);
    };

    websocket.onmessage = function(evt) {
      document.getElementById('r1').innerHTML = 'Получение ответа с эхо-сервера';  
      let ccc1 = `<div class="s1" >Эхо-сервер:  <span class="colortext">${evt.data}</div>`;
      websocket.close();
      document.getElementById('r1').innerHTML = 'Соединение закрыто';  
      d1.insertAdjacentHTML('beforeend', ccc1);
    };

}); /**/

const error = () => {
  status = 'Невозможно получить ваше местоположение';
  document.getElementById('d1').innerHTML = status;
  //хоть как-то покажет
  //const map = `<div class="hr"> <a href="https://www.openstreetmap.org/#map=17/45.05240/35.38865" target="d1"> ссылка на карту</a></div>`;
  //document.getElementById('d1').innerHTML = map;

  karta = true;
}

// Функция, срабатывающая при успешном получении геолокации
//не работает, видимо из-за санкций
const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  const map = `<div class="hr"> <a https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" target="d1"> ссылка на карту</a></div>`;
  document.getElementById('d1').innerHTML = map;
  status = `Широта: ${latitude} °, Долгота: ${longitude} °`;
  document.getElementById('d1').innerHTML = status;

}
// Обработчик кнопки bt2
btnGeo.addEventListener("click", async () => {

  document.getElementById('d1').innerHTML = "";

 if (!navigator.geolocation) {
    status = 'Geolocation не поддерживается вашим браузером';
  } else {
    status = 'Определение местоположения…';
    //navigator.geolocation.getCurrentPosition(success, error);
    document.getElementById('d1').innerHTML = status;
    navigator.geolocation.getCurrentPosition(success, error);
 
  karta = true;
  }



});
