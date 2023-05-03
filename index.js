const canvas = document.getElementById('canvas');
const cxt = canvas.getContext('2d');

const textTimer = document.getElementById('timer')
const moneyText = document.getElementById("money")

const healthUpButton = document.getElementById('maxhealthbutton');
const healButton = document.getElementById('regenbutton');
const damageUpButton = document.getElementById('damagebutton');
const ricochetUpButton = document.getElementById('ricochetbutton');
const attackSpeedUpButton = document.getElementById('attackspeedbutton');

healthUpPrice = 100;
healPrice = 100;
damagePrice = 100;
ricochetPrice = 100;
attackSpeedPrice = 100;


canvas.width = window.innerWidth * 0.80;
canvas.height = window.innerHeight;

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
class Player {
    constructor(x, y, size, color, speedX, speedY, maxHp){
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.hp = maxHp;
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
    this.x += 3;
  }
  else if(this.x + this.size >= canvas.width + 3){
    this.x -= 3;
  }
  else if(this.y + this.size >= canvas.height - 3){
    this.y -= 3;
  }
  else if(this.y - this.size <= this.size){
    this.y += 3;
  }
  if (keyD == true) {
    this.x += 3;
  }
  if (keyS == true) {
    this.y += 3;
  }
  if (keyA == true) {
    this.x -=3;
  }
  if (keyW == true) {
    this.y -= 3;
  }
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
        x: (Math.cos(this.angle) * 3) / (this.hp * 0.8),
        y: (Math.sin(this.angle) * 3) / (this.hp * 0.8),
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
      this.tempX = newplayer.getX() + Math.floor(Math.random() * 200) - 100;
      this.tempY = newplayer.getY() + Math.floor(Math.random() * 200) - 100;
    }
    else if(this.tempX == 0 && this.tempY == 0){
      this.tempX = newplayer.getX() + Math.floor(Math.random() * 200) - 100;
      this.tempY = newplayer.getY() + Math.floor(Math.random() * 200) - 100;
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
        x: (Math.cos(this.angle) * 4) / (this.hp * 0.8),
        y: (Math.sin(this.angle) * 4) / (this.hp * 0.8),
    }
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;

}
}
var tempX = 0;
var tempY = 0;

function createBackground(){
  while(tempY <= canvas.height){
    while(tempX <= canvas.width){
      let temp = new BackgroundProjectile(tempX, tempY, 2, "blue");
      background.push(temp);
      tempX += 50;
    }
    tempX = 0;
    tempY = tempY + 50;
  }

}


const x = canvas.width / 2;
const y = canvas.height / 2;

const newplayer = new Player(x, y, 5, 'white', 0, 0, 10)


const projectiles = [];

const enemies = [];

const particles = [];

const background = [];

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


let animationId;

heal = new Button(100, 1.10, newplayer.hp, newplayer.maxHp - newplayer.hp, healButton, `Regen health:`);
healthUp = new Button(100, 1.25, newplayer.maxHp, 1, healthUpButton, `Health Up:`);
damageUp = new Button(100, 1.25, newplayer.damage, 1, damageUpButton, `Damage Up:`);
attackSpeedUp = new Button(100, 1.25, newplayer.attackSpeed, -50, attackSpeedUpButton, `Attack speed Up:`);
ricochetUp = new Button(100, 1.25, newplayer.ricochet, newplayer.maxHp - newplayer.hp, ricochetUpButton, `Wall ricochet:`);

let Buttons = [heal, healthUp, damageUp, attackSpeedUp, ricochetUp]

function animate(){
  console.log(heal.text)
  animationId = requestAnimationFrame(animate);
  cxt.fillStyle = 'rgba(0,0,0,0.1)'
  cxt.fillRect(0, 0, canvas.width, canvas.height);
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
          enemies.splice(index, 1);
          if(newplayer.hp <= 0){
            cancelAnimationFrame(animationId);
          }
        }, 0)
      }

      projectiles.forEach((projectile, projectileIndex) =>
      {
        const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

        if(dist - enemy.radius - projectile.radius  < 1){
          let random = Math.random() < 0.5 ? -1 : 1;
          for(let i = 0; i <enemy.radius * 2; i++){
            particles.push(new Particle(projectile.x, projectile.y, Math.random() * 2, enemy.color, {x:(Math.random() - 0.5) * 8, y:(Math.random() - 0.5) * 8}))
          }
          setTimeout(()=>{
            enemies[index].hp -= newplayer.damage;
            money+=25;
            gsap.to(enemy, {
              radius:Math.trunc((15 * (enemy.hp))/3 + 7)
            })
            enemies[index].update();
            if(enemies[index.hp === 0])
            {
              enemies.splice(index, 1);
            }
            projectiles.splice(projectileIndex, 1)
          }, 0)

        }
      })
  })


}

function shoot(x, y)
    {

}

function random_rgba() {
  var o = Math.round, r = Math.random, s = 255;
  return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s)+ ')';
}




function spawnEnemies(){
    setInterval(() =>{

      let hp = Math.trunc((Math.random() * (5 - 1)) + 1);
      let radius = Math.trunc((15 * (hp))/3 + 10);
      
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
      enemies.push(new CommonEnemy(x, y, rgbColor, hp, this.velocity))
  }, 500)
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

canvas.addEventListener('click', throttle((event) => {
  const angle = Math.atan2(event.clientY - newplayer.getY(), event.clientX - newplayer.getX());

  const velocity = {
      x: Math.cos(angle) * 9,
      y: Math.sin(angle) * 9,
  } 

  projectiles.push(
      new Projectile(newplayer.getX(), newplayer.getY(), 5, 'white', 'normal', velocity, newplayer.ricochet),

  )
}, newplayer.attackSpeed), true);

spawnEnemies();
animate();
let gameTimer = setInterval(()=>{
  seconds += 1;
  if(seconds >= 60){
    seconds = 0;
    minutes += 1;
  }
  textTimer.innerText = `${minutes} : ${seconds}`
}, 1000)



