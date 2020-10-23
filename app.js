const main = document.querySelector('main')



const getCountries = async () => {
  try {
    const fetchAPI = await fetch('https://restcountries.eu/rest/v2/all')
    const data = await fetchAPI.json()
    console.log(data)
    data.forEach(country => {
      const name = document.createElement('div')
      name.textContent = country.name
      name.style.display = 'flex'
      name.style.flexDirection = 'column'
      name.style.alignItems = 'center'

      const flag = document.createElement('img')
      flag.src = country.flag
      flag.style.width = '100px'
      flag.style.objectFit = 'cover'
      name.appendChild(flag)
      main.appendChild(name)
    })

  } catch (error) {
    console.error(error)
  }
}

