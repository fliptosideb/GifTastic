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
                let rate = r.data[i].rating
                let boxElem = document.createElement("div")
                boxElem.style.display = 'inline-block'
                boxElem.setAttribute('id', 'rating')
                boxElem.innerHTML = `
                <p>Rating: ${rate}</p>
                <img id="gif" src="${still}" data-still="${still}" data-animated="${animated}">
                `
                document.querySelector('#gifDiv').append(boxElem)
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