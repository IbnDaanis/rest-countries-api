const main = document.querySelector('main')
const darkButton = document.querySelector('.dark-mode-btn')
const darkButtonIcon = document.querySelector('.dark-mode-btn i')
const parameters = document.querySelector('.parameters')
const countries = document.querySelector('.countries')
const countryList = localStorage.getItem('countryList')
  ? JSON.parse(localStorage.getItem('countryList'))
  : []
const searchInput = document.querySelector('#search')
const container = document.querySelector('#container')
// Search country by name
searchInput.addEventListener('keyup', (e) => {
  const input = searchInput.value.toLowerCase()
  countries.innerHTML = ''
  displayCountries(
    countryList.filter((e) =>
      e.name.toLowerCase().includes(searchInput.value.toLowerCase())
    )
  )
})
let darkMode = localStorage.getItem('darkMode')
  ? JSON.parse(localStorage.getItem('darkMode'))
  : false

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function hide() {
  modal.classList.toggle('invisible')
  countries.classList.toggle('invisible')
  parameters.classList.toggle('invisible')
  countryBordersList.innerHTML = ''
}

// Modal
const modal = document.querySelector('.modal')
const countryFlag = document.querySelector('.countryFlag')
const countryName = document.querySelector('.countryName')
const countryNativeName = document.querySelector('.countryNativeName')
const countryPopulation = document.querySelector('.countryPopulation')
const countryRegion = document.querySelector('.countryRegion')
const countrySubRegion = document.querySelector('.countrySubRegion')
const countryCapital = document.querySelector('.countryCapital')
const countryTopLevelDomain = document.querySelector('.countryTopLevelDomain')
const countryCurrencies = document.querySelector('.countryCurrencies')
const countryLanguages = document.querySelector('.countryLanguages')
const countryBordersList = document.querySelector('.countryBordersList')
const backButton = document.querySelector('.back-button')


const displayModal = (country) => {
  modal.classList.toggle('invisible')
  countryFlag.src = country.flag
  countryName.textContent = country.name
  countryNativeName.textContent = country.nativeName
  countryPopulation.textContent = formatNumber(country.population)
  countryRegion.textContent = country.region
  countrySubRegion.textContent = country.subregion
  countryCapital.textContent = country.capital
  countryTopLevelDomain.textContent = country.topLevelDomain
  countryCurrencies.textContent = country.currencies[0].name
  countryLanguages.textContent = country.languages[0].name
  country.borderCountries.forEach(border => {
    const bordering = document.createElement('li')
    bordering.classList.add('borderingCountry')
    darkMode && bordering.classList.add('dark-element')
    bordering.textContent = border
    countryBordersList.appendChild(bordering)
  })
}

// Create country card
const displayCountries = (theList = countryList) => {
  theList.forEach((country) => {
    const card = document.createElement('div')
    card.classList.add('card')
    const flag = document.createElement('div')
    card.appendChild(flag)
    flag.classList.add('flag')
    const flagImage = document.createElement('img')
    flag.appendChild(flagImage)
    flagImage.src = country.flag
    flagImage.alt = `Flag of ${country.name}`
    const info = document.createElement('div')
    card.appendChild(info)
    info.classList.add('info')
    const name = document.createElement('h2')
    info.appendChild(name)
    name.classList.add('country-name')
    name.textContent =
      country.name === 'United Kingdom of Great Britain and Northern Ireland'
        ? 'United Kingdom'
        : country.name
    const facts = document.createElement('ul')
    info.appendChild(facts)
    facts.classList.add('facts')
    const population = document.createElement('li')
    facts.appendChild(population)
    population.innerHTML = `<span>Population: </span>${formatNumber(
      country.population
    )}`
    const region = document.createElement('li')
    facts.appendChild(region)
    region.innerHTML =
      country.region && `<span>Region: </span>${country.region}`
    const capital = document.createElement('li')
    facts.appendChild(capital)
    capital.innerHTML =
      country.capital && `<span>Capital: </span>${country.capital}`

    card.addEventListener('click', () => {
      countries.classList.toggle('invisible')
      parameters.classList.toggle('invisible')
      displayModal(country)

    })
    countries.appendChild(card)
  })
}

