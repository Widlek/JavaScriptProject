const { getDeviceBySubname, addDevice } = require("../data/smartphones");

function postRouter(request, response) {
  let data = "";
  switch (request.url) {
    //более стандартное использование POST — для ДОБАВЛЕНИЯ нового в коллекцию
    case "/api/catalog/device/add":
      request.on("data", (chunk) => {
        data += chunk;
      });

      request.on("end", () => {
        const dataFromClient = JSON.parse(data);

        //функция добавления нового девайса — вся обработка на её стороне
        const result = addDevice(dataFromClient);
        if (!result) {
          response.writeHead(404, { "Content-Type": "text/plain" });
          response.end("Error devicename");
          return;
        }

        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(result));
      });
      break;

    //обработчик получения объекта с данными о смартфоне по подстроке в имени
    case "/api/catalog/device/get":
      request.on("data", (chunk) => {
        data += chunk;
      });

      request.on("end", () => {
        const dataFromClient = JSON.parse(data);

        //функция поиска девайса по подстроке в имени — аналогично как и в getRouter
        let deviceInfo = getDeviceBySubname(dataFromClient["name"]);

        if (!deviceInfo) {
          response.writeHead(404, { "Content-Type": "text/plain" });
          response.end("Error devicename");
          return;
        }
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(deviceInfo));
      });
      break;
  }
}

module.exports = postRouter;
