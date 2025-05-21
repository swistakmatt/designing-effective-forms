let clickCount = 0;

const countryInput = document.getElementById('country');
const countryList = document.getElementById('country-list');
const myForm = document.getElementById('form');
const modal = document.getElementById('form-feedback-modal');
const clicksInfo = document.getElementById('click-count');

function handleClick() {
	clickCount++;
	clicksInfo.innerText = clickCount;
}

async function fetchAndFillCountries() {
	try {
		const response = await fetch('https://restcountries.com/v3.1/all');
		if (!response.ok) {
			throw new Error('Błąd pobierania danych');
		}
		const data = await response.json();
		const countries = data.map((country) => country.name.common).sort();
		countryList.innerHTML = countries
			.map((c) => `<option value="${c}">`)
			.join('');
	} catch (error) {
		console.error('Wystąpił błąd:', error);
	}
}

function getCountryByIP() {
	fetch('https://get.geojs.io/v1/ip/geo.json')
		.then((response) => response.json())
		.then((data) => {
			const country = data.country;
			countryInput.value = country;
			getCountryCode(country);
		})
		.catch((error) => {
			console.error('Błąd pobierania danych z serwera GeoJS:', error);
		});
}

function getCountryCode(countryName) {
	const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

	fetch(apiUrl)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Błąd pobierania danych');
			}
			return response.json();
		})
		.then((data) => {
			const countryCode = data[0].idd.root + data[0].idd.suffixes.join('');
			const radios = document.getElementsByName('countryCode');
			radios.forEach((r) => {
				if (r.value === countryCode) r.checked = true;
			});
		})
		.catch((error) => {
			console.error('Wystąpił błąd:', error);
		});
}

(() => {
	// nasłuchiwania na zdarzenie kliknięcia myszką
	document.addEventListener('click', handleClick);

	fetchAndFillCountries();
	getCountryByIP();

	myForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const bsModal = new bootstrap.Modal(modal);
		clicksInfo.innerText = clickCount;
		bsModal.show();
	});
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Enter' && document.activeElement.tagName !== 'TEXTAREA') {
			e.preventDefault();
			myForm.requestSubmit();
		}

		if (
			(e.ctrlKey && e.key.toLowerCase() === 's') ||
			(e.ctrlKey && e.key === 'Enter')
		) {
			e.preventDefault();
			myForm.requestSubmit();
		}
	});
})();
