const { getAllCars, addCar, getDeviceBySubname } = require("../data/cars");

function postRouter(request, response) {
    let data = "";
    switch (request.url) {

        case "/cars/all":
            request.on("data", (chunk) => {
                data += chunk;
            })

            request.on("end", () => {

                let array = JSON.stringify(getAllCars());
                const testArray = JSON.parse(array);
                console.log(array);
                console.log(typeof(testArray));
                response.end(array);
            })
            break;
        case "/cars/add":

            request.on("data", (chunk) => {
                data += chunk;
            })

            request.on("end", () => {
                const dataFromClient = JSON.parse(data);
                console.log(typeof(dataFromClient));
                let array = addCar(dataFromClient);
                console.log(dataFromClient);
                response.end(JSON.stringify(array));
            })
            break;
        case "/cars/sort":

        request.on("data", (chunk) => {
            data += chunk;
          });
    
          request.on("end", () => {
            const dataFromClient = JSON.parse(data);
    
            let deviceInfo = getDeviceBySubname(dataFromClient["name"]);
            response.writeHead(200, { "Content-Type": "application/json" });
            console.log(JSON.stringify(deviceInfo));
            response.end(JSON.stringify(deviceInfo));
          });
          break;

    }

}
module.exports = postRouter;
