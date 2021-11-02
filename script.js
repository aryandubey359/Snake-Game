let direction = {x: 0, y: 0};
let foodsound = new Audio ('food.mp3');
let gameoversound = new Audio ('gameover.mp3');
let movesound = new Audio ('move.mp3');
let playingarea = document.getElementById("playingarea");
let speed = 5;
let lastPaintTime = 0;
let a = 0;
let b = 20;
let scorebody = document.getElementById("score");
let score = 0;
let snake = [
    {x:1, y:1}  
]
let food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};

function collision(snake) { 
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 21 || snake[0].x <=0 || snake[0].y >= 21 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function gameEngine(){
    if(collision(snake)){
        gameoversound.play();
        direction = {x: 0, y: 0};
        speed = 5;
        alert("Game Over. Your score was " + score + ". Press OK to play again!");
        score = 0;
        scorebody.innerHTML = `Score: ${score}`;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
        snake = [
            {x:1, y:1}  
        ]
    }

    if(snake[0].x == food.x && snake[0].y == food.y){
        foodsound.play();
        snake.unshift({x: snake[0].x + direction.x, y: snake[0].y + direction.y})
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
        speed =  speed + 0.5;
        score ++;
        scorebody.innerHTML = `Score: ${score}`;
    }

    for(let i = snake.length - 2; i >= 0; i --){
        snake[i+1] = {...snake[i]};
    }
    snake[0].x = snake[0].x + direction.x;
    snake[0].y = snake[0].y + direction.y;

    playingarea.innerHTML = "";
    snake.forEach((e, index ) => {
        snakeBody = document.createElement('div');
        snakeBody.style.gridRowStart = e.y;
        snakeBody.style.gridColumnStart = e.x;
        if(index === 0){
            snakeBody.classList.add('head')
        }
        else{
            snakeBody.classList.add('snakebody')
        }
        playingarea.appendChild(snakeBody);
    })
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    playingarea.appendChild(foodElement);
}

function displaySnake(){
    playingarea.innerHTML = "";
    snake.forEach((e, index ) => {
        snakeBody = document.createElement('div');
        snakeBody.style.gridRowStart = e.y;
        snakeBody.style.gridColumnStart = e.x;
        if(index === 0){
            snakeBody.classList.add('head')
        }
        else{
            snakeBody.classList.add('snakebody')
        }
        playingarea.appendChild(snakeBody);
    })
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    playingarea.appendChild(foodElement);
}

window.requestAnimationFrame(main);
window.addEventListener("keydown" , e => {  
    switch(e.key)
        {
            case "ArrowUp":
                direction.x = 0;
                direction.y = -1;
                movesound.play();
                break;

            case "ArrowDown":
                direction.x = 0;
                direction.y = +1;
                movesound.play();
                break;    

            case "ArrowLeft":
                direction.x = -1;
                direction.y = 0;
                movesound.play();
                break;

            case "ArrowRight":
                direction.x = +1;
                direction.y = 0;
                movesound.play();
                break;
        }
});