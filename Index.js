const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Cargamos el archivo de rutas
app.use(require('./routes/alumnos'));
app.use(require('./routes/materia'));

//app.use(require('./routes/materias'));

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log('El servidor escucha el puerto ' + PORT);
});

module.exports = app;