function RegistroUsuario(){ 
    const user = { 
        nombre:document.getElementById("nameUser").value,  
        edad:document.getElementById("edad").value,  
        ciudad:document.getElementById("ciudad").value, 
        documento:document.getElementById("documento").value,
        email:document.getElementById("emailUser").value,
        fechanacimiento:document.getElementById("fechanacimiento").value,
        password:document.getElementById("passwordUser").value
    } 

    localStorage.setItem('user', JSON.stringify(user))
    console.log(user)
    alert("Usuario Registrado..")
    window.location.href = 'index.html'
}
