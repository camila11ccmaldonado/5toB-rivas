var express = require('express'); 
var bodyParser = require('body-parser'); 
const {realizarQuery} = require ('./mysql')
var cors = require("cors");

var app = express(); 
var port = process.env.PORT || 3000; 
app.use(cors());


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

/**
 * req = request. en este objeto voy a tener todo lo que reciba del cliente
 * res = response. Voy a responderle al cliente
 */


app.get('/obtenerClientes', async function(req,res){
    console.log(req.query) 
    const result = await realizarQuery ("SELECT *FROM Clientes")
    res.send(`Hola ${req.query.nombre}, que tal?`)
})
app.get('/obtenerSucursales', async function(req,res){
    console.log(req.query) 
    const result = await realizarQuery ("SELECT *FROM Sucursales")
    res.send(result)
})



app.post('/insertarClientes', async function(req,res) {
    console.log(req.body)
    const clienteExiste =  await realizarQuery(`select * from Clientes where nombre = '${req.body.nombre}'`) 
    if (clienteExiste) {
        
        res.send({res: "El cliente ya existe"});
        
    } else {
        await realizarQuery(`INSERT INTO Clientes (nombre, apellido, tratamiento_habitual) 
    VALUES ('${req.body.nombre}', '${req.body.apellido}', '${req.body.tratamiento_habitual}')`);
    res.send({res: "ok"})
    }
    })



app.put('/modificarSucursales', async function(req,res){
    console.log(req.body)
    await realizarQuery(`UPDATE Sucursales SET direccion = '${req.body.direccion}'  WHERE id= ${req.body.id_sucursal}`);
    res.send("ok")
})



app.delete('/eliminarClientes', async function(req,res){
    console.log(req.body)
    await realizarQuery(`DELETE FROM Empleados WHERE id_cliente= ${req.body.id_cliente}`);
    await realizarQuery(`DELETE FROM Clientes WHERE id= ${req.body.id_cliente}`);
    res.send("ok")
})



//Pongo el servidor a escuchar
app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
    console.log('Defined routes:');
    console.log('   [GET] http://localhost:3000/');
    console.log('   [GET] http://localhost:3000/saludo');
    console.log('   [POST] http://localhost:3000/nombreDelPedido');
});
