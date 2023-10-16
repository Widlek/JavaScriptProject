const { getAllCars, addCar } = require("../data/cars");

function postRouter(request, response) {
    let data = "";
    switch (request.url) {
        case "/cars/add":
            
            request.on("data", (chunk) => {
                data += chunk;
            })

            request.on("end", () => {
                const dataFromClient = data;
                console.log(dataFromClient);
                let array = addCar(dataFromClient);
                console.log(array);
                response.end(JSON.stringify(array));
            })

    }

}
module.exports = postRouter;