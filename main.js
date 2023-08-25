let user = {};

function logUserIn(e) {
	e.preventDefault();
	const [name, password] = e.target;

	if (name.value.length > 0 && password.value.length > 0) {
		user.name = name.value;
		user.password = password.value;
	} else {
		alert("No es posible enviar un formulario incompleto");
		return;
	}
	const formElement = document.getElementById("loginForm");
	formElement.style.display = "none";
	const logInOutElement = document.getElementById("logInOut");
	logInOutElement.innerHTML += `
    <div id="logOutDiv">
    <h2>Sesion iniciada como ${user.name}</h2>
    <button onclick="logOut()">Cerrar sesion</button>
    </div>
    
    `;
}

function logOut() {
	user = {};
	const logOutDiv = document.getElementById("logOutDiv");
	logOutDiv.style.display = "none";
	const formElement = document.getElementById("loginForm");
	formElement.style.display = "inline";
}

function transferir(){
	let montoATransferir = document.getElementById("monto-transferir").value;
	let cuentaATransferir = document.getElementById("toAccount").value;

	if (montoATransferir>0 && cuentaATransferir!=null){
		let confirmacion = confirm("¿Desea transferir $" + montoATransferir + " a " + cuentaATransferir + "?");
			if(confirmacion){
				operacionExitosa();
			} else {
				operacionCancelada();
			}
	}
}

function pagarFactura(){
	let montoAPagar = document.getElementById("monto-pagar").value;
	let beneficiario = document.getElementById("beneficiario").value;

	if (montoAPagar>0 && beneficiario!=null){
		let confirmacion = confirm("¿Desea pagar $" + montoAPagar + " a " + beneficiario + "?");
			if(confirmacion){
				operacionExitosa();
			} else {
				operacionCancelada();
			}
	}

}

function solicitarPrestamo(){
	let montoSolicitado = document.getElementById("monto-solicitado").value;
	let plazoEnMeses = document.getElementById("plazo-meses").value;

	if (montoSolicitado>0 && plazoEnMeses>0){
		let confirmacion = confirm("¿Desea solicitar un préstamo de $" + montoSolicitado + " a pagar en " + plazoEnMeses + " meses?");
			if(confirmacion){
				operacionExitosa();
			} else {
				operacionCancelada();
			}
	}
}

function operacionExitosa(){
	alert("¡Operación exitosa!")
}

function operacionCancelada(){
	alert ("Operación cancelada.")
}
