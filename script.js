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
// Adiciona o evento de toque para dispositivos móveis
// Adiciona um ouvinte de eventos de toque ao canvas
canvas.addEventListener("touchstart", onTouchStart);

// Função para lidar com o toque
function onTouchStart(event) {
    // Obtém as coordenadas do toque em relação ao canvas
    var touchY = event.touches[0].clientY - canvas.offsetTop;
    
    // Atualiza a posição Y do objeto (supondo que 'bY' seja a posição Y do objeto)
    bY = touchY - 26;
    
    // Toca o som de voo (supondo que 'fly' seja o objeto de áudio)
    fly.play();
}

 document.addEventListener("keydown",flying);
 //flying
 function flying(){
    bY = bY - 26;
    fly.play();
 }

function jogo(){
    //background game
    ctx.drawImage(bg,0,0) //drawImage (image,x,y)

    //creating pipes
    for(let i = 0; i< pipe.length; i++){
        //pipes position
        constant = pipeup.height + spacePipes;
        //pipe up settings
        ctx.drawImage(pipeup, pipe[i].x , pipe[i].y);

        //pipe down setting
        ctx.drawImage(pipedown, pipe[i].x, pipe[i].y + constant);

        //pipes moving
        pipe[i].x = pipe[i].x - 1;

        //creating new pipes
        if(pipe[i].x == 125){
            pipe.push({
                x : canvas.clientWidth,
                y: Math.floor(Math.random()*pipeup.height)-pipeup.height
            });
        }

        //birds between the edges of the pipe
        if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeup.width
            //bird collides with the pipe
            && (bY <= pipe[i].y + pipeup.height || bY+bird.height >= pipe[i].y+constant)
             //bird collides with the floor
             || bY >= canvas.height - floor.height && bY + bird.height <= canvas.height){
                location.reload();
            }
            

          //points
          if(pipe[i].x == 5){
            score = score + 1;
            scoreAudio.play();
          }

    }

    //drawing floor
    ctx.drawImage(floor,0,canvas.height - floor.height);

    //drawing bird
    ctx.drawImage(bird ,bX ,bY );
    bY += gravity;

    //creating points
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("score: " + score, 10, canvas.height-20);

    requestAnimationFrame(jogo);

};
jogo();