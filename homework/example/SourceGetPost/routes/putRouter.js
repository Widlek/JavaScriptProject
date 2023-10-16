const { editDevice } = require("../data/smartphones");

//обработчик для изменения данных. Смартфон для изменения находится по подстроке в имени
function putRouter(request, response) {
  switch (request.url) {
    case "/api/catalog/device/edit":
      let data = "";
      request.on("data", (chunk) => {
        data += chunk;
      });

      request.on("end", () => {
        const dataFromClient = JSON.parse(data);
        //отправляем объект с данными для редактирования — логика находится на той стороне
        const deviceInfo = editDevice(dataFromClient);

        if (!deviceInfo) {
          response.writeHead(404, { "Content-Type": "text/plain" });
          response.end("Smartphone not found");
          return;
        }
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(deviceInfo));
      });
      break;

    default:
      response.statusCode = 404;
      response.end("Request Error. Check the path");
  }
}

module.exports = putRouter;
