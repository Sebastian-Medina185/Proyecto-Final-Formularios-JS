const nameUser = document.getElementById("Bienvenido") 

const data = JSON.parse(localStorage.getItem('user')) 
let nombre = document.getElementById('nameUser') 
nameUser.innerHTML = "Bienvenid@ " + `${data.nombre}` 

function logOut(){
    const exit = confirm("Esta seguro que desea Salir?")
    if(exit){
        window.location.replace('index.html')
    }
}