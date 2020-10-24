document.addEventListener('DOMContentLoaded', () => {
const dino = document.querySelector('.dino')
const grid = document.querySelector('.grid')
const alert = document.getElementById('alert')
let isJumping = false
let gravity = 0.9
let isGameOver = false

function control(e) {
    //https://keycode.info/
    if (e.keyCode === 32) {
        if (!isJumping) {
            isJumping = true
            jump()
        }
        
    }
}

document.addEventListener('keyup', control)

let position = 0

function jump() {
let count = 0
let timerId = setInterval(function () {

    //move down
    if (count === 15) {
        clearInterval(timerId)
        console.log('down')
        let downTimerId = setInterval(function() {
            if (count === 0) {
                clearInterval(downTimerId)
                isJumping = false
            }
            position -= 5
            count--
            position = position * gravity
            dino.style.bottom = position + 'px'
        },20)
    }
    //move up
    console.log('up')
    position += 30
    count++
    position = position * gravity
    dino.style.bottom = position + 'px'
    console.log(dino.style.bottom)
}, 20)
}

function generateCactus() {
    let randomTime = Math.random() * 4000 
    let cactusPostion = 1000
    const cactus = document.createElement('div')
    if (!isGameOver) cactus.classList.add('cactus')
    grid.appendChild(cactus)
    cactus.style.left = cactusPostion + 'px'
    
    let timerId = setInterval(function() {
        if (cactusPostion === 0 && cactusPostion < 60 && position < 60) {
            clearInterval(timerId)
            alert.innerHTML = 'Game Over'
            isGameOver = true
            while (grid.firstChild) {
                grid.removeChild(grid.lastChild)
            }
        }
        cactusPostion -=10
        cactus.style.left = cactusPostion + 'px'
    },20)
    if (!isGameOver) setTimeout(generateCactus, randomTime)
}
 generateCactus()
})