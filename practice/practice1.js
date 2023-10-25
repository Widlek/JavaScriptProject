const fs = require("fs");
const { arrayBuffer } = require("stream/consumers");

function task1(stringArray, outputPath, delimiter){
    let newText = "";
    if(!delimiter){
        delimiter = "\n";
    }
    for(let i = 0; i < stringArray.length; i++){
        newText += stringArray[i] + delimiter;
    }

    fs.writeFileSync(`./${outputPath}.txt`, newText);
}

function task2(inputPath, outputPath) {
    let number = 0;
    const text = fs.readFileSync(inputPath, "utf-8");
  
    const newString = text.split(" ");
  
    for(let i = 0; i < newString.length; i++){
            number += parseInt(newString[i]);
    }


  
  
    fs.writeFileSync(outputPath, number);
    return;
}

task2("./text.txt", "./result.txt");