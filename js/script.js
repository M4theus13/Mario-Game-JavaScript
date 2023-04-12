const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const chao = document.querySelector('.chao');
const reset = document.getElementById('reiniciar');
const score = document.getElementById('score');
const animacaoScore = document.querySelector('#score');

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {

        mario.classList.remove('jump');

    }, 500);
}

let loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    
    const chaoPosition = window.getComputedStyle(chao).backgroundPosition.replace('px', '');
    const chaoPositionSemPX = chaoPosition.replace('%', '');
    const chaoNum = parseFloat(chaoPositionSemPX);
    

    if(pipePosition <= 120 && pipePosition > 0 && marioPosition< 170) {
        gameOver(pipePosition, marioPosition, chaoNum);
    }

}, 10);

const gameOver = (pipePosition, marioPosition, chaoNum) => {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`
    
    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;
    
    mario.src = './img/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '45px';

    chao.style.animation = 'none';
    chao.style.backgroundPosition = `${chaoNum}`;
    animacaoScore.style.animation = 'score 1s infinite';
    
    reset.style.display = "inline";
    clearInterval(loop);
    clearInterval(loopPontos);
}


let pontos = 0;
let loopPontos = setInterval(() => {
    pontos++;
    score.innerText = `Score: ${pontos}`
},100);

document.addEventListener('keydown', jump);
document.getElementById('reiniciar').addEventListener('click', () => {
    location.reload();
})