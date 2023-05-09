const canvas = document.getElementById('canvas');
const cxt = canvas.getContext('2d');

const shop = document.getElementById('height');

const textTimer = document.getElementById('timer')
const moneyText = document.getElementById("money")

const healthUpButton = document.getElementById('maxhealthbutton');
const healButton = document.getElementById('regenbutton');
const damageUpButton = document.getElementById('damagebutton');
const ricochetUpButton = document.getElementById('ricochetbutton');
const attackSpeedUpButton = document.getElementById('attackspeedbutton');

const previousScore = document.getElementById("previousScore");

const scoreEl = document.getElementById('score');

let score = 0;
// var audioElement0 = document.createElement('audio');
// audioElement0.setAttribute('src', 'backgroundmusic.mp3');
// audioElement0.setAttribute('autoplay', 'autoplay');
// audioElement0.loop = true;
// audioElement0.Play(); 

const startGameButton = document.getElementById("startButton");

const startMenu = document.getElementById("startMenu");

let healthUpPrice = 500;
let healPrice = 100;
let damagePrice = 500;
let ricochetPrice = 400;
let attackSpeedPrice = 300;

let globaltimer = 0;
let globaltimer2 = 0;

multishot = 1;

let speedMultiplier = 1;

let spawnMultiplier = 1;

let healthMultiplier = 0;

canvas.width = window.innerWidth * 0.80;
canvas.height = shop.clientHeight;

var projectileVelocity = 9;

var money = 100;

var seconds = 0;
var minutes = 0;

textTimer.style.fontFamily = "fantasy";
textTimer.style.fontSize ="60px"
textTimer.style.color = "white"
moneyText.style.fontFamily = "fantasy";
moneyText.style.fontSize ="60px"
moneyText.style.color = "white"

let backgroudnMusic = new Audio('backgroundmusic.mp3');

let startSound = new Audio('gameStart.mp3');

let powerup = new Audio('upgrade.mp3');

let playerHit = new Audio('playerhit.mp3')


playerHit.volume = 0.1;

powerup.volume = 0.05;

let velocityMultiplier = 1;
backgroudnMusic.volume = 0.05;
backgroudnMusic.loop = true;





const screenShake = [ 
  { transform: "translate(1px, 1px) rotate(0deg)" },
  { transform: "translate(-1px, -2px) rotate(-1deg)" },
  { transform: "translate(-3px, 0px) rotate(1deg)"},
  { transform: "translate(3px, 2px) rotate(0deg)" },
  { transform: "translate(1px, -1px) rotate(1deg)" },
  { transform: "translate(-1px, 2px) rotate(-1deg)" },
  { transform: "translate(-3px, 1px) rotate(0deg)"},
  { transform: "translate(3px, 1px) rotate(-1deg)" },
  { transform: "translate(-1px, -1px) rotate(1deg)" },
  { transform: "translate(1px, 2px) rotate(0deg)" },
  { transform: "translate(1px, -2px) rotate(-1deg)"} ];

const screenShakeTiming = {
  duration: 500,
  iterations: 1
}

class Player {
    constructor(x, y, size, color, speedX, speedY, hp){
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.maxHp = hp;
        this.hp = hp;
        this.color = color;
        this.attackSpeed = 500;
        this.damage = 1;
        this.ricochet = 0;

    }

    draw(){
        cxt.beginPath();
        cxt.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        cxt.fillStyle = this.color;
        cxt.fill();
    }



    setX(int){
        this.x = int;
    }
    setY(int){
        this.y = int;
    }

