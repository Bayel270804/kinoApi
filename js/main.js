const baseURL = 'https://kinopoiskapiunofficial.tech/api/'
const key = 'a504baa9-5936-42a3-a298-60e844f2ddf7'
const GET_ALL_FILMS = baseURL + 'v2.2/films'
const GET_BY_NAME = baseURL + 'v2.1/films/search-by-keyword?keyword='
const GET_BY_ID = baseURL + 'v2.2/films/'
const GET_BY_PREMIERS = baseURL + `v2.2/films/premieres?year=${new Date().getFullYear()} &month=JANUARY`

const form = document.querySelector('form')
const input = document.querySelector('#inp')
const btn = document.querySelector('button')
const output = document.querySelector('.output')
const button = document.querySelector('#btn')


const getAllFilms = async () => {
    const req = await fetch(GET_ALL_FILMS, {
        method: 'GET',
        headers: {
            'X-API-KEY': key,
            'Content-Type': 'application/json',
        }
    })
    const res = await req.json()
    renderFilms(res.items);
}

// const getByName = () => {
//     fetch(GET_BY_NAME + input.value, {
//         method: 'GET',
//         headers: {
//             'X-API-KEY': key,
//             'Content-Type': 'application/json',
//         },
//     })
//         .then(res => res.json())
//         .then(data => renderFilms(data.items))
//         .catch(err => console.log(err))
// }

const getByName = async () => {
    const req = await fetch(GET_BY_NAME + input.value, {
        method: 'GET',
        headers: {
            'X-API-KEY': key,
            'Content-Type': 'application/json',
        }
    })
    const res = await req.json()
    renderFilms(res.films);
}

const getById = async (id) => {
    const req = await fetch(GET_BY_ID + id, {
        method: 'GET',
        headers: {
            'X-API-KEY': key,
            'Content-Type': 'application/json',
        }
    })
    const res = await req.json()
    renderById(res);

}

const getPremiers = async () => {
    const req = await fetch(GET_BY_PREMIERS, {
        method: 'GET',
        headers: {
            'X-API-KEY': key,
            'Content-Type': 'application/json',
        }
    })
    const res = await req.json()
    renderFilms(res.items);
}

const renderById = (film) => {
    output.innerHTML = ''
    console.log(film);
    const box = document.createElement('div')
    const img = document.createElement('img')
    img.src = film.posterUrlPreview
    const title = document.createElement('h3')
    title.textContent = film.nameRu ? film.nameRu : film.nameOriginal
    const description = document.createElement('p')
    description.textContent = film.description
    const year = document.createElement('h3')
    year.textContent = `Год выпуска: ${film.year}`
    const type = document.createElement('h4')
    type.textContent = `Жанр: ${film.type}`


    box.append(img, title, description, year, type)
    output.append(box)

}

const renderFilms = (data) => {
    output.innerHTML = ''
    console.log(data);
    data.map(el => {
        const card = document.createElement('div')
        card.classList.add('card')
        const img = document.createElement('img')
        img.classList.add('image')
        card.append(img)
        for (let key in el) {
            if (key.includes('name') && el[key] !== null && el[key] !== '') {
                const title = document.createElement('h4');
                title.textContent = el[key]
                card.append(title)

            }
        }
        img.src = el.posterUrlPreview

        card.addEventListener('click', () => getById(el.kinopoiskId || el.filmId))


        output.append(card)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    getByName()
    input.value = ''
})

button.addEventListener('click', () => {
    getPremiers();
})




getAllFilms()