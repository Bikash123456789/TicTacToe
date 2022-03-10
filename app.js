const X_CLASS='x';
const CIRCLE_CLASS='circle';
const click = new Audio('move.mp3');
const gameOver = new Audio('gameover.mp3');
const cellElements = document.querySelectorAll('.cell');
const board= document.querySelector('.board');
const mess = document.querySelector('.winning-message');
const message = document.querySelector('.winning-text');
const button = document.getElementById('restart');
const WINNING_COMBINATIONS=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [2,5,8],
    [0,4,8],
    [2,4,6],
    [1,4,7]
]
let turn='circle';

startGame();
button.addEventListener('click', startGame)

function startGame(){

    reset();
    cellElements.forEach(cell=>{
        cell.addEventListener('click', handleClick, {once:true})
    })
    
}




function handleClick(e){
    let currentClass;
    const cell=e.target;
    click.play();
    if(turn==='circle'){
        currentClass=CIRCLE_CLASS;
    }
    else{
        currentClass=X_CLASS;
    }
    setHover(currentClass);
    //placingthemark
    placeMark(cell,currentClass);
    console.log(currentClass);
    //checkWin
    if(isCheckWin(currentClass)){
        gameOver.play();
        message.innerText=`${currentClass} is Winner`;
        mess.classList.add('show');
    }

    //isDraw
    if(isDraw()){
        
        message.innerText=`DRAW`;
        mess.classList.add('show');
    }

    //swappingTurns
    swap(currentClass);
    currentClass=turn;

    //setHover
    setHover(currentClass);
}

//PLACEMARKFUNCTION
function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
}

//SWAP
function swap(currentClass){
    if(currentClass===CIRCLE_CLASS){
        turn=X_CLASS;
    }
    else{
        turn=CIRCLE_CLASS;
    }
}

//setHover
function setHover(currentClass){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    board.classList.add(currentClass);
}


//CheckWIN
function isCheckWin(currentClass){
    return WINNING_COMBINATIONS.some(cell=>{
        return cell.every(index=>{
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function isDraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(CIRCLE_CLASS) || cell.classList.contains(X_CLASS);
    })
}

function reset(){
    mess.classList.remove('show');
    cellElements.forEach(cell=>{
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
    }

    )
        board.classList.remove(X_CLASS);
        board.classList.remove(CIRCLE_CLASS);
       

}