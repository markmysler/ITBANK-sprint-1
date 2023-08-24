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
