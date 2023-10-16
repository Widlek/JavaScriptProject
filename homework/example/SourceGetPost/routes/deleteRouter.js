const url = require("url");

const { deleteDeviceBySubame } = require("../data/smartphones");

//удаление под подстроке имени
function deleteRouter(request, response) {
  const parsedUrl = url.parse(request.url, true);
  console.log(parsedUrl);

  switch (parsedUrl.pathname) {
    case "/api/catalog/device/delete":
      //создаём name, занося в него соответствующее по ключу значение из объекта
      const { name } = parsedUrl.query;

      //дёргаем функцию из модуля, связанного с коллекцией данных
      const devicename = deleteDeviceBySubame(name);

      //если вернулся null — отправляем соответствующий ответ
      if (!devicename) {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end("isn't find");
        return;
      }

      // если всё ОК -- отправляем название смартфона ответом
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end(devicename);

      break;
  }
}

module.exports = deleteRouter;
