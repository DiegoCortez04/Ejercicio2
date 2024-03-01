const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//conexion con la base de datos

const {connection} = require("../config/config.db");

//POST CARRERA
//RECIBE UN ID PARA SEPARAR LAS CARRERAS Y VISUALIZAR SUS ALUMNOS SEGUN SU ID CARRERA
const getCarreras = (request,response) => {
    connection.query("SELECT * FROM tbl_carrera",
    (error,results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};
app.route("/carrera").get(getCarreras);

const getCarreraId = (request,response) => {
    const id = request.params.id;
    connection.query("SELECT tbl_carrera.Carrera,tbl_alumno.ID_Alumno,tbl_alumno.Nombre,tbl_alumno.Apellido,tbl_alumno.Edad,tbl_alumno.Email FROM tbl_carrera INNER JOIN tbl_alumno WHERE tbl_alumno.FK_Carrera = ?",
    [id],
    (error,results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};
app.route("/carrera/:id").get(getCarreraId);
//SI
module.exports = app;