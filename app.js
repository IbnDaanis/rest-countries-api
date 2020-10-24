const main = document.querySelector('main')
const darkButton = document.querySelector('.dark-mode-btn')
const darkButtonIcon = document.querySelector('.dark-mode-btn i')
darkButton.addEventListener('click', e => {
  darkButtonIcon.classList.toggle('fas')
})
const countries = document.querySelector('.countries')

const getCountries = async () => {
  try {
    const fetchAPI = await fetch('https://restcountries.eu/rest/v2/all')
    const data = await fetchAPI.json()
    console.log(data)
    data.forEach(country => {
      const card = `
      <div class="card">
            <div class="flag">
            <img src='${country.flag}'/>
            </div>
            <div class="info">
              <h2 class="country-name">${country.name}</h2>
              <ul class="facts">
                <li><span>Population: </span>${country.population}</li>
                <li><span>Region: </span>${country.region}</li>
                ${country.capital ? `<li><span>Capital: </span>${country.capital}</li>` : ''} 
              </ul>
            </div>
          </div>
     `
      countries.innerHTML += card
    })


  } catch (error) {
    console.error(error)
  }
}

getCountries()

