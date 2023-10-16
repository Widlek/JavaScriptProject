const sum = require("../utils/math");

function postRouter(request, response) {
  let chunkCount = 0;
  switch (request.url) {
    case "/api/sum":
      let data = "";
      request.on("data", (chunk) => {
        //добавляем обработчик для события получения ПОРЦИИ информации - актуально при получении больших объёмов данных
        data += chunk;
        chunkCount += 1;
      });

      //ненужный обработчик на то же событие, чтобы просто посмотреть ксочек того, что мы считываем
      request.on("data", (chunk) => {
        console.log(chunk);

        consoleString = "";
        for (i = 0; i < 5; i++)
          consoleString += `${chunk[i]}: ${String.fromCharCode(chunk[i])} | `;
        console.log(consoleString);
      });

      //обработчик события завршения получения
      request.on("end", () => {
        console.log(`${chunkCount} chunks readed`);
        chunkCount = 0;

        if (data.length) {
          response.end(String(sum(data)));
        } else {
          response.end("Bad client :0");
        }
      });
      break;
  }
}

module.exports = postRouter;