    getY(){
      return this.y;
    }
    getX(){
      return this.x;
    }


update(){
  if(this.x - this.size <= this.size){
    this.x += 1 * velocityMultiplier;
  }
  else if(this.x + this.size >= canvas.width + 3){
    this.x -= 1 * velocityMultiplier;
  }
  else if(this.y + this.size >= canvas.height - 3){
    this.y -= 1 * velocityMultiplier;
  }
  else if(this.y - this.size <= this.size){
    this.y += 1 * velocityMultiplier;
  }
  if (keyD == true) {
    this.x += 1 * velocityMultiplier;
  }
  if (keyS == true) {
    this.y += 1 * velocityMultiplier;
  }
  if (keyA == true) {
    this.x -= 1 * velocityMultiplier;
  }
  if (keyW == true) {
    this.y -= 1 * velocityMultiplier;
  }
  }
}
class UIElemt{
  constructor(x, y, width, height, color){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw(){
    cxt.beginPath();
    cxt.fillStyle = this.color;
    cxt.rect(this.x, this.y, this.width, this.height)
    cxt.fill();
  }

}
class UIText{
  constructor(x,y, font, color){
    this.text = "+25";
    this.x = x;
    this.y = y;
    this.font = font;
    this.color = color;
    this.opacity = 1;
    this.ychange = Math.round((Math.random() * 1) * 10) / 10;
    this.xchange = Math.round(((Math.random() * 2) - 1) * 10) / 10;
  }
  draw(){
    cxt.fillStyle = `rgba(255, 255, 255, ${this.opacity}`
    cxt.font = this.font
    cxt.fillText(this.text, this.x, this.y)
    this.y -= this.ychange;
    this.x += this.xchange;
    this.opacity -= 0.0125;
  }
}
class Projectile{
    constructor(x, y, radius, color, type, velocity, ricochet){
        this.x = x;
        this.y = y;
        this.type = type;
        this.color = color;
        this.radius = radius;
        this.velocity = velocity;
        this.ricochet = ricochet;
        
    }

    draw(){
        cxt.beginPath();
        cxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        cxt.fillStyle = this.color;
        cxt.fill();
    }

