const canvas = document.getElementById('canvas');
const cxt = canvas.getContext('2d');




canvas.width = window.innerWidth * 0.80;
canvas.height = window.innerHeight;

var projectileVelocity = 9;

var projectileDamage = 1;

var attackSpeed = 1000;

var money = 100;

class Player {
    constructor(x, y, size, color, speedX, speedY, hp){
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.hp = hp;
        this.color = color;

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
    constructor(x, y, radius, color, type, velocity){
        this.x = x;
        this.y = y;
        this.type = type;
        this.color = color;
        this.radius = radius;
        this. velocity = velocity;
        
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

class Enemy{
    constructor(x, y, color, hp, velocity){
      this.x = x;
      this.y = y;
      this.hp = Math.trunc((Math.random() * (6 - 3)) + 3);
      this.radius = Math.trunc((15 * (this.hp))/3 + 10);
      this.velocity = velocity;
      this.trueHp = hp;
      this.color = color;
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
    console.log("amogus")
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


function animate(){

  animationId = requestAnimationFrame(animate);
  cxt.fillStyle = 'rgba(0,0,0,0.15)'
  cxt.fillRect(0, 0, canvas.width, canvas.height);
  newplayer.draw();
  newplayer.update();
  createBackground();
  background.forEach((backgroundProjectile, index) =>{
    const dist = Math.hypot(newplayer.x - backgroundProjectile.x, newplayer.y - backgroundProjectile.y)
    if(dist < 75){
      backgroundProjectile.color = 'rgba(3, 67, 165, 0)';
    }
    else if (dist < 125){
      backgroundProjectile.color = 'rgba(3, 67, 165, 1)';
    }
    else{
      backgroundProjectile.color = 'rgba(3, 67, 165, 0.1)';
    }
    backgroundProjectile.draw();
  })
  particles.forEach((particle, index) =>{
    if(particle.alpha <= 0){
      particles.splice(index, 1);
    }
    else{
      particle.update();
    }

    
  })
  projectiles.forEach((projectile, index) => {
      projectile.draw();
      projectile.update()
      setTimeout(()=>{
        if(projectile.x - projectile.radius < 0 || projectile.x + projectile.radius >= canvas.width ||
          projectile.y + projectile.radius >= canvas.height || projectile.y - projectile.radius <= 0){
          projectiles.splice(index, 1)
          
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

        if(dist - enemy.radius - projectile.radius < 1){

          for(let i = 0; i <enemy.radius * 2; i++){
            particles.push(new Particle(projectile.x, projectile.y, Math.random() * 2, enemy.color, {x:(Math.random() - 0.5) * 8, y:(Math.random() - 0.5) * 8}))
          }
          setTimeout(()=>{
            enemies[index].hp -= projectileDamage;
            gsap.to(enemy, {
              radius:Math.trunc((15 * (enemy.hp))/3 + 10)
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

      let hp = Math.trunc((Math.random() * (5 - 1)) + 1) * 3;
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

      
      // var rgbColor = `hsl(${Math.random() * 360}, 50%, 50%)`;
      enemies.push(new Enemy(x, y, 'rgb(106, 1, 1)', hp, this.velocity))
  }, 1000)
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
      x: Math.cos(angle) * projectileVelocity,
      y: Math.sin(angle) * projectileVelocity,
  } 

  projectiles.push(
      new Projectile(newplayer.getX(), newplayer.getY(), 5, 'white', 'normal', velocity),

  )
}, attackSpeed), true);

spawnEnemies();
animate();




