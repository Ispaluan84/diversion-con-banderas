// llamar al fetch (https://restcountries.com/v3/all)
//Ordenar las banderas alfabeticamente
//Al clickar alguna bandera, ventana flotante con info del Pais.(bandera,capital,población,lado por el que se circula)

const countriesList = document.getElementById('countries-list');

async function banderas() {
    try {
        const response = await fetch('https://restcountries.com/v3/all');
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
            countriesList.innerHTML +=`
            <p>${pais.flags}</p>
            <h2>${pais.name.official}</h2>`
            
        });
    } catch (error) {
        console.log('Error al cargar', error)

    }
}

banderas() 

