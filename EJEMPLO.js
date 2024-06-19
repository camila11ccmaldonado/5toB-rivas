async function mostrarEmpleados() {
    const response = await fetch('http://localhost:3000/obtenerEmpleados',{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
          },
    })


    console.log(response)
    const result = await response.json()
    console.log(result)
    let tabla = `
    <tr>
         <th> Nombre </th>
         <th> Apellido </th>
         <th> id_cliente </th>
         <th> id_sucursal </th>
    </tr>
    `
    for (let i = 0; i < result.length; i++) {
        tabla += `
        <tr> 
             <td> ${result[i].nombre}</td>
             <td> ${result[i].apellido}</td>
             <td> ${result[i].id_cliente}</td>
             <td> ${result[i].id_sucursal}</td>
        </tr>`
    }
    document.getElementById("nuevoEmpleado").innerHTML = tabla
}
async function agregarEmpleado() {
    const data = {
        nombre : document.getElementById("ingresarNombre").value,
        apellido : document.getElementById("ingresarApellido").value,
        id_cliente : document.getElementById("ingresarId_cliente").value,
        id_sucursal : document.getElementById("ingresarId_sucursal").value
    }


    const response = await fetch('http://localhost:3000/insertarEmpleados',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(data),
    })


    console.log(response)
    const result = await response.json()
    console.log(result)
    let tabla_eliminar = `
    <tr> 
         <th>Nombre</th>
         <th>Apellido</th>
         <th> id_cliente </th>
         <th> id_sucursal </th>
    </tr>`

    for (let i = 0; i < result.length; i++) {
        tabla_eliminar = `
        <tr> 
             <td> <button onclick="eliminarEmpleado(${result[i].id})">Eliminar</button></td>
             <td> ${result[i].nombre}</td>
             <td> ${result[i].apellido}</td>
             <td> ${result[i].id_cliente}</td>
             <td> ${result[i].id_sucursal}</td>
        </tr>`
    }
    document.getElementById("eliminarEmpleado").innerHTML = tabla_eliminar
}



async function eliminarEmpleado(id) {
    const data = {
        id : id
    }

    const response = await fetch('http://localhost:3000/eliminarEmpleados',{
        method:"DELETE",
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(data),
    })
}


async function mostraEmpleadoParaElimina(){
    const response = await fetch ('http://localhost:3000/eliminarEmpleados',{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
 
console.log(response)
const result = await response.json()
console.log(result)

let tabla_eliminar = `
<tr> 
         <th>Nombre</th>
         <th>Apellido</th>
         <th> id_cliente </th>
         <th> id_sucursal </th>
    </tr>`

    for (let i = 0; i < result.length; i++) {
        tabla_eliminar = `
        <tr> 
             <td> <button onclick="eliminarEmpleado(${result[i].id})">Eliminar</button></td>
             <td> ${result[i].nombre}</td>
             <td> ${result[i].apellido}</td>
             <td> ${result[i].id_cliente}</td>
             <td> ${result[i].id_sucursal}</td>
        </tr>`
    }
    document.getElementById("eliminarEmpleado").innerHTML = tabla_eliminar
}



async function mostrarEmpleadosParaModificar (){
    const response = await fetch ('http://localhost:3000/obtenerEmpleados',{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
 
console.log(response)
const result = await response.json()
console.log(result)

let tabla_modificar = `
<tr> 
         <th>Nombre</th>
         <th>Apellido</th>
         <th> id_cliente </th>
         <th> id_sucursal </th>
    </tr>`

    for (let i = 0; i < result.length; i++) {
        tabla_modificar += `
        <tr> 
             <td> <button onclick="modificarEmpleado(${result[i].id})">Modificar</button></td>
             <td> ${result[i].nombre}</td>
             <td> ${result[i].apellido}</td>
             <td> ${result[i].id_cliente}</td>
             <td> ${result[i].id_sucursal}</td>
        </tr>`
    }
    document.getElementById("modificarEmpleado").innerHTML = tabla_modificar
}

async function modificarEmpleadosrsç(id) {
    const data = {
        nombre : document.getElementById("ingresarModificacionNombre").value,
        id: id
    }

const response= await fetch('http://localhost:3000/modificarEmpleados',{
    method:"PUT",
    headers: {
        "Content-Type": "application/json",
        },
        body:JSON.stringify(data),

    })
    mostrarEmpleadosParaModificar()
}