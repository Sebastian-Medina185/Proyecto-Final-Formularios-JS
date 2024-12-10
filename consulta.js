document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const TableBody = document.querySelector("tbody");

    // Cargar los datos de la tabla al inicio
    const loadTableData = () => {
        // obtiene el valor del array y lo parsea a JSON
        const users = JSON.parse(localStorage.getItem("users")) || []; 
        renderTable(users);
    };

    // Guardar los datos en localStorage
    const saveUser = (user, userIndex) => {
        const users = JSON.parse(localStorage.getItem("users")) || []; 


        if (userIndex !== "") { // Si hay un índice, se actualiza el usuario existente
            users[userIndex] = user; // Actualizar el usuario existente
        } else {
            users.push(user);  // Agregar el nuevo usuario al array
        }

        localStorage.setItem("users", JSON.stringify(users)); // Guardar el array en localStorage
        renderTable(users);  // Renderizar la tabla después de guardar los datos
    };

    // Mostrar los datos en la tabla
    const renderTable = (users) => {
        TableBody.innerHTML = "";  

        users.forEach((user, index) => {
            const row = document.createElement("tr"); 
            row.innerHTML = ` 
                <td>${index + 1}</td>
                <td>${user.nombre}</td>
                <td>${user.documento}</td> 
                <td>${user.correo}</td>
                <td>${user.edad}</td>
                <td>${user.ciudad}</td>
                <td>${user.fechanacimiento}</td>
                <td> 
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#dialogo1" onclick="userConsult(${index})">Consultar</button> 
                    <button class="btn btn-danger" onclick="deleteUser(${index})">Eliminar</button> 
                    <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#dialogo1" onclick="userEdit(${index})">Editar</button>
                </td>
            `;
            TableBody.appendChild(row); 
        });
    };

    // Manejo del envío del formulario
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const userIndex = document.getElementById("userIndex").value; // Obtener el índice del usuario

        const user = {
            //Captura los datos guardados en el formulario y lo guarda como un objeto
            nombre: document.getElementById("nameUser").value,
            documento: document.getElementById("documento").value,
            correo: document.getElementById("emailUser").value,
            edad: document.getElementById("edad").value,
            ciudad: document.getElementById("ciudad").value,
            fechanacimiento: document.getElementById("fechanacimiento").value,
        };

        saveUser(user, userIndex);  

        form.reset();  
        document.getElementById("userIndex").value = '';  // Limpiar el índice del usuario
    });
    loadTableData();

});

// Consultar el Usuario registrado
userConsult = (index) => {
    //obtiene los datos de localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users[index];

    if (user) { // Si se encuentra el usuario, se muestran sus datos en el formulario
        document.getElementById("nameUser").value = user.nombre;
        document.getElementById("documento").value = user.documento;
        document.getElementById("emailUser").value = user.correo;
        document.getElementById("edad").value = user.edad;
        document.getElementById("ciudad").value = user.ciudad;
        document.getElementById("fechanacimiento").value = user.fechanacimiento;

        // Deshabilitar todos los campos del formulario
        document.querySelectorAll("#myform input").forEach(field => {
            field.disabled = true;
        });

        // Deshabilitar el botón de consulta
        const Consultbtn = document.getElementById("Consultbtn");
        Consultbtn.disabled = true;
    }
};

// Eliminar Usuario
const deleteUser = (index) => {

    //obtiene datos de localStorage
    const users = JSON.parse(localStorage.getItem("users")) || []

    //Elimina el usuario:
    users.splice(index, 1)

    //Actualiza el localStorage despues despues de eliminar
    localStorage.setItem("users", JSON.stringify(users))
    /* document.querySelector("tbody").innerHTML = " ";
    users.forEach((user, i) => renderTable(users)); */
    
    location.reload()
    
    renderTable(users) // Actualizar la tabla con los datos actualizados

};

// Editar Usuario
window.userEdit = (index) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users[index];

    if (user) { // Si se encuentra el usuario, se muestran sus datos
        document.getElementById("nameUser").value = user.nombre; 
        document.getElementById("documento").value = user.documento;
        document.getElementById("emailUser").value = user.correo;
        document.getElementById("edad").value = user.edad;
        document.getElementById("ciudad").value = user.ciudad;
        document.getElementById("fechanacimiento").value = user.fechanacimiento;
    } 

    // Guardar el índice del usuario en un campo oculto para usarlo al actualizar
    document.getElementById("userIndex").value = index;

    
    const Consultbtn = document.getElementById("Consultbtn");
    Consultbtn.disabled = false; 

    document.querySelectorAll("#myform input").forEach(field => {
        field.disabled = false; // Habilitar todos los campos del formulario
    });
};

// Limpiar Formulario
const ResetForm = () => { 
    document.getElementById("myform").reset(); // Limpiar el formulario
    document.getElementById("userIndex").value = "";  // Limpiar el índice
};
