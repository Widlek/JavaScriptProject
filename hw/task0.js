"use strict";
function task00() {
    var output = "Squint your eyes to see clearly \n Blur reality to make it real \n Let focus go from your deceiving eyes \n To know whats been concealed ";
    var div = document.getElementById("task00-output");
    div.innerHTML = output;
}
function task01() {
    var n1 = Math.floor(Math.random() * 20);
    var n2 = Math.floor(Math.random() * 20);
    var n3 = Math.floor(Math.random() * 20);
    var output = `1) ${n1} + ${n2} + ${n3} = ${n1 + n2 + n3} \n 2) ${n1} - ${n2} - ${n3} = ${n1 - n2 - n3} \n 3) ${n1} * ${n2} / ${n3} = ${Math.floor(n1 * n2 / n3)}`;
    var div = document.getElementById("task01-output");
    div.innerHTML = output;
}
function task02() {
    var input = document.getElementById("task02-input").value;
    var output = `You've lived ${+input * 365} full days \n You would have earnd ${+input * 5 * 365} BYN for every day You've lived \n You can buy ${Math.floor(+input * 365 * 5 / 3 / 1313)} кенгулонов for that money`;
    var div = document.getElementById("task02-output");
    div.innerHTML = output;
}
function taskA() {
    var kengulon1 = Math.floor(Math.random() * 100);
    var kengulon2 = Math.floor(Math.random() * 100);
    var kengulon3 = Math.floor(Math.random() * 100);
    var output = "Something wen horribly wrong";
    var symbols = "!@#";
    var symbol = symbols[Math.floor(Math.random() * 3)];
    switch (symbol) {
        case "!": {
            output = `кенгулон 1: ${kengulon1} \n кенгулон 2: ${kengulon2} \n кенгулон 3: ${kengulon3} \n Max кенгулон size - ${Math.max(kengulon1, kengulon2, kengulon3)}`;
            break;
        }
        case "@": {
            output = `кенгулон 1: ${kengulon1} \n кенгулон 2: ${kengulon2} \n кенгулон 3: ${kengulon3} \n Average кенгулон size - ${Math.round((kengulon1 + kengulon2 + kengulon3) / 3)}`;
            break;
        }
        case "#": {
            output = `кенгулон 1: ${kengulon1} \n кенгулон 2: ${kengulon2} \n кенгулон 3: ${kengulon3} \n Difference between biggest and smallest кенгулон - ${Math.max(kengulon1, kengulon2, kengulon3) - Math.min(kengulon1, kengulon2, kengulon3)}`;
            break;
        }
    }
    var div = document.getElementById("taskA-output");
    div.innerHTML = output;
}
function taskB() {
    var r1 = document.getElementById("taskBR1-input").value;
    var r2 = document.getElementById("taskBR2-input").value;
    var r3 = document.getElementById("taskBR3-input").value;
    var div = document.getElementById("taskB-output");
    var output = `r0 = ${1 / (1 / (+r1) + 1 / (+r2) + 1 / (+r3))}`;
    console.log(output);
    var div = document.getElementById("taskB-output");
    div.innerHTML = output;
}
