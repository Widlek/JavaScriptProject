//У меня нет отдельного файла с функиями, привязанными к кнопкам, т.к. они отказывались работать. Поэтому я перенес их в index.html
const http = require("http");
const router = require("./router/index");

const server = http.createServer(router);
server.listen(2007);
