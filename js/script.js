// llamar al fetch (https://restcountries.com/v3/all)
//Ordenar las banderas alfabeticamente
//Al clickar alguna bandera, ventana flotante con info del Pais.(bandera,capital,población,lado por el que se circula)

const countriesList = document.getElementById('countries-list');
const url = 'https://restcountries.com/v3/all';
const info = document.getElementById('info');

const getCountries = async () => {
    try{
    const response =await fetch(url)
    if(!response.ok) {
        throw new Error(`Error: ${response.status}`)
    }
    const countries = await response.json()
    sortedCountries(countries)
    countriesList.innerHTML = countryArray(countries).join("")

    const cards = document.querySelectorAll(".card")

    cards.forEach((card, index) => {
      card.addEventListener("click", () => {
        const country = countries[index]
        const { name: {common}, flags, capital, population, car: {side} } = country
        const template = `
          <div class="cardInfo">
            <img src=${flags[1]} alt=${common}/>
            <h2>${common}</h2>
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Población:</strong> ${population}</p>
            <p><strong>Lado Conducción:</strong> ${side}</p>
            <button onclick="closeInfo()">Cerrar</button>
          </div>
        `
        info.innerHTML = template
        info.classList.add("visible")

      })

    })

    }catch (err) {
        console.error(err)
    }
}

getCountries()

const closeInfo = () => {
    info.innerHTML = ""
    info.classList.remove('visible')
}

const templateCard = (name, flag) => {
    const template =`
        <div class="card">
        <img src=${flag[1]} alt=${name}/>
        <h2>${name}</h2>
        </div>
        `
    return template
}

const countryArray = (countries) => {
    const allCountries = countries.map(country => {
        const {name: {common}, flags, capital, population, car: {side}} = country
        return templateCard(common,flags, capital, population, side)
    })
    return allCountries
}

 const sortedCountries = (countries) => {
    countries.sort((a, b) => {
        const nameA = a.name.common.toUpperCase()
        const nameB = b.name.common.toUpperCase()
        return nameA.localeCompare(nameB)
    })
 
}



