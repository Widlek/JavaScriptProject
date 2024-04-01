export interface Food {
    name:string | undefined;
    ccal:number | undefined;
    proteins: number | undefined;
    fats: number | undefined;
    carbohydrates: number | undefined;
    img: string | undefined;
}

function getRandomNumber(min:number, max:number){
    return Math.floor(Math.random() * (max - min) + min);
}

function generateValue(){
    if(Math.random() >= 0.5){
        return undefined;
    }
    else{
        return getRandomNumber(1, 201);
    }
}

function generateImagePath(){
    if(Math.random() >= 0.5){
        return undefined;
    }
    else{
        return `../assets/images/${getRandomNumber(1,8)}.jpg`
    }
}
export let foodArray:Food[] = [];

for(let i = 0; i < getRandomNumber(1, 20); i++){
    let newFood:Food = {
        name: `product ${i}`,
        ccal: generateValue(),
        proteins: generateValue(),
        fats: generateValue(),
        carbohydrates: generateValue(),
        img: generateImagePath(),
    }
    foodArray.push(newFood);
}