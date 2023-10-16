const fs = require("fs");
const path = require("path");

let cars = {};

const dataFromJson = fs.readFileSync(path.join(__dirname, "./catalog.json"));



function getDeviceBySubname(subname) {
  const keys = Object.keys(cars);

  const results = [];
  for (const key of keys) {
    if (key.toLowerCase().includes(subname.toLowerCase())) {
      results.push({ name: key, ...cars[key] });
    }
  }

  return results.length > 0 ? results[0] : null;
}

cars = {
  ...JSON.parse(dataFromJson), 
};

const rednder = async (dataGet) => {

  const { a, b, action, result } = dataGet;
  document.querySelector("#result").textContent = `result : ${result}`;

};

function addCar(data){
  const { name, someSpec } = data;
  cars[name] = {
      name: name,
      someSpec: someSpec,
  }
  return { name: name, ...cars[name] };
}

function getAllCars(){
  return cars;
}
function sortCars(data){
  const {name, someSpec} = data;

}

module.exports = {
  addCar,
  getAllCars,
  getDeviceBySubname,
}