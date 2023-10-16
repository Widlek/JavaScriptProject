const fs = require("fs");
const path = require("path");
const url = require("url");
const { contentTypes } = require("../config/mimeTypes");
const { getDeviceBySubname } = require("../data/smartphones");

function getRouter(request, response) {
  const parsedUrl = url.parse(request.url, true);
  console.log(parsedUrl);

  switch (parsedUrl.pathname) {
    case "/":
      response.writeHead(301, {
        Location: "/index.html",
      });
      response.end();
      break;
    case "/api/catalog/device/get":
      const name = parsedUrl.query.name;

      //ищем девайс по подстроке в имени
      //если найден — вернётся объект с именем полным и хар-ками
      const deviceInfo = getDeviceBySubname(name);

      //если не найден — null
      if (!deviceInfo) {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end("Error devicename");
        return;
      }

      //отправляем JSON строку с объектом внутри с данными смартфона
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(deviceInfo));

      break;
    default:
      const filePath = path.join("./public", parsedUrl.pathname.substring(1));
      console.log(filePath);

      fs.access(filePath, fs.constants.R_OK, (err) => {
        if (err) {
          response.writeHead(404, {
            "Content-Type": "text/html; charset=utf-8",
          });

          response.end("<h1>Not found</h1>");
        } else {
          const extname = path.extname(filePath);
          const contentType =
            contentTypes[extname] || "application/octet-stream";

          response.writeHead(200, {
            "Content-Type": contentType,
          });
          fs.createReadStream(filePath).pipe(response);
        }
      });
  }
}

module.exports = getRouter;
