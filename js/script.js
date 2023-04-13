const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const chao = document.querySelector('.chao');
const reset = document.getElementById('reiniciar');
const score = document.getElementById('score');
const animacaoScore = document.querySelector('#score');
const dev = document.querySelector('.dev');
const pular = document.getElementById('pular');

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
    
    pular.setAttribute('disabled', true);
    // mario.style.animation = 'none';

    // let marioBottom = mario.style.bottom;
    // marioBottom = `${marioPosition}px`;
    // console.log(`${marioBottom}`);


    mario.style.bottom = `${marioPosition}px`;

    mario.src = './img/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '45px';

    chao.style.animation = 'none';
    chao.style.backgroundPosition = `${chaoNum}`;

    animacaoScore.style.animation = 'score 1s infinite';

    dev.style.display = 'inline';
    reset.style.display = 'inline';
    clearInterval(loop);
    clearInterval(loopPontos);
}
/**/

const originalMario = {
    animation: 'animation: jump-mario 500ms ease-out',
    bottom: '84px',
    src: './img/mario.gif',
    width: '150px',
    marginLeft: '0px'
}

const originalPipe = {
    left: '166vh',
    animation: 'pipe-animation 1.5s infinite linear'
}

const originalChao = {
    animation: 'floor 1.23s infinite linear',
    backgroundPosition: 'background-position: 43px;'
}

const originalBotao = {
    innerHTML : ''
}

const resetGame = () => {
    // redefine os valores do Mario
    
    pular.removeAttribute('disabled');
    // mario.style.animation = originalMario.animation;

    // o problema ta aqui
    mario.style.bottom = originalMario.bottom;
    console.log( mario.style.bottom);

    mario.src = originalMario.src;
    mario.style.width = originalMario.width;
    mario.style.marginLeft = originalMario.marginLeft;

    // redefine os valores do cano
    pipe.style.animation = originalPipe.animation;
    pipe.style.left = originalPipe.left;

    // redefine os valores do chão
    chao.style.animation = originalChao.animation;
    chao.style.backgroundPosition = originalChao.backgroundPosition;

    // redefine o score
    pontos = 0;
    score.innerText = 'Score: 0';
    animacaoScore.style.animation = '';

    // esconde o botão de reiniciar e o texto do desenvolvedor
    dev.style.display = 'none';
    reset.style.display = 'none';

    // reinicia os loops do jogo
    loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        
        const chaoPosition = window.getComputedStyle(chao).backgroundPosition.replace('px', '');
        const chaoPositionSemPX = chaoPosition.replace('%', '');
        const chaoNum = parseFloat(chaoPositionSemPX);
        
    
        if(pipePosition <= 120 && pipePosition > 0 && marioPosition< 170) {
            gameOver(pipePosition, marioPosition, chaoNum);
        }
    }, 10);

    loopPontos = setInterval(() => {
        pontos++;
        score.innerText = `Score: ${pontos}`
    },100);
};


/**/

let pontos = 0;
let loopPontos = setInterval(() => {
    pontos++;
    score.innerText = `Score: ${pontos}`
},100);

document.getElementById('pular').addEventListener('click', jump );
document.getElementById('reiniciar').addEventListener('click', resetGame);