
import respuestasHttp from "../utils/respuestasHttp.js"
import alumnoServicio from "../services/alumnoServicio.js"
import { AlumnoActualizarReqModel, AlumnoCrearReqModel, AlumnoDatosResModel, AlumnoLeerDatosResModel } from "../models/alumnoModel.js"
import alumnoRepositorio from "../db/repositorios/alumnoRepositorio.js"

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

const obtenerEmailPorDocumentoController = async (req, res) => {
    const { documento } = req.params;
  
    try {
      const email = await alumnoRepositorio.obtenerEmailPorDocumento(documento);
      res.status(200).json({ email });
    } catch (error) {
      console.error('Error al obtener el email del alumno por documento:', error);
      res.status(500).json({ error: 'Error al obtener el email del alumno por documento' });
    }
  };

  const obtenerEmailsPorCarrera = async (req, res) => {
    const { carrera } = req.params;
  
    try {
      // Lógica para obtener emails por carrera desde tu repositorio
      const emails = await alumnoRepositorio.obtenerPorCarrera(carrera);
      res.status(200).json({ emails });
    } catch (error) {
      console.error('Error al obtener emails por carrera:', error);
      res.status(500).json({ error: 'Error al obtener emails por carrera' });
    }
  };

export default {postAlumno, getAlumno, getdetalleAlumno, putAlumno, deleteAlumno, obtenerEmailPorDocumentoController, obtenerEmailsPorCarrera}