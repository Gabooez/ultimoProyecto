// Api - Weather (Obtener la temperatura)

let lon;
//creamos varible de longitud
let lat;
//creamos variable de latitud
let temperatura = document.querySelector(".temp")
//aqui se obtiene el elemento de html temp para asi rellenarlo posteriormente con la api
let loc = document.querySelector(".location")
//locacion acutal que tendremos
const kelvin = 273.15


window.addEventListener("load",()=>{


if(navigator.geolocation){
//si navegador que se esta utilizando tiene una locacion

navigator.geolocation.getCurrentPosition((position) =>{
//metodo para obtener la posicion actual


// esto es para definir las variables de logitud y latitud
        console.log(position);
        lon = position.coords.longitude;
        lat = position.coords.latitude;


//declarar constante que sera la id de la api

const api ="7aadfeadfb6cf7df323a033657106c56";

const url_api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&` + `lon=${lon}&appid=${api}`;

//para hacer peticiones
fetch(url_api).then((response)=>{

    return response.json();
})
.then((data)=>{

//esto para reemplazar las variables que vienen del html
temperatura.textContent = Math.floor(data.main.temp - kelvin) +"°C";

});
});
}
});