const fs = require("fs");
const path = require("path");
const url = require("url");


function getRouter(request, response){
    const parsedUrl = url.parse(request.url, true);

    switch(parsedUrl.pathname){

        case "/calculate":
            let a = parseInt(parsedUrl.query.a);
            let b = parseInt(parsedUrl.query.b);
            let action = parsedUrl.query.action;
            let result = 0;
            switch(action){
                case "plus":
                    result = a + b;
                break;
                case "minus":
                    result = a - b;
                break;
                case "multiply":
                    result = a * b;
                break;
                case "delit":
                    result = a / b;
                break;
                case "**":
                    result = a ** b;
                break;
            }

            const info = {
                a: a,
                b: b,
                action: action,
                result: result
            }

            const data = JSON.stringify(info);
            console.log(data);
            response.end(data);

        break;

        default:
            response.setHeader("Content-Type", "text/html");
            fs.createReadStream("./public/index.html").pipe(response);
    }
}

module.exports = getRouter;