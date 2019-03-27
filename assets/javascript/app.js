var topics = ['Basketball', 'Dogs', 'Music', 'Food', 'Cars', 'Insects'];

function add() {
    for (var i = 0; i < topics.length; i++) {
        document.getElementById("btn").innerHTML += `<button class="topics" data-topics="${topics[i]}">` + topics[i] + `</button>`
    }
}

add();


document.querySelector('#submit').addEventListener('click', e => {
    e.preventDefault()
    if (document.querySelector('#new').value === '') {
        null
    } else {
    topics.push(document.querySelector('#new').value)
    document.getElementById("btn").innerHTML = ''
    document.querySelector('#new').value = ''
    add()
    }
})

let toggle = false

document.addEventListener('click', ({ target }) => {
    if (target.className === 'topics') {
        let { topics } = target.dataset
        fetch(`http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=${topics}&limit=10`)
            .then(r => r.json())
            .then(r => {
                document.querySelector('#gifDiv').innerHTML = ''
                for (let i = 0; i < 10; i++) {
                let still = r.data[i].images.fixed_height_still.url
                let animated = r.data[i].images.fixed_height.url
                let rate = `Rating: ${r.data[i].rating}`
                let boxElem = document.createElement("div")
                boxElem.setAttribute('id', 'rating')
                document.querySelector('#gifDiv').append(boxElem)
                let gifElem = document.createElement('img')
                gifElem.setAttribute('id', 'gif')
                gifElem.setAttribute('src', `${still}`)
                gifElem.setAttribute('data-still', `${still}`)
                gifElem.setAttribute('data-animated', `${animated}`)
                document.createElement("br")
                document.querySelector('#gifDiv').append(gifElem)
                document.querySelector('#gifDiv').append(rate)
        }   
        })
    
            .catch(e => console.error(e))
    } else if (target.id === 'gif') {
        toggle = !toggle
        let { still, animated } = target.dataset
        if (toggle) {
            target.setAttribute('src', animated)
        } else {
            target.setAttribute('src', still)
        }
    }
})