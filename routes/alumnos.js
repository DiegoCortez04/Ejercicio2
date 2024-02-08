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
const postAlumno = (request, response) => {
    const {action,id,carrera, nombre, apellido, edad, email, estado} = request.body;
    //console.log(action);return false;
    if(action == "insert"){
        connection.query("INSERT INTO tbl_alumno (FK_Carrera,Nombre,Apellido,Edad,Email,Estado) VALUES(?,?,?,?,?,?)", 
        [carrera, nombre, apellido, edad,email,estado],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Alumno añadido correctamente": results.affectedRows});
        });
    }
    else{
        //console.log(action);return false;
        connection.query("UPDATE tbl_alumno SET FK_Carrera=?,Nombre=?,Apellido=?,Edad=?,Email=?,Estado=? WHERE ID_Alumno=?",
        [carrera,nombre, apellido, edad,email,estado,id],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Alumno actualizado correctamente": results.affectedRows});
        });
    }
};
app.route("/alumnos").post(postAlumno);

//GET CARRERA
//LISTADO DE ALUMNOS Y A QUE CARRERA PERTENECEN
const getAlumnoCarrera = (request,response) => {
    connection.query("SELECT tbl_alumno.Nombre, tbl_carrera.Carrera FROM tbl_alumno INNER JOIN tbl_carrera WHERE tbl_alumno.FK_Carrera = tbl_carrera.ID_Carrera ",
    (error,results)=>{
        if(error)
        throw error;
    response.status(200).json(results);

    });
};
app.route("/alumnoscarrera").get(getAlumnoCarrera);


//DELETE ALUMNO
const delAlumno = (request,response) => {
    const id = request.params.id;
    //console.log(id):return false;
    connection.query("DELETE FROM tbl_alumno WHERE ID_Alumno = ?",
    [id],
    (error,results) => {
        if(error)
            throw error;
        response.status(201).json({"Alumno eliminado":results.affectedRows});
    });
};
app.route("/alumnos/:id").delete(delAlumno);

//Ruta
app.route("/alumnos").get(getAlumno);
module.exports = app;
