const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//conexion con la base de datos

const {connection} = require("../config/config.db");
const getAlumno = (request,response) => {
    connection.query("SELECT * FROM tbl_alumno",
    (error,results)=>{
        if(error)
        throw error;
    response.status(200).json(results);

    });
};

/*aqui va mi primer post*/
const postAlumno = (request,response) => {
    const {carrera,nombre,apellido,edad,email,estado} = request.body;
    connection.query("INSERT INTO tbl_alumno (FK_Carrera,Nombre,Apellido,Edad,Email,Estado) VALUES(?,?,?,?,?,?)",
    [carrera,nombre,apellido,edad,email,estado],
    (error,results) => {
        if(error)
        throw error;
    response.status(201).json({"Item añadido correctamente": results.affectedRows});
    });
};
app.route("/alumnos").post(postAlumno);

//Ruta
app.route("/alumnos").get(getAlumno);
module.exports = app;