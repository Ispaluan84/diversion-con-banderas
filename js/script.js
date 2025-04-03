// llamar al fetch (https://restcountries.com/v3/all)
//Ordenar las banderas alfabeticamente
//Al clickar alguna bandera, ventana flotante con info del Pais.(bandera,capital,población,lado por el que se circula)

const countriesList = document.getElementById('countries-list');
const url = 'https://restcountries.com/v3/all';


async function banderas() {
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error ('No hemos podido cargar la página', response.status)
        }
        
        const pais = await response.json();
        const bandera = pais.filter((pais) => pais.name );
        bandera.sort(function (a, b) {
            if (a.name.official > b.name.official) {
                return 1;
            } 
            if (a.name.official < b.name.official) {
                return -1;
            }
            return 0;
        });
        bandera.forEach((pais) => {
            const {side} = pais.car;
            const infoBandera = {
                ...pais,
                car: `${side}`,
            }
            const {flag, capital, population, car} = infoBandera
            countriesList.innerHTML +=`
            <ul>
              <li>
                <img src="${pais.flags[1]}" alt="${pais.name.official}"/>
                <h2>${pais.name.official}</h2>
              </li>
            </ul>`
            countriesList.addEventListener('click', (event) => {
                if (event.target.tagName === 'IMG') {
                    window.open()
                }
            })
        });
        
        } catch (error) {
        console.log('Error al cargar', error)
        } 
}

banderas()


