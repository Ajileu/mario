const play = document.querySelector('#play')
const reset = document.querySelector('#game-over')
const pipe = document.querySelector('#pipe')
const mario = document.querySelector('#mario')
const nuven = document.querySelector('#nuvens')
const pontos = document.querySelector('#pontos')
const parabens = document.querySelector('#ponto-max')
const game_over_pontos = document.querySelector('#game-over_pontos')
const auto_matico = document.querySelector('#auto')
const game = document.querySelector('#game')
const recorde = document.querySelector('#recorde')

let score = 0

let score_record = JSON.parse(localStorage.getItem('recorde') || 0)

recorde.innerHTML = `Recorde : ${score_record}`

const responsivo = () => {
    const pipeResponsivo = +window.getComputedStyle(pipe).width

    const verificacao = setInterval(() => {
        if(pipeResponsivo == game/10){
            pipe.classList.remove('animar-pipe')
            pipe.classList.add('animar-pipe-respossivo') 
        }
    },10)
}

const iniciar = () => {
    play.style.display = 'none'
    pipe.classList.add('animar-pipe')
    mario.style.display = 'block'
    nuven.classList.add('animar-nuven')

    const pontuacao = setInterval(() => {
        const pipePosition = pipe.offsetLeft
        const marioPosition  = +window.getComputedStyle(mario).bottom.replace('px', '')
    
        if(pipePosition < 111  && pipePosition > 0 && marioPosition < 83){
            clearInterval(pontuacao)
        }

        if(score < 1000){
            score++
            pontos.innerHTML = `${score}`
        }

        if(score == 10000){
            parabens.style.display = 'block'
            
            mario.style.display = 'none'

            pipe.style.display = 'none'

            nuven.style.animation = 'none'

            reset.style.display = 'block'
        }
    },80)

    
}

const pular = () => {
    mario.classList.add('animar-mario')

    setTimeout(() => {
        mario.classList.remove('animar-mario')
    },500)
}


const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft
    const marioPosition  = +window.getComputedStyle(mario).bottom.replace('px', '')

    if(pipePosition < 111  && pipePosition > 0 && marioPosition < 83){
        pipe.classList.remove('animar-pipe')
        pipe.style.left = `${pipePosition}px`

        mario.style.animation = 'none'
        mario.style.bottom = `${marioPosition}px`

        nuven.style.animation = 'none'

        mario.src = './img/game-over.png';
        mario.style.width = '10%';
        mario.style.marginLeft = '0px'
        
        reset.style.display = 'block'

        game_over_pontos.style.display = 'block'
        game_over_pontos.innerHTML = `Sua pontuação foi: ${score}`

        if(score > score_record){
            localStorage.setItem('recorde', JSON.stringify(score))
            alert('Novo recorde!')
        }

        clearInterval(loop)
    }
},10)




play.addEventListener('click', iniciar)
 
document.addEventListener('click', pular)
document.addEventListener('keydown', (event)=>{
    if(event.keyCode == 32 || event.keyCode == 38 || event.keyCode == 87){
        pular()
    }
})

reset.addEventListener('click', () => {
    location.reload()
})





