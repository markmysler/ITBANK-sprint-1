const monto = document.getElementById('monto');
const meses = document.getElementById('meses');
const intereses = document.getElementById('intereses');
const botonCalcular = document.getElementById('botonCalcular');
const completarTabla = document.querySelector('tbody');
const Total = document.querySelector('tfoot');

botonCalcular.addEventListener('click', () => {
    calcularCuota(monto.value, intereses.value, meses.value)
});
  
function calcularCuota(monto, intereses, meses){

    //reiniciar funcion//

    while(completarTabla.firstChild){
        completarTabla.removeChild(completarTabla.firstChild);
    }
    while(Total.firstChild){
        Total.removeChild(Total.firstChild)
    }

    
        //Formato fechas//

    let fechas = [];
    let fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1; 
    const dia = fechaActual.getDate();

    let pagoIntereses=0, pagoCapital = 0, cuota = 0, totalDeIntereses = 0;


    //calculo de cuota, con metodo dde amortizacion frances//

    cuota = monto * (Math.pow(1+intereses/100, meses)*intereses/100)/(Math.pow(1+intereses/100, meses)-1);

    //lenado de la tabla//

    if(meses > 72) {

        alert('El plazo de meses es mas de lo permitido')
    } else 

    for(let i = 1; i <= 1; i++) {

        pagoIntereses = parseFloat(monto*(intereses/100));
        pagoCapital = cuota - pagoIntereses;
        monto = parseFloat(monto-pagoCapital);
        totalDeIntereses = totalDeIntereses + pagoIntereses


        
        //llevar los elementos creados a la tabla en el html//
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${dia}/${mes + 1}/${año}</td>
            <td>${cuota.toFixed(2)}</td>
            <td>${pagoIntereses.toFixed(2)}</td>
            
        `;

        console.log(row);

        completarTabla.appendChild(row)

        
       //calculo del total a pagar// //en caso de querer que se haga una tabla completa, poner esta parte del cogido fuera del bucle for
       const ultimaFila = document.createElement('tr');
       ultimaFila.innerHTML = `
       <td>Total a pagar:</td>
       <td>${(cuota * meses).toFixed(2)}</td>
        `;
       Total.appendChild(ultimaFila)
 
}

}
