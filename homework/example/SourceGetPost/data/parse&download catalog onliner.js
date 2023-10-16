function download(filename, text) {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.click();
}

const currency = parseFloat(
  document
    .querySelector("._u.js-currency-amount")
    .innerText.replace("$ ", "")
    .replace(",", ".")
);

const array = Array.from(
  document.querySelectorAll(".schema-product.schema-product_narrow-sizes")
);
console.log(array);

const smarts = {};
for (const smart of array) {
  const parts = smart.querySelector("img").src.split("/");
  const imgSrc = parts.slice(parts.length - 2).join("/");

  let price = smart.querySelector(".schema-product__price");
  if(price){
      price = price.innerText.replace(/[^0-9,]/g, "");
      price = price.replace(",", ".");
      price = (parseFloat(price) / currency).toFixed(2);
  }
  else{
    price = "0";
  }
  

  const desc = smart.querySelector(".schema-product__description").innerText;

  smarts[
    smart.querySelector("img").title.split(" (")[0].replace("Смартфон ", "")
  ] = {
    price: price,
    someSpec: desc,
    img: imgSrc,
  };
}

download("catalog.json", JSON.stringify(smarts, null, 4));
