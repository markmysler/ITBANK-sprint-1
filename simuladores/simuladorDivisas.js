const monto = document.getElementById('monto');
const moneda = document.getElementById('moneda');
const botonConvertir = document.getElementById('botonConvertir');

botonConvertir.addEventListener('click', () => {
    convertirMonedas(monto.value, moneda)
})

function convertirMonedas(monto, moneda) {


    let resultado = 0;

    if(moneda = Dolar) {

        resultado = monto * 735;
    } 
    if(moneda = Euro) {

        resultado = monto * 848;
    }
    if(moneda = Real) {

        resultado = monto * 71;
    }

    console.log(convertirMonedas(monto, moneda))
}
