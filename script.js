const firstPage = document.querySelector('.first-page')
const main = document.querySelector('main')
let searchButton = document.querySelector('.search-button')
searchButton.addEventListener('click', getWeather)
let response
function getWeather(){
	event.preventDefault()
	let queryCity = document.querySelector('.query-city').value
	let dynamicOffset
	const url = 'https://api.openweathermap.org/data/2.5/weather?appid=01274dbc7b3f1ca72f51fcbe017f290b&q='+queryCity
	const xhttpr = new XMLHttpRequest()
	xhttpr.open('GET', url , true)
	xhttpr.send()
	xhttpr.onload = () => {
		if(xhttpr.readyState == 4){
			if(xhttpr.status === 200){
				response = JSON.parse(xhttpr.response)
				console.log(response)
				populateBody()
				setClock()
				populteSunset()
				populteSunrise()
				main.style.display = "flex"
				firstPage.remove()
				searchButton = document.querySelector('.search-button')
				searchButton.addEventListener('click', getWeather)
				queryCity = ''
				console.log(dynamicOffset)
			}
			else {
				showError()
				console.log('Server Okay but...')
			}
		}
		else if (xhttpr.readyState == 404){
		}
		else {
			console.log('Something is wrong here.')
		}
	}
}
function showError() {
	const errorMsg = document.querySelector('.error-msg')
	errorMsg.style.display = "block"
	setTimeout(hideIt, 2000)
	function hideIt(){
		errorMsg.style.display = "none"
	}
	
}

function showEff(items) {
	items.forEach(anim)
	function anim(item, index){
		setTimeout(() => {
            item.style.opacity = '1'
        }, index * 100)
	}
}
function populateBody() {
	const statusVisusal = document.querySelector('.status-visual')
	const stat = document.querySelector('.stat')
	const cityName = document.querySelector('.city-name')
	const temp = document.querySelector('#temp')
	const humidity = document.querySelector('.humidity')
	const airPressure = document.querySelector('.air-pressure')
	const visibility = document.querySelector('.visibility')
	const windSpeed = document.querySelector('.wind-speed')
	const windDir = document.querySelector('.wind-direction')
	const statusCards = document.querySelectorAll('.status-card')
	statusVisusal.src = ` https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
	stat.innerText = response.weather[0].description
	cityName.innerText = response.name
	temp.innerText = Math.round(response.main.temp - 273.15)
	humidity.innerText = response.main.humidity + ' %'
	airPressure.innerText = response.main.pressure + ' hPa'
	visibility.innerText = response.visibility + ' m'
	windSpeed.innerText = Math.round(response.wind.speed * 3.6) + ' kmph'
	windDir.style.transform = `rotate(${response.wind.deg}deg)`
}
function targetElements(){

}

function setClock(){
	const digiClock = document.querySelector('.digi-clock')
	let clock = new Date()
	dynamicOffset = ((response.timezone + (clock.getTimezoneOffset()) * 60) * 60)
	console.log(dynamicOffset)
	clock = new Date(clock.getTime() + dynamicOffset)
	clock = `${clock.getHours().toString()}:${clock.getMinutes().toString()}`
	digiClock.innerText = clock
}
function populteSunrise(){
	const sunriseTime = document.querySelector('.sunrise-time')
	let clock = new Date(response.sys.sunrise*1000 + dynamicOffset)
	clock = `${clock.getHours().toString()}:${clock.getMinutes().toString()}`
	sunriseTime.innerText = clock;
}

function populteSunset(){
	const sunsetTime = document.querySelector('.sunset-time')
	let clock = new Date(response.sys.sunset*1000 + dynamicOffset)
	clock = `${clock.getHours().toString()}:${clock.getMinutes().toString()}`
	sunsetTime.innerText = clock;
}
