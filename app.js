const main = document.querySelector('main')
const darkButton = document.querySelector('.dark-mode-btn')
const darkButtonIcon = document.querySelector('.dark-mode-btn i')
darkButton.addEventListener('click', e => {
  darkButtonIcon.classList.toggle('fas')
})
const countries = document.querySelector('.countries')
const countryList = localStorage.getItem('countryList') ? JSON.parse(localStorage.getItem('countryList')) : []
const searchInput = document.querySelector('#search')

searchInput.addEventListener('keyup', e => {
  const input = searchInput.value.toLowerCase()
  countries.innerHTML = ''
  displayCountries(countryList.filter(e => e.name.toLowerCase().includes(searchInput.value.toLowerCase())))
})



const displayCountries = (theList = countryList) => {
  theList.forEach(country => {
    const card = document.createElement('div')
    card.classList.add('card')
    const flag = document.createElement('div')
    card.appendChild(flag)
    flag.classList.add('flag')
    const flagImage = document.createElement('img')
    flag.appendChild(flagImage)
    flagImage.src = country.flag
    const info = document.createElement('div')
    card.appendChild(info)
    info.classList.add('info')
    const name = document.createElement('h2')
    info.appendChild(name)
    name.classList.add('country-name')
    name.textContent = country.name
    const facts = document.createElement('ul')
    info.appendChild(facts)
    facts.classList.add('facts')
    const population = document.createElement('li')
    facts.appendChild(population)
    population.innerHTML = `<span>Population: </span>${country.population}`
    const region = document.createElement('li')
    facts.appendChild(region)
    region.innerHTML = `<span>Region: </span>${country.region}`
    const capital = document.createElement('li')
    facts.appendChild(capital)
    capital.innerHTML = `<span>Capital: </span>${country.capital}`

    countries.appendChild(card)
  })
}

const getCountries = async () => {
  try {
    if (!localStorage.getItem('countryList')) {
      const fetchAPI = await fetch('https://restcountries.eu/rest/v2/all')
      const data = await fetchAPI.json()
      // console.log(data)
      data.forEach(country => {
        countryList.push({
          flag: country.flag,
          name: country.name,
          population: country.population,
          region: country.region,
          capital: country.capital
        })
      })
      localStorage.setItem('countryList', JSON.stringify(countryList))
      console.log(countryList)
      displayCountries()
    } else {
      displayCountries()
    }
  } catch (error) {
    console.error(error)
  }
}

getCountries()

