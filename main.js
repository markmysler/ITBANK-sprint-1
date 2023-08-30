let user = {};
window.onload = mostrarForms(false);
function logUserIn(e) {
	e.preventDefault();
	const [name, password] = e.target;
	if (name.value.length > 0 && password.value.length > 0) {
		user.name = name.value;
		user.password = password.value;
		user.saldo = 10000;
	} else {
		alert("No es posible enviar un formulario incompleto");
		return;
	}
	const formElement = document.getElementById("logIn");
	formElement.style.display = "none";

	const headerUserInfoElement = document.getElementById("headerUserInfo");
	headerUserInfoElement.innerHTML = `
    <div id="logOutDiv">
    <h3>${user.name}</h3>
    <button onclick="logOut()">Cerrar sesion</button>
    </div>
    
    `;
	actualizarSaldoEnUi();
	document.getElementById("saldo").innerHTML = user.saldo;
	mostrarForms(true);
}

function logOut() {
	user = {};
	const logOutDiv = document.getElementById("logOutDiv");
	logOutDiv.style.display = "none";
	const formElement = document.getElementById("logIn");
	formElement.style.display = "inline";
	document.getElementById("nombre").value = "";
	document.getElementById("password").value = "";
	mostrarForms(false);
}

function transferir(event) {
	event.preventDefault();
	const montoATransferir = document.getElementById("monto-transferir");
	const cuentaATransferir = document.getElementById("toAccount");

	if (montoATransferir.value > 0 && cuentaATransferir.value != null) {
		let confirmacion = confirm(
			"¿Desea transferir $" +
				montoATransferir.value +
				" a " +
				cuentaATransferir.value +
				"?"
		);
		if (confirmacion) {
			if (user.saldo >= montoATransferir.value) {
				user.saldo -= montoATransferir.value;
				operacionExitosa();
			} else {
				alert("Saldo insuficiente");
			}
		} else {
			operacionCancelada();
		}
		montoATransferir.value = "";
		cuentaATransferir.value = "";
	}
}

function pagarFactura(event) {
	event.preventDefault();
	const montoAPagar = document.getElementById("monto-pagar");
	const beneficiario = document.getElementById("beneficiario");

	if (montoAPagar.value > 0 && beneficiario.value != null) {
		let confirmacion = confirm(
			"¿Desea pagar $" +
				montoAPagar.value +
				" a " +
				beneficiario.value +
				"?"
		);
		if (confirmacion) {
			if (user.saldo >= montoAPagar.value) {
				user.saldo -= montoAPagar.value;
				operacionExitosa();
			} else {
				alert("Saldo insuficiente");
			}
		} else {
			operacionCancelada();
		}
		montoAPagar.value = "";
		beneficiario.value = "";
	}
}

function solicitarPrestamo(event) {
	event.preventDefault();
	const montoSolicitado = document.getElementById("monto-solicitado");
	const plazoEnMeses = document.getElementById("plazo-meses");

	if (montoSolicitado.value > 0 && plazoEnMeses.value > 0) {
		let confirmacion = confirm(
			"¿Desea solicitar un préstamo de $" +
				montoSolicitado.value +
				" a pagar en " +
				plazoEnMeses.value +
				" meses?"
		);
		if (confirmacion) {
			user.saldo += parseInt(montoSolicitado.value);
			operacionExitosa();
		} else {
			operacionCancelada();
		}
		montoSolicitado.value = "";
		plazoEnMeses.value = "";
	}
}

function operacionExitosa() {
	actualizarSaldoEnUi();
	alert("¡Operación exitosa!");
}

function operacionCancelada() {
	alert("Operación cancelada.");
}

function mostrarForms(boolean) {
	["pago-factura", "transferencia", "prestamo", "saldoContainer"].forEach(
		(form) => {
			document.getElementById(form).hidden = !boolean;
		}
	);
}

function actualizarSaldoEnUi() {
	document.getElementById("saldo").innerHTML = user.saldo;
}