    update(){
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

class Particle{
  constructor(x, y, radius, color, velocity){
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this. velocity = velocity;
      this.alpha = 1;
      this.friction = 0.97
      
  }

  draw(){
      cxt.save()
      cxt.globalAlpha = this.alpha
      cxt.beginPath();
      cxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      cxt.fillStyle = this.color;
      cxt.fill();
      cxt.restore()
  }

  update(){
      this.draw();
      this.velocity.x *= this.friction;
      this.velocity.y *= this.friction;
      this.x = this.x + this.velocity.x;
      this.y = this.y + this.velocity.y;
      this.alpha -= 0.01;

  }
}
class Button{
  constructor(startPrice, priceModifier, playerStat, playerStatModifier, object, text){
    this.startPrice = startPrice;
    this.priceModifier = priceModifier;
    this.price = startPrice;
    this.playerStat = playerStat;
    this.playerStatModifier = playerStatModifier;
    this.object = object
    this.text = text;
  }

  buyUpgrade(){
    if(money >= this.price){
      this.price *= this.priceModifier;
      this.playerStat += playerStatModifier;
      money =- this.price;
    }
  }
  update(){
    this.object.innerText = this.text + `${this.price}$`; 
  }

  getPrice(){
    return this.price
  }
}
class Enemy{
    constructor(x, y, color, hp, velocity){
      this.x = x;
      this.y = y;
      this.hp = hp;
      this.radius = Math.trunc((15 * (this.hp))/3 + 5);
      this.velocity = velocity;
      this.trueHp = hp;
      this.color = color;
      this.tempX = 0;
      this.tempY = 0;
        // switch(this.hp){
        //   case 1: this.color = 'red';
        //     break;
        //   case 2: this.color = 'blue';
        //     break;
        //   case 3: this.color = 'green';
        //     break;
        //   case 4: this.color = 'yellow';
        //     break;
        //   case 5: this.color = 'pink';
        //     break;
        // }
    }

    draw(){
        cxt.beginPath();
        cxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        cxt.fillStyle = this.color;
        cxt.fill();
    }

}

class CommonEnemy extends Enemy{
  update(){
    this.angle = Math.atan2(newplayer.getY() - this.y, newplayer.getX() - this.x);
    // if(newplayer.getX() + 5 - this.x > 0){
    //     this.constantX = 1;
    // }
    // else if(newplayer.getX() + 5 - this.x < 0){
    //     this.constantX = -1;
    // }

    // if(newplayer.getY() + 5 - this.y > 0){
    //     this.constantY = 1
    // }dw
    // else if(newplayer.getY() + 5 - this.y < 0){
    //     this.constantY = -1
    // }
    // this.radius = this.radius * this.hp;
    // this.radius = Math.trunc((30 * this.hp)/3);
    // switch(this.hp){
    //   case 1: this.color = 'red';
    //     break;
    //   case 2: this.color = 'blue';
    //     break;
    //   case 3: this.color = 'green';
    //     break;
    //   case 4: this.color = 'yellow';
    //     break;
    //   case 5: this.color = 'pink';
    //     break;
    // }
    this.velocity = {
        x: (Math.cos(this.angle) * 1.5 * speedMultiplier) / (this.hp * 0.8),
        y: (Math.sin(this.angle) * 1.5 * speedMultiplier) / (this.hp * 0.8),
    }
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}



class BackgroundProjectile{
  constructor(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw(){
    cxt.beginPath();
    cxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    cxt.fillStyle = this.color;
    cxt.fill();
  }
}

class FastEnemy extends Enemy{
  update(){

    if(Math.abs(this.tempX - this.tempY) < 5 || Math.abs(this.tempY - this.y) < 5){
      this.tempX = newplayer.getX() + Math.floor(Math.random() * 500) - 250;
      this.tempY = newplayer.getY() + Math.floor(Math.random() * 500) - 250;
    }
    else if(this.tempX == 0 && this.tempY == 0){
      this.tempX = newplayer.getX() + Math.floor(Math.random() * 500) - 250;
      this.tempY = newplayer.getY() + Math.floor(Math.random() * 500) - 250;
    }
    this.angle = Math.atan2(this.tempY - this.y, this.tempX - this.x);
    // if(newplayer.getX() + 5 - this.x > 0){
    //     this.constantX = 1;
    // }
    // else if(newplayer.getX() + 5 - this.x < 0){
    //     this.constantX = -1;
    // }

    // if(newplayer.getY() + 5 - this.y > 0){
    //     this.constantY = 1
    // }dw
    // else if(newplayer.getY() + 5 - this.y < 0){
    //     this.constantY = -1
    // }
    // this.radius = this.radius * this.hp;
    // this.radius = Math.trunc((30 * this.hp)/3);
    // switch(this.hp){
    //   case 1: this.color = 'red';
    //     break;
    //   case 2: this.color = 'blue';
    //     break;
    //   case 3: this.color = 'green';
    //     break;
    //   case 4: this.color = 'yellow';
    //     break;
    //   case 5: this.color = 'pink';
    //     break;
    // }
    this.velocity = {
        x: (Math.cos(this.angle) * 3 * speedMultiplier) / (this.hp * 0.8),
        y: (Math.sin(this.angle) * 3 * speedMultiplier) / (this.hp * 0.8),
    }
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;

}
}
var tempX = 10;
var tempY = 30;



function createBackground(){
  while(tempY <= canvas.height){
    while(tempX <= canvas.width){
      let temp = new BackgroundProjectile(tempX, tempY, 2, "blue");
      background.push(temp);
      tempX += 45;
    }
    tempX = 0;
    tempY = tempY + 45;
  }

}


const x = canvas.width / 2;
const y = canvas.height / 2;





function onKeyDown(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
      case 68: //d
        keyD = true;
        break;
      case 83: //s
        keyS = true;
        break;
      case 65: //a
        keyA = true;
        break;
      case 87: //w
        keyW = true;
        break;
    }
}

function onKeyUp(event) {
    var keyCode = event.keyCode;
  
    switch (keyCode) {
      case 68: //d
        keyD = false;
        break;
      case 83: //s
        keyS = false;
        break;
      case 65: //a
        keyA = false;
        break;
      case 87: //w
        keyW = false;
        break;
    }
}

var tickX = 10;
var tickY = 10;

var keyW = false;
var keyA = false;
var keyS = false;
var keyD = false;

let deathsound = new Audio('death.mp3');



let animationId;

clickSound = true;





let newplayer = new Player(x, y, 5, 'white', 0, 0, 10)

let maxHealth = new UIElemt(0, canvas.height - 30, canvas.width, 30, "red");

let currentHalth = new UIElemt(0, canvas.height - 30, canvas.width, 30, "green");

let projectiles = [];

let enemies = [];

let particles = [];

let background = [];

let uiElements = [maxHealth, currentHalth];

let uiText = [];

let heal = new Button(100, 1.10, newplayer.hp, newplayer.maxHp - newplayer.hp, healButton, `Regen health:`);
let healthUp = new Button(500, 1.25, newplayer.maxHp, 1, healthUpButton, `Health Up:`);
let damageUp = new Button(500, 1.25, newplayer.damage, 1, damageUpButton, `Damage Up:`);
let attackSpeedUp = new Button(400, 1.25, newplayer.attackSpeed, -50, attackSpeedUpButton, `Speed Up:`);
let ricochetUp = new Button(300, 1.25, newplayer.ricochet, newplayer.maxHp - newplayer.hp, ricochetUpButton, `Wall ricochet:`);

let Buttons = [heal, healthUp, damageUp, attackSpeedUp, ricochetUp]

function animate(){
  
  textTimer.innerText = `${minutes} : ${Math.trunc(seconds / 10)}${seconds % 10}`
  animationId = requestAnimationFrame(animate);
  cxt.fillStyle = 'rgba(0,0,0,0.1)'
  cxt.fillRect(0, 0, canvas.width, canvas.height);

  if(canvas.height != shop.clientHeight){
    canvas.height = shop.clientHeight
    maxHealth.x = 0;
    maxHealth.y = canvas.height - 30;
    currentHalth.x = 0;
    currentHalth.y = canvas.height - 30;
  }
  newplayer.draw();
  newplayer.update();
  createBackground();
  background.forEach((backgroundProjectile, index) =>{
    const dist = Math.hypot(newplayer.x - backgroundProjectile.x, newplayer.y - backgroundProjectile.y)
    if(dist < 75){
      backgroundProjectile.color = 'rgba(6, 134, 165, 0)';
    }
    else if (dist < 125){
      backgroundProjectile.color = 'rgba(6, 134, 165, 1)';
    }
    else{
      backgroundProjectile.color = 'rgba(3, 67, 165, 0.1)';
    }
    backgroundProjectile.draw();
  })
  moneyText.innerText = `Money: ${money}$`
  particles.forEach((particle, index) =>{
    if(particle.alpha <= 0){
      particles.splice(index, 1);
    }
    else{
      particle.update();
    }
  
  })
  Buttons.forEach((button, index)=>{
    button.update();
  })

  projectiles.forEach((projectile, index) => {
      projectile.draw();
      projectile.update()
      setTimeout(()=>{
        if((projectile.x - projectile.radius < 0 || projectile.x + projectile.radius >= canvas.width ||
          projectile.y + projectile.radius >= canvas.height || projectile.y - projectile.radius <= 0)){
          if(projectile.ricochet > 0){
            if(projectile.x - projectile.radius < 0 || projectile.x + projectile.radius >= canvas.width){
              projectile.velocity.x *= -1;
            }
              else{
                projectile.velocity.y *= -1;
              }
              projectile.ricochet -= 1;
            
          }
          else{
            projectiles.splice(index, 1)
          }
          

        }

      })

  })
  
  enemies.forEach((enemy, index) => {
    enemy.draw()
      enemy.update()

      const dist = Math.hypot(newplayer.x - enemy.x, newplayer.y - enemy.y)
      if(dist - enemy.radius - newplayer.size <= 0){
        setTimeout(()=>{
          newplayer.hp -= enemies[index].hp;
          canvas.animate(screenShake, screenShakeTiming);
          playerHit.play();
          enemies.splice(index, 1);
          if(newplayer.hp <= 0){
            gsap.to(currentHalth, {
              height: 1,
            })
            clickSound = false;
            previousScore.innerHTML = score
            startMenu.style.display = 'flex';
            let gameover = new Audio('gameover.mp3');
            gameover.play();
            cancelAnimationFrame(animationId);
            backgroudnMusic.pause();
            
          }
        }, 0)
      }

      projectiles.forEach((projectile, projectileIndex) =>
      {
        const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

        if(dist - enemy.radius - projectile.radius  < 1){
          let random = Math.random() < 0.5 ? -1 : 1;
          for(let i = 0; i <enemy.radius * 2; i++){
            particles.push(new Particle(projectile.x, projectile.y, Math.random() * 3, enemy.color, {x:(Math.random() - 0.5) * 8, y:(Math.random() - 0.5) * 8}))
          }
          setTimeout(()=>{
            if(enemies[index].hp < newplayer.damage){
              enemies[index].hp = 0;
            }
            else{
              enemies[index].hp -= newplayer.damage;
            }
            let hitsound = new Audio('hit.mp3');
            hitsound.volume = 0.15;
            hitsound.play()
            uiText.push(new UIText(Math.trunc(enemies[index].x), Math.trunc(enemies[index].y), "30px serif", "white"));
            score += 25;
            money+=25;
            gsap.to(enemy, {
              radius:Math.trunc((15 * (enemy.hp))/3 + 7)
            })
            enemies[index].update();
            if(enemies[index.hp === 0])
            {

              deathsound.volume = 1;
              deathsound.play()
              enemies.splice(index, 1);
            }
            projectiles.splice(projectileIndex, 1)
          }, 0)

        }
      })
      
  })

  uiText.forEach((element, index)=>{
    element.draw();
    if(uiText[index].opacity <= 0){
      uiText.splice(index, 1);
    }
  })


  gsap.to(currentHalth, {
    width: canvas.width * Math.round((newplayer.hp / newplayer.maxHp) * 10) / 10,
  })

  gsap.to(currentHalth, {
    color: `rgba(0, 255, 0, ${1 * Math.round((newplayer.hp / newplayer.maxHp) * 10) / 10})`,
  })
  maxHealth.color = "red";
  maxHealth.draw();
  currentHalth.draw();
  scoreEl.innerHTML = score;
} 

setInterval(()=>{
  spawnMultiplier += 100;
},5000);

setInterval(()=>{
  speedMultiplier += 0.05;
},5000);

setInterval(()=>{
  healthMultiplier += 1;
},30000);


function shoot(x, y)
    {

}

function random_rgba() {
  var o = Math.round, r = Math.random, s = 255; 
  return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s)+ ')';
}


function spawnEnemies(){
    setInterval(() =>{

      let hp = Math.trunc((Math.random() * (5 - 1)) + 1) + healthMultiplier;
      let radius = Math.trunc((15 * (hp))/3 + 10);
      let random = Math.random() * 100;


      
      let x;
      let y;

      if(Math.random() < 0.5){
        x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
        y = Math.random() * canvas.height;
      }
      else{
        x = Math.random() * canvas.width
        y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
      }

        
      const color = 'green'
      const angle = Math.atan2(newplayer.getY() - y, newplayer.getX() - x);

      const velocity = {
          x: Math.cos(angle),
          y: Math.sin(angle),
      }

      
      var rgbColor = `hsl(${Math.random() * 360}, 50%, 50%)`;

      if((random + globaltimer) >= 65){
        globaltimer = 0;
        enemies.push(new FastEnemy(x, y, rgbColor, hp, this.velocity))
      }
      else{
        enemies.push(new CommonEnemy(x, y, rgbColor, hp, this.velocity))
      }
      
  }, 1000 - spawnMultiplier);
}

const throttle = (func, limit) => {
    let lastFunc
    let lastRan
    return function() {
      const context = this
      const args = arguments
      if (!lastRan) {
        func.apply(context, args)
        lastRan = Date.now()
      } else {
        clearTimeout(lastFunc)
        lastFunc = setTimeout(function() {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args)
            lastRan = Date.now()
          }
        }, limit - (Date.now() - lastRan))
      }
    }
  }



window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);



