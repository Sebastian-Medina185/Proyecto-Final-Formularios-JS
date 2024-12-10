function acceso() {
    let email = document.getElementById("emailUser").value
    let password = document.getElementById("passwordUser").value

    const data = JSON.parse(localStorage.getItem('user'))


    if (data.email === "" && data.password === "") {
        alert('Campos Vacios, Por favor Completar..')
    return }

    if (data.email === email && data.password === password) {
        alert("Bienvenido")
        window.location.replace('home.html')
    } else {
        alert("usuario o contraseña incorrectos")

    }
}
