window.addEventListener('load', ()=> {
    let lon
    let lan

    let temperaturaValor = document.getElementById('temperatura-valor')
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion')

    let ubicacion = document.getElementById('ubicacion')
    let iconoAnimado = document.getElementById('icono-animado')

    let vientoVelocidad = document.getElementById('viento-velocidad')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( posicion => {
            //console.log(posicion.coords.latitude)
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude

            //ubicacion actual
            //const url = 'https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a4b78f75b07b3c86f0e2542c9f8725cb'

            //ubicacion por ciudad
            const url = 'https://api.openweathermap.org/data/2.5/weather?q=Santiago&lang=es&units=metric&appid=a4b78f75b07b3c86f0e2542c9f8725cb'

            //console.log(url)
            fetch(url)
                .then( response => { return response.json() })
                .then( data => {
                    let temp = Math.round(data.main.temp)
                        temperaturaValor.textContent = `${temp} °C`
                        console.log(data.weather[0].description)
                        let desc = data.weather[0].description
                        temperaturaDescripcion.textContent = desc.toUpperCase()

                        ubicacion.textContent = data.name

                        vientoVelocidad.textContent = `${data.wind.speed} m/s`
                        //console.log(data.wind.speed)

                        //para iconos animados
                        console.log(data.weather[0].main)
                        switch (data.weather[0].main) {
                            case `Clear`:
                                iconoAnimado.src = `animated/day.svg`
                                console.log(`LIMPIO`)
                                break;
                            case `Thunderstorm`:
                                iconoAnimado.src = `animated/thunder.svg`
                                console.log(`TORMENTA`)
                                break;
                            case `Drizzle`:
                                iconoAnimado.src = `animated/rainy-2.svg`
                                console.log(`LLOVIZNA`)
                                break;
                            case `Rain`:
                                iconoAnimado.src = `animated/rainy-7.svg`
                                console.log(`LLUVIA`)
                                break;
                            case `Snow`:
                                iconoAnimado.src = `animated/snowy-6.svg`
                                console.log(`NIEVE`)
                                break;   
                            case `Atmosphere`:
                                iconoAnimado.src = `animated/weather.svg`
                                console.log(`ATMOSFERA`)
                                break;       
                            case `Clouds`:
                                iconoAnimado.src = `animated/cloudy-day-1.svg`
                                console.log(`NUBES`)
                                break; 












                            default:
                                iconoAnimado.src=`animated/cloudy-day-1.svg`
                                console.log(`por defecto`);
                        }


                })
                .catch( error => {
                    console.log(error)
                })
        })
    }
})