// canvas.addEventListener('click', throttle((event) => {
//   let temp = 50;
//   const angle = Math.atan2(event.clientY - newplayer.getY(), event.clientX - newplayer.getX());

//   const velocity = {
//       x: Math.cos(angle) * 9,
//       y: Math.sin(angle) * 9,
//   } 
//   for(let i = 0; i < multishot; i++){
//     setTimeout(() => {
//       projectiles.push(
//         new Projectile(newplayer.getX(), newplayer.getY(), 5, 'white', 'normal', velocity, newplayer.ricochet),
//     )
//     temp +=100;
//     }, temp);
//   }

// }, newplayer.attackSpeed), true);

canvas.addEventListener('click', (event) => {
  let shootsound = new Audio('shoot.mp3');
  const angle = Math.atan2(event.clientY - newplayer.getY() + Math.trunc((Math.random() * 200) - 100), event.clientX - newplayer.getX() + Math.trunc((Math.random() * 200) - 100));
  
  shootsound.volume = 0.025;
  const velocity = {
      x: Math.cos(angle) * 9,
      y: Math.sin(angle) * 9,
  } 
  projectiles.push(
      new Projectile(newplayer.getX(), newplayer.getY(), 5, 'white', 'normal', velocity, newplayer.ricochet),
  )
  if(clickSound == true){
    shootsound.play()
  }


}, true);

