// Required: Use async/await OR .then() for API calls
// Required: Use try/catch OR .catch() for error handling

async function searchCountry(countryName) {
    const loader =document.getElementById('loading-spinner');
    try {
        // Show loading spinner
         loader.style.display="block";
        // Fetch country data
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        let details=data[0];
        // Update DOM
        document.getElementById('country-info').innerHTML = `
            <h2>${details.name.common}</h2>
            <p><strong>Capital:</strong> ${details.capital[0]}</p>
            <p><strong>Population:</strong> ${details.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${details.region}</p>
            <img src="${details.flags.svg}" alt="${details.name.common} flag">`;
        document.getElementById('bordering-countries').innerHTML = ``;
        // Fetch bordering countries
        for (let i=0;i<details.borders.length;i++){
            let code=details.borders[i];
            const response2 = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
            const data2 = await response2.json();
            let details2=data2[0];
            document.getElementById('bordering-countries').innerHTML += `
            <h2>${details2.name.common}</h2>
            <img src="${details2.flags.svg}" alt="${details2.name.common} flag">`;

        }
        // Update bordering countries section
        
    } catch (error) {
        
    } finally {
        // Hide loading spinner
        loader.style.display="none";
}

}
// Event listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});
document.getElementById('country-input').addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        const country = document.getElementById('country-input').value;
        searchCountry(country);
    }
});