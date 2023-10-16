// MIME-типы
const contentTypes = {
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",

  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
};

module.exports = {
  contentTypes,
};
// MIME-типы используются для указания браузерам и серверам, как правильно интерпретировать и обрабатывать данные, получаемые и отправляемые через Интернет.
// Вот несколько наиболее популярных типов контента MIME:

// 1. **text/html**: Для веб-страниц в формате HTML.
// 2. **text/plain**: Для простого текстового контента без форматирования.
// 3. **text/css**: Для каскадных таблиц стилей (CSS).
// 4. **text/javascript** или **application/javascript**: Для JavaScript кода.
// 5. **application/json**: Для данных в формате JSON.
// 6. **application/xml** или **text/xml**: Для данных в формате XML.
// 7. **image/jpeg**: Для изображений в формате JPEG.
// 8. **image/png**: Для изображений в формате PNG.
// 9. **image/gif**: Для изображений в формате GIF.
// 10. **application/pdf**: Для файлов в формате PDF (Portable Document Format).
// 11. **application/msword**: Для документов в формате Microsoft Word.
// 12. **application/vnd.ms-excel**: Для таблиц в формате Microsoft Excel.
// 13. **audio/mpeg**: Для аудиофайлов в формате MP3.
// 14. **video/mp4**: Для видеофайлов в формате MP4.
// 15. **application/zip**: Для архивированных файлов в формате ZIP.
// 16. **application/octet-stream**: Общий тип контента для двоичных данных без определенного формата.

// application/octet-stream - это общий MIME-тип для двоичных данных без определенного формата или типа содержимого. Этот MIME-тип используется, когда сервер не может определить точный тип данных, который он отправляет, или когда данные могут представлять собой произвольные двоичные данные, которые не могут быть легко классифицированы как какой-либо другой тип.

// В контексте веб-сервера это означает, что сервер не распознал расширение файла или не может определить его тип контента. В этом случае браузер может попытаться интерпретировать данные как что-то, что он знает, или предложит пользователю скачать файл.
