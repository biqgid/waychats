'use strict';

/*export default class Websocket {

    constructor(host, port) {
        this.socket = new WebSocket("${host}:${port}");
    }

    connection() {
        this.socket.onopen = function() {
            alert("Соединение установлено.");
        }
    }

    error() {
        this.socket.onerror = function(error) {
            alert("Ошибка " + error.messages);
        }
    }

    close() {
        this.socket.onclose = function(event) {
            if (event.wasClean) {
                alert('Соединение закрыто чисто');
            } else {
                alert('Обрыв соединения'); // например, "убит" процесс сервера
            }
            alert('Код: ' + event.code + ' причина: ' + event.reason);
        }
    }

    send() {
        this.socket.onmessage = function(event) {
            alert("Получены данные " + event.data);
        }
    }


}*/
