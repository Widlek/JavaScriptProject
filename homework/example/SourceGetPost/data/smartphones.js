const fs = require("fs");
const path = require("path");

//стартовая коллекция смартфонов
let smartphones = {
  "iphone 14": {
    price: 999,
    someSpec: "Bad Device",
    img: "main/d68e83aa99a0b98f2990da108fdd3eec.jpeg",
  },
  "iphone 14 plus": {
    price: 1313,
    someSpec: "Bad Device :9",
    img: "main/174f002bf0295804c0bb839461e94396.jpeg",
  },
  "iphone 14 pro duper max": {
    price: 1599,
    someSpec: "Some Device :*",
    img: "main/fe986eb32b3021d33d89548f312b8917.jpeg",
  },
};

console.log(__dirname);

//пополняем коллекцию новыми данными из json-файла, который
//заполучили при пасринге страницы каталога onliner'а скриптом рядом
const dataFromJson = fs.readFileSync(path.join(__dirname, "./catalog.json"));

//объединяем в той же коллекции данные
smartphones = {
  ...smartphones, //которые были (... — распаковка)
  ...JSON.parse(dataFromJson), //новые данные, которые получили после считывания в виде строки из файла и их десериализации
};

//поиск смартфона по подстроке в имени
function getDeviceBySubname(subname) {
  const keys = Object.keys(smartphones);

  const results = [];
  for (const key of keys) {
    if (key.toLowerCase().includes(subname.toLowerCase())) {
      results.push({ name: key, ...smartphones[key] });
    }
  }

  return results.length > 0 ? results[0] : null;
}

//поиск ИМЯ целиком по подстроке в нём
function findDeviceNameBySubname(subname) {
  console.log(`subname: ${subname}`);
  const keys = Object.keys(smartphones);
  console.log(keys);

  for (const key of keys) {
    if (key.toLowerCase().includes(subname.toLowerCase())) {
      return key;
    }
  }
  return null;
}

//удаление смартфона (находим по подстроке в имени)
function deleteDeviceBySubame(subname) {
  const devicename = findDeviceNameBySubname(subname);
  if (!devicename) return null;

  delete smartphones[devicename];
  return devicename;
}

//редактирование данных смартфона (находим по подстроке в имени)
function editDevice(data) {
  const { subname, price, someSpec } = data;
  const name = findDeviceNameBySubname(subname);

  if (name && name in smartphones) {
    if (price !== undefined) {
      smartphones[name].price = data.price.replace("$", "");
    }
    if (someSpec !== undefined) {
      smartphones[name].someSpec = data.someSpec;
    }

    console.log(smartphones);
    return getDeviceBySubname(name);
  }

  return false;
}

//обавление нового смартфона
function addDevice(data) {
  const { name, price, someSpec, imgSrc } = data;

  if (name && price && someSpec) {
    smartphones[name] = {
      price: price.replace("$", ""),
      someSpec: someSpec,
      img: imgSrc,
    };

    console.log(smartphones);
    console.log(smartphones[name]);
    return { name: name, ...smartphones[name] };
  }

  return false;
}

//все функции, кадлый из которых необходим для различных методов
//рядом указаны методы, в которых используются
module.exports = {
  getDeviceBySubname, //GET, POST
  addDevice, //POST
  editDevice, //PUT
  deleteDeviceBySubame, //DELETE
};
