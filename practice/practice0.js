const fs = require("fs");



function task1(inputPath, outputPath) {
  const text = fs.readFileSync(inputPath, "utf-8");

  const newString = text.split(" ").join("\n");

  fs.writeFileSync(outputPath, newString);
  return;
}

function task2(inputPath, outputPath) {
  const text = fs.readFileSync(inputPath, "utf-8");

  const newString = text.split("\n");

  let newText = "";

  for (let i = 0; i < newString.length; i++) {
    newText += `${newString[i]}\n`;
  }

  fs.writeFileSync(outputPath, newText);
  return;
}

function task3(inputPath, outputPath) {
  const text = fs.readFileSync(inputPath, "utf-8");

  const newString = text.split("\n");

  let newText = "";

  for (let i = newString.length - 1; i >= 0; i--) {
    newText += `${newString[i]}\n`;
  }

  fs.writeFileSync(outputPath, newText);
  return;
}

function task4(text1, text2) {
  const string1 = fs.readFileSync(text1, "utf-8");

  const string2 = fs.readFileSync(text2, "utf-8");

  if (string1 == string2) {
    return true;
  } else {
    return false;
  }
}

function task5(inputPath, letter) {
  let count = 0;

  const text1 = fs.readFileSync(inputPath, "utf-8");

  let array = text1.split(/(?:,| )+/);

  for (let i = 0; i < array.length; i++) {
    if (letter == array[i][0]) {
      count++;
    }
  }

  return count;
}

function task6(inputPath, outputPath, char1, char2) {
    const text = fs.readFileSync(inputPath, "utf-8");
  
    const newString = text.split(char1).join(char2);
  
    fs.writeFileSync(outputPath, newString);
    return;
}

function task7(outputPath){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let array = [];
    let text = "";
    for(let i = 0; i < Math.floor(Math.random() * 30); i++){
        array[i] = "";
        for(let x = 0; x < Math.floor(Math.random() * 30); x++){
            let randomChar = Math.floor(Math.random() * characters.length);
            array[i] += characters[randomChar]
        }
    }

    for(let i = 0; i < array.length; i++){
        text += `${array[i]}\n`;
    }
    console.log(array)
    fs.writeFileSync(outputPath, text);
}


function task8(inputPath, outputPath) {
    let characterCount = 0;
    let numberCount = 0;
    const text1 = fs.readFileSync(inputPath, "utf-8")
  
    let array1 = text1.split(" ");

    for(let i = 0; i< array1.length; i++){
        characterCount += array1[i].length;
    }

  
    fs.writeFileSync(outputPath, ("characters in a file - " + characterCount ));
}

function task9(inputPath, outputPath) {

    const stats = fs.statSync(inputPath);

  
    return stats.size
}

function task10(inputPath) {
    const text = fs.readFileSync(inputPath, "utf-8");
  
    const newString = text.split("\n");
  
    return newString.length;
}

function task11(inputPath) {
    let maxLength = "";
    const text = fs.readFileSync(inputPath, "utf-8");
  
    const newString = text.split("\n");

    
    for(let i = 0; i < newString.length; i++){
        if(maxLength.length < newString[i].length){
            maxLength.length = newString[i].length;
        }
    }
    return maxLength.length;
}


function task12(inputPath, outputPath) {
  const text = fs.readFileSync(inputPath, "utf-8");

  const newString = text.split("\n");

  let newText = newString[newString.length - 1];


  fs.writeFileSync(outputPath, newText);
  return;
}

function task13(inputPath, wordsFile, outputPath) {
  let newText = "";
  const text = fs.readFileSync(inputPath, "utf-8");
  const wordsToDelete = fs.readFileSync(wordsFile, "utf-8");

  const originalText = text.split(" ");
  
  const arrayOfWords = wordsToDelete.split(",");
  let newArrayOfWords = arrayOfWords.map(element => {
    return element.toLowerCase();
  });
  for(let i = 0; i < originalText.length; i++){
    if(!newArrayOfWords.includes(originalText[i].toLowerCase())){
      newText += originalText[i] + " ";
    }

  }

  fs.writeFileSync(outputPath, newText);
  return;
}

task13("./text.txt", "./words.txt", "./result.txt");