let gameTimer = setInterval(()=>{
  globaltimer += 1;
  seconds += 1;
  if(seconds >= 60){
    seconds = 0;
    minutes += 1;
  }
  score += 1;
}, 1000)

startGameButton.addEventListener('click', (event)=>{
    startSound.play();
    setTimeout(()=>{
      seconds = 0;
      clickSound = true;
      backgroudnMusic.play();
      init();
      animate();
      spawnEnemies();
      startMenu.style.display = 'none';
    }, 500)


})




document.getElementById("heal").addEventListener("click", ()=>{
  if(money >= heal.price){
    money = money - heal.price;
    heal.price = Math.trunc(heal.price * heal.priceModifier);
    newplayer.hp = newplayer.maxHp
    powerup.play();
  }
})

document.getElementById("healthup").addEventListener("click", ()=>{
  if(money >= healthUp.price){
    money = money - healthUp.price;
    healthUp.price = Math.trunc(healthUp.price * healthUp.priceModifier);
    newplayer.maxHp += 1;
    powerup.play();

  }
})

document.getElementById("damage").addEventListener("click", ()=>{
  if(money >= damageUp.price){
    money = money - damageUp.price;
    damageUp.price = Math.trunc(damageUp.price * damageUp.priceModifier);
    newplayer.damage += 1;
    powerup.play();
  }
})

