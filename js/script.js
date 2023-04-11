const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const chao = document.querySelector('.chao');

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {

        mario.classList.remove('jump');

    }, 500);
}

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const chaoPosition = chao.backgroundPosition;

    console.log(chaoPosition);

    if(pipePosition <=120 && pipePosition > 0 && marioPosition< 170) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`
        
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        
        
        mario.src = './img/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '45px';

        chao.style.animation = 'none';
        chao.style.backgroundPosition = `${chaoPosition}`;

        clearInterval(loop);
    }

}, 10);

document.addEventListener('keydown', jump);