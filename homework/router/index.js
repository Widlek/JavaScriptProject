const getRouter = require("./get");
const postRouter = require("./post");

function router(request, response) {
    switch (request.method) {
        case "POST":
            postRouter(request, response);
            break;
        case "GET":
            getRouter(request, response);
            break;
    }
}

module.exports = router;