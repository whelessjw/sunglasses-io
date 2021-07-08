var http = require("http");
var fs = require("fs");
var finalHandler = require("finalhandler");
var queryString = require("querystring");
var Router = require("router");
var bodyParser = require("body-parser");
var uid = require("rand-token").uid;

const PORT = 3001;

const state = {
  brands: [],
  products: [],
  users: [],
  accessTokens: [],
};

//Setup Initial State
fs.readFile("initial-data/brands.json", "utf8", (error, data) => {
  if (error) throw error;
  state.brands = JSON.parse(data);
});

fs.readFile("initial-data/products.json", "utf8", (error, data) => {
  if (error) throw error;
  state.products = JSON.parse(data);
});

fs.readFile("initial-data/users.json", "utf8", (error, data) => {
  if (error) throw error;
  state.users = JSON.parse(data);
});

// Setup router
var myRouter = Router();
myRouter.use(bodyParser.json());

let server = http
  .createServer(function (request, response) {
    myRouter(request, response, finalHandler(request, response));
  })
  .listen(PORT, (error) => {
    if (error) {
      return console.log("Error on Server Startup: ", error);
    }

    console.log(`Server is listening on ${PORT}`);
  });

myRouter.get("/brands", (request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(state.brands));
});

module.exports = server;