// Fetch data from API
const getCountries = async () => {
  try {
    if (!localStorage.getItem('countryList')) {
      const fetchAPI = await fetch('https://restcountries.eu/rest/v2/all')
      const data = await fetchAPI.json()
      // console.log(data)
      data.forEach((country) => {
        countryList.push({
          flag: country.flag,
          name: country.name,
          nativeName: country.nativeName,
          population: country.population,
          region: country.region,
          capital: country.capital,
          region: country.region,
          subregion: country.subregion,
          capital: country.capital,
          topLevelDomain: country.topLevelDomain,
          currencies: country.currencies,
          languages: country.languages,
          borderCountries: country.borders
        })
      })
      localStorage.setItem('countryList', JSON.stringify(countryList))
      // console.log(countryList)
      displayCountries()
    } else {
      displayCountries()
    }
  } catch (error) {
    console.error(error)
  }
}

getCountries()

// Filter by region
function DropDown(dropDown) {
  const [toggler, menu] = dropDown.children

  const handleClickOut = (e) => {
    if (!dropDown) {
      return document.removeEventListener('click', handleClickOut)
    }

    if (!dropDown.contains(e.target)) {
      this.toggle(false)
    }
  }

  const setValue = (item) => {
    const val = item.textContent
    toggler.textContent = val
    this.value = val
    this.toggle(false)
    dropDown.dispatchEvent(new Event('change'))
    toggler.focus()
  }

  const handleItemKeyDown = (e) => {
    e.preventDefault()

    if (e.keyCode === 38 && e.target.previousElementSibling) {
      // up
      e.target.previousElementSibling.focus()
    } else if (e.keyCode === 40 && e.target.nextElementSibling) {
      // down
      e.target.nextElementSibling.focus()
    } else if (e.keyCode === 27) {
      // escape key
      this.toggle(false)
    } else if (e.keyCode === 13 || e.keyCode === 32) {
      // enter or spacebar key
      setValue(e.target)
    }
  }

  const handleToggleKeyPress = (e) => {
    e.preventDefault()

    if (e.keyCode === 27) {
      // escape key
      this.toggle(false)
    } else if (e.keyCode === 13 || e.keyCode === 32) {
      // enter or spacebar key
      this.toggle(true)
    }
  }

  toggler.addEventListener('keydown', handleToggleKeyPress)
  toggler.addEventListener('click', () => this.toggle())
    ;[...menu.children].forEach((item) => {
      item.addEventListener('keydown', handleItemKeyDown)
      item.addEventListener('click', () => setValue(item))
    })

  this.element = dropDown

  this.value = toggler.textContent

  this.toggle = (expand = null) => {
    expand =
      expand === null ? menu.getAttribute('aria-expanded') !== 'true' : expand

    menu.setAttribute('aria-expanded', expand)

    if (expand) {
      toggler.classList.add('active')
      menu.children[0].focus()
      document.addEventListener('click', handleClickOut)
      dropDown.dispatchEvent(new Event('opened'))
    } else {
      toggler.classList.remove('active')
      dropDown.dispatchEvent(new Event('closed'))
      document.removeEventListener('click', handleClickOut)
    }
  }
}

const dropDown = new DropDown(document.querySelector('.dropdown'))

dropDown.element.addEventListener('change', () => {
  countries.innerHTML = ''
  dropDown.value === 'All'
    ? displayCountries()
    : displayCountries(countryList.filter((e) => e.region === dropDown.value))
})
dropDown.toggle()

// Dark Mode
const nav = document.querySelector('nav')
const cardEl = document.querySelectorAll('.card')
const infoEl = document.querySelectorAll('.card .info')
const dropDownMenu = document.querySelector('.dropdown-toggle')
const dropDownMenuOptions = document.querySelector('.dropdown-menu')
const search = document.querySelector('.search')
const searchIcon = document.querySelector('label i')

const toggleDarkMode = () => {
  localStorage.setItem('darkMode', JSON.stringify(darkMode))
  backButton.classList.toggle('dark-element')
  darkButton.classList.toggle('dark-element')
  darkButtonIcon.classList.toggle('dark-element')
  darkButtonIcon.classList.toggle('fas')
  document.body.classList.toggle('dark')
  nav.classList.toggle('dark-element')
  cardEl.forEach((e) => e.classList.toggle('dark-element'))
  infoEl.forEach((e) => e.classList.toggle('dark-element'))
  document.querySelectorAll('.countryBordersList li') && document.querySelectorAll('.countryBordersList li').forEach(e => e.classList.toggle('dark-element'))
  dropDownMenu.classList.toggle('dark-element')
  dropDownMenuOptions.classList.toggle('dark-element')
  search.classList.toggle('dark-element')
  searchIcon.classList.toggle('dark-element')
}

darkMode && toggleDarkMode()

darkButton.addEventListener('click', (e) => {
  darkMode = !darkMode
  toggleDarkMode()
})

