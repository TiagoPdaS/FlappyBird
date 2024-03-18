var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

//upload images
var bird = new Image();
bird.src = "images/bird.png"
var bg =  new Image();
bg.src = "images/bg.png";
var floor =  new Image();
floor.src ="images/floor.png";
var pipeup =  new Image();
pipeup.src = "images/pipeup.png"
var pipedown = new Image();
pipedown.src = "images/pipedown.png"

//variables
var spacePipes = 100 ;
var constant;
var bX = 33;
var bY = 200;
var gravity = 1.4;
var score = 0;
var pipe = [];

pipe[0] = {
    x : canvas.clientWidth,
    y : 0
}

// upload audio
var fly = new  Audio();
fly.src = "sounds/fly.mp3"
var scoreAudio = new  Audio();
scoreAudio.src = "sounds/score.mp3"

 //print Screen
 document.addEventListener("keydown",flying);
 //flying
 function flying(){
    bY = bY - 26;
    fly.play();
 }

function jogo(){
    //background game
    ctx.drawImage(bg,0,0) //drawImage (image,x,y)

    //drawing floor
    ctx.drawImage(floor , 0 ,canvas.height - floor.height);

    //drawing bird
    ctx.drawImage(bird ,bX ,bY );
    bY += gravity;

    requestAnimationFrame(jogo);
}

jogo();