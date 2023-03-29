const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');


// Creamos el servidor de express
const port = process.env.PORT;

const app = express();

//Base de datos
dbConnection();

//CORS
app.use( cors() );

//Directorio público
app.use( express.static( 'public' ) );

//Lectura y parseo del body
app.use( express.json() );


//Rutas
app.use( '/api/auth', require('./routes/auth') );
app.use( '/api/events', require('./routes/events') );



//CRUD: Eventos



//Escuchar prticiones
app.listen( port, () => {
    console.log(`Server running on port ${port}`)
} )