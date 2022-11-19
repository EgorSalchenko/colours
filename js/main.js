const columns = document.querySelectorAll('.column')

document.addEventListener('keydown', (event) => {
    event.preventDefault()
    if (event.code.toLowerCase() == 'space'){
        setRandomColors()

    }
})

document.addEventListener('click', event =>{
    const type = event.target.dataset.type

    if (type == 'lock'){
        const node = event.target.tagName.toLowerCase() == 'i'
        ? event.target : event.target.children[0]

    node.classList.toggle('fa-lock-open')
    node.classList.toggle('fa-lock')
    }else if (type == "copy"){
        copyText(event.target.textContent)
    }
})

function copyText(text){
    navigator.clipboard.writeText(text)
}


function generateRandomColor(){
    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for(let i = 0; i<6; i++){
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

function setRandomColors(){
    const colors = [];

    columns.forEach((column) => {
        const isLocked = column.querySelector('i').classList.contains('fa-lock')
        const text = column.querySelector('h2')
        const button = column.querySelector('button')
        const color = generateRandomColor();

        if (isLocked){
            color.push(text.textContent)
            return
        }

        colors.push(color)

        text.textContent = color
        column.style.background = generateRandomColor()

        setTextColor(text, color);
        setTextColor(button, color);
    })

    updateColorsHash(colors)
}
function setTextColor(text, color){
    const luminance = chroma(color).luminance()
    text.style.color = luminance >= 0.5 ? 'black' : 'white'
}
function updateColorsHash(colors = []){
    document.location.hash = colors
    .map((column)=>{
            return column.toString().substring(1)
        })
        .join('-')
} 

function getColorsFromHash(){
    if (document.location.hash.langh > 1) {
        return document.location.hash
            .substring(1)
            .split('-')
            .map((color) => '#' + color)
    }
    return[]
}


setRandomColors()
