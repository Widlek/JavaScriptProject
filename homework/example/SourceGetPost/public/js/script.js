function renderDevice(device) {
  if (device) {
    document.title = device.name;
    deviceNameId.value = device.name;
    devicePriceId.value = `$${device.price}`;
    deviceSomeSpecId.value = device.someSpec;

    deviceImgId.style.display = "block";
    if (device.img.includes("http")) deviceImgSrcId.value = device.img;
    else
      deviceImgSrcId.value = `https://content2.onliner.by/catalog/device/${device.img}`;

    deviceImgId.src = deviceImgSrcId.value;
  } else {
    devicePriceId.value = 0;
    deviceSomeSpecId.value = 0;
    deviceImgId.src = "/img/error.jpg";
    deviceImgSrcId.value = "";
    deviceImgId.style.display = "block";
  }
}

async function getDeviceByName() {
  let deviceObj = JSON.stringify({
    name: deviceNameId.value,
  });

  sendData = `${deviceObj}`;

  const response = await fetch(
    `/api/catalog/device/get?name=${deviceNameId.value}`,
    {
      // method: "GET", можно не писать -- по умолчанию GET
      // body: sendData, не может быть тела у GET-запросика. Придётся публичить данные в пути
    }
  );

  //true, если вернулся статус код 200
  if (response.ok) {
    const responseObj = await response.json();
    console.log(responseObj);
    console.log(`type: ${typeof responseObj}`);

    renderDevice(responseObj);
    return;
  }

  const responseText = await response.text();
  document.querySelector("#deviceSomeSpecId").value = `ERROR: ${responseText}`;
  deviceImgId.src = "/img/error.jpg";
}

async function postDeviceByName() {
  let deviceObj = JSON.stringify({
    name: deviceNameId.value,
  });

  sendData = `${deviceObj}`;

  const response = await fetch(`/api/catalog/device/get`, {
    method: "POST",
    body: sendData,
  });

  //true, если вернулся статус код 200
  if (response.ok) {
    const responseObj = await response.json();
    console.log(responseObj);
    console.log(`type: ${typeof responseObj}`);

    renderDevice(responseObj);
    return;
  }

  const responseText = await response.text();
  document.querySelector("#deviceSomeSpecId").value = `ERROR: ${responseText}`;
  deviceImgId.src = "/img/error.jpg";
}

async function addDevice() {
  console.log(13);
  const name = document.querySelector("#deviceNameId").value;
  const price = document.querySelector("#devicePriceId").value;
  const someSpec = document.querySelector("#deviceSomeSpecId").value;
  const imgSrc = document.querySelector("#deviceImgSrcId").value;

  const data = {
    name: name,
    price: price,
    someSpec: someSpec,
    imgSrc: imgSrc,
  };

  const response = await fetch("/api/catalog/device/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const responseData = await response.json();
    document.querySelector("#deviceSomeSpecId").value = `UPDATED`;
    setTimeout(() => {
      renderDevice(responseData);
    }, 1500);
    return;
  }
  const responseText = response.text();
  document.querySelector("#deviceSomeSpecId").value = `ERROR: ${responseText}`;
  deviceImgId.src = "/img/error.jpg";
}

async function putSmartphone() {
  const name = document.querySelector("#deviceNameId").value;
  const price = document.querySelector("#devicePriceId").value;
  const someSpec = document.querySelector("#deviceSomeSpecId").value;

  const data = {
    subname: name,
    price: price,
    someSpec: someSpec,
  };

  const response = await fetch("/api/catalog/device/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const responseData = await response.json();
    document.querySelector("#deviceSomeSpecId").value = `UPDATED`;
    setTimeout(() => {
      renderDevice(responseData);
    }, 1000);
    return;
  }
  const responseText = response.text();
  document.querySelector("#deviceSomeSpecId").value = `ERROR: ${responseText}`;
  deviceImgId.src = "/img/error.jpg";
}

async function deleteDeviceByName() {
  const name = document.querySelector("#deviceNameId").value;
  const response = await fetch(`/api/catalog/device/delete?name=${name}`, {
    method: "DELETE",
  });

  const responseText = await response.text();
  if (response.ok) {
    document.querySelector(
      "#deviceSomeSpecId"
    ).value = `DELETED: ${responseText}`;
    deviceImgId.src = "/img/delete.png";
    return;
  }

  document.querySelector("#deviceSomeSpecId").value = `ERROR: ${responseText}`;
  deviceImgId.src = "/img/error.jpg";
}

deviceNameId.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("button").click();
  }
});
