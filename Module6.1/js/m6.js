const wsUri = "wss://echo-ws-service.herokuapp.com";


// Обработчик кнопки 
const btn = document.querySelector("button");
btn.addEventListener("click", async () => {
    let msg = document.getElementById('t1').value;
    let ccc = `<div class="s2" >Вы:  <span class="colortext">${msg}</div>`;

	   d1.insertAdjacentHTML('beforeend', ccc);
	   const websocket = new WebSocket(wsUri);	
      websocket.onopen = function(evt){
      websocket.send(msg);
    };

    websocket.onmessage = function(evt) {
      let ccc1 = `<div class="s1" >Эхо-сервер:  <span class="colortext">${evt.data}</div>`;
      websocket.close();
      d1.insertAdjacentHTML('beforeend', ccc1);
    };

}); /**/