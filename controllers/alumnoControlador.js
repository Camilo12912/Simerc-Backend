
import respuestasHttp from "../utils/respuestasHttp.js"
import alumnoServicio from "../services/alumnoServicio.js"
import { AlumnoActualizarReqModel, AlumnoCrearReqModel, AlumnoDatosResModel, AlumnoLeerDatosResModel } from "../models/alumnoModel.js"

    const postAlumno= (req, res)=>{

    alumnoServicio.crearAlumno(new AlumnoCrearReqModel(req.body), req.user.sub)

    .then(alumno =>{
        console.log(alumno)
        respuestasHttp.exito(req, res, new AlumnoDatosResModel(alumno), 201)

    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al crear el alumno", 400)
        console.log(err)
    })

}

const getAlumno= (req, res)=>{
    
    alumnoServicio.leerAlumno()
    .then(array=> {
        let losAlumnos=[]
        array.forEach(alumnos => {
            losAlumnos.push(new AlumnoLeerDatosResModel(alumnos))
        })
        respuestasHttp.exito(req, res, losAlumnos, 200)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer los alumnos", 500)
        console.log(err)
    })
}

    const getdetalleAlumno= (req, res)=>{
    
    alumnoServicio.detalleAlumno(req.params.id)
    .then(array=> {
        let losAlumnos=[]
        array.forEach(alumnos => {
            losAlumnos.push(new AlumnoLeerDatosResModel(alumnos))
        })
        respuestasHttp.exito(req, res, losAlumnos, 200)
    })
    .catch(err =>{
        respuestasHttp.error(req,res,err, "Error al leer el detalle del alumno", 500)
    })
}

const putAlumno= (req, res) => {

    alumnoServicio.actualizarAlumno(req.params.id, new AlumnoActualizarReqModel(req.body), req.user.sub)
    
    .then(alumnoActualizada => {
    
    const alumnoJSON = alumnoActualizada[0]
    
        respuestasHttp.exito(req, res, new AlumnoLeerDatosResModel(alumnoJSON), 200)
    
    })
        .catch(err => {
        respuestasHttp.error(req, res, err, "error al actualizar el alumno", 400)
        console.log(err)
    })
    }

const deleteAlumno= (req, res)=>{

    alumnoServicio.eliminarAlumno(req.params.id, req.user.sub)
    .then(()=>{
        respuestasHttp.exito(req, res, "alumno eliminado con exito", 200)
    })
    .catch( err=>{
        respuestasHttp.error(req, res,err, "No se pudo eliminar el alumno",  400)
        console.log(err)
    })

}



export default {postAlumno, getAlumno, getdetalleAlumno, putAlumno, deleteAlumno}