document.getElementById("ricochet").addEventListener("click", ()=>{
  if(money >= heal.price){
    money = money - ricochetUp.price;
    ricochetUp.price = Math.trunc(ricochetUp.price * ricochetUp.priceModifier);
    newplayer.ricochet += 1; 
    powerup.play();
  }
})

document.getElementById("attackspeed").addEventListener("click", ()=>{
 
  
  if(money >= attackSpeedUp.price){
    money = money - attackSpeedUp.price;
    attackSpeedUp.price = Math.trunc(attackSpeedUp.price * attackSpeedUp.priceModifier);
    velocityMultiplier += 0.1;
    powerup.play();
  }

})



function init(){
  score = 0;
  globaltimer = 0;
  newplayer = new Player(x, y, 9, 'white', 0, 0, 10)

  maxHealth = new UIElemt(0, canvas.height - 30, canvas.width, 30, "red");
  
  currentHalth = new UIElemt(0, canvas.height - 30, canvas.width, 30, "green");
  
  projectiles = [];
  
  enemies = [];
  
  particles = [];

  money = 0;
  
  uiElements = [maxHealth, currentHalth];

  uiText = [];

  healthUpPrice = 500;
  healPrice = 100;
  damagePrice = 500;
  ricochetPrice = 400;
  attackSpeedPrice = 300;

  speedMultiplier = 1;

  spawnMultiplier = 1;

  healthMultiplier = 0;

  score = 0;

  heal = new Button(100, 1.10, newplayer.hp, newplayer.maxHp - newplayer.hp, healButton, `Regen health:`);
  healthUp = new Button(500, 1.25, newplayer.maxHp, 1, healthUpButton, `Health Up:`);
  damageUp = new Button(500, 1.25, newplayer.damage, 1, damageUpButton, `Damage Up:`);
  attackSpeedUp = new Button(400, 1.25, newplayer.attackSpeed, -50, attackSpeedUpButton, `Speed Up:`);
  ricochetUp = new Button(300, 1.25, newplayer.ricochet, newplayer.maxHp - newplayer.hp, ricochetUpButton, `Wall ricochet:`);
  
}