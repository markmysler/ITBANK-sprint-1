const monto = document.getElementById('monto');
const moneda = document.getElementById('moneda');
const botonConvertir = document.getElementById('botonConvertir');
const tabla = document.querySelector('tbody')



botonConvertir.addEventListener('click', () => {
    convertirMonedas(monto.value, moneda.value)
})



function convertirMonedas(monto, moneda) {


    while(tabla.firstChild){
          tabla.removeChild(tabla.firstChild);
    }
    
    let resultado = 0;

    if(moneda === 'Dolar') {

        resultado = monto / 735;
    } 
    if(moneda === 'Euro') {

        resultado = monto / 848;
    }
    if(moneda === 'Real') {

        resultado = monto / 71;
    }
 const conversion = document.createElement('tr')
 conversion.innerHTML = `
 <td><h2>${monto}(Pesos Argetinos)</h2></td>
 <td><h2>=</h2></td>
 <td><h2>${resultado.toFixed(2)}(${moneda}) </h2></td>
 `;
tabla.appendChild(conversion)
};

// const conversion = document.createElement('tr')
//  conversion.innerHTML = `
//  <td><h2>${monto}</h2></td>
//  <td><h2>=</h2></td>
//  <td>${resultado.toFixed(2)}</td>
//  `;
// tabla.appendChild(conversion)