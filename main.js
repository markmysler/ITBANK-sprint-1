const hBtn = document.querySelector("#menu-btn");
const menu = document.querySelector("#sidemenu");
const menuBtns = document.querySelectorAll(".item");
const mainContent = document.getElementById("main-content");
const formElement = document.getElementById("logIn");
let currentPage = "cuentas";
let user = {};
const sideMenuName = document.getElementById("sideMenuName");
const saldoSideBar = document.getElementById("saldoSideBar");
function toggleMenu(page) {
	if (menu.classList[0] === "menu-expanded") {
		menu.classList.toggle("menu-expanded");
		menu.classList.toggle("menu-collapsed");
		document.querySelector("body").classList.toggle("body-expanded");
		currentPage = page;
		mainContent.innerHTML = getMainHtml(page);
	}
}
function getMainHtml(page) {
	switch (page) {
		case "cuentas": {
			return `
            <div id="dashboard">
            <div id="divImgDash">
            <img src="./imagenes/logo.png" alt="Foto de perfil" id="dashImg" >
            </div>
                <h1>${user.name}</h1>
                <h3 id="saldoDash">$${user.saldo}</h3>
            </div>
                    `;
		}
		case "transferencias": {
			return `
            <div id="transferencia">
				<h2>Transferir fondos:</h2>
				<form id="transferForm" onsubmit="transferir(event)">
					<label for="toAccount">Cuenta de destino:</label>
					<input type="text" id="toAccount" required />
					<br />
					<label for="monto-transferir">Monto:</label>
					<input type="number" id="monto-transferir" required />
					<br />
					<button type="submit">Realizar Transferencia</button>
				</form>
			</div>
            `;
		}
		case "pagos": {
			return `
            <div id="pago-factura">
				<h2>Pago de facturas:</h2>

				<form id="billPaymentForm" onsubmit="pagarFactura(event)">
					<label for="beneficiario">Beneficiario:</label>
					<input type="text" id="beneficiario" required />
					<br />
					<label for="monto-pagar">Monto:</label>
					<input type="number" id="monto-pagar" required />
					<br />
					<button type="submit">Realizar Pago</button>
				</form>
			</div>
            `;
		}
		case "prestamos": {
			return `
            <div id="prestamo">
				<h2>Solicitud de préstamo:</h2>

				<form id="loanRequestForm" onsubmit="solicitarPrestamo(event)">
					<label for="monto-solicitado">Monto solicitado:</label>
					<input type="number" id="monto-solicitado" required />
					<br />
					<label for="plazo-meses">Plazo (meses):</label>
					<input type="number" id="plazo-meses" required />
					<br />
					<button type="submit">Solicitar Préstamo</button>
				</form>
			</div>
            `;
		}
		case "convertidor": {
			return `
                <h1>Convertidor</h1>
            `;
		}
	}
}
hBtn.addEventListener("click", () => {
	menu.classList.toggle("menu-expanded");
	menu.classList.toggle("menu-collapsed");
	document.querySelector("body").classList.toggle("body-expanded");
});
function logUserIn(e) {
	e.preventDefault();

	const [userName, userPassword] = e.target;
	if (userName.value.length > 0 && userPassword.value.length > 0) {
		user.name = userName.value;
		user.password = userPassword.value;
		user.saldo = 10000;
	} else {
		alert("No es posible enviar un formulario incompleto");
		return;
	}
	formElement.style.display = "none";
	mainContent.innerHTML = `
    <div id="dashboard">
    <div id="divImgDash">
    <img src="./imagenes/logo.png" alt="Foto de perfil" id="dashImg" >
    </div>
        <h1>${user.name}</h1>
        <h3 id="saldoDash">$${user.saldo}</h3>
    </div>
            `;

	sideMenuName.innerHTML = `<h2>${user.name}</h2>`;
	saldoSideBar.innerHTML = `$${user.saldo}`;

	for (let index = 0; index < menuBtns.length; index++) {
		menuBtns[index].disabled = false;
	}
}

function logOut() {
	window.location.reload();
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
function actualizarSaldoEnUi() {
	saldoSideBar.innerHTML = `$${user.saldo}`;

	const saldoDash = document.getElementById("saldoDash");
	if (saldoDash) {
		saldoDash.innerHTML = `$${user.saldo}`;
	}
}
