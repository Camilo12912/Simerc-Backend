import alumnoRepositorio from "../db/repositorios/alumnoRepositorio.js"
import usuarioRepositorio from "../db/repositorios/usuarioRepositorio.js"
import crypto from "crypto"

const crearAlumno = (alumno, username)=>{
    return new Promise(async(resolver, rechazar)=>{
        if(!alumno.nombre || !alumno.apellido  || !alumno.tipoDocumento || !alumno.documento || !alumno.email || !alumno.carrera || !alumno.direccion|| !alumno.telefono){
            rechazar("Datos Incorrectos")
        }
        else{
        const usuario= await usuarioRepositorio.buscarUsername(username)


        alumno.idAlumno= crypto.randomUUID()
        alumno.usuarioEntity= usuario

        await alumnoRepositorio.crear(alumno)
        resolver(alumno)
    }
    })
}

const leerAlumno = ()=>{

    return new Promise ((resolver ,rechazar)=>{
        resolver(alumnoRepositorio.leer())
        
    })
}

const detalleAlumno= (id)=>{
    return new Promise ((resolver ,rechazar)=>{
        resolver(alumnoRepositorio.detalle(id))
})
}

const actualizarAlumno=(id, alumno)=>{
    return new Promise(async(resolver, rechazar) => {
        if (!alumno.nombre, !alumno.apellido, !alumno.tipoDocumento, !alumno.documento) {
            rechazar("Datos incorrectos")
        }

        const alumnoDetalle = await alumnoRepositorio.detalle(id)

        alumnoDetalle.nombre = alumno.nombre
        alumnoDetalle.apellido = alumno.apellido
        alumnoDetalle.tipoDocumento = alumno.tipoDocumento
        alumnoDetalle.documento = alumno.documento

        const alumnoActualizado= await alumnoRepositorio.actualizar(alumnoDetalle)

        resolver(alumnoActualizado)
    })
}

const obtenerEmailsPorCarrera = async (carrera) => {
    try {
      // Obtener alumnos por carrera
      const alumnos = await alumnoRepositorio.obtenerPorCarrera(carrera);
  
      // Extraer los correos electrónicos
      const emails = alumnos.map((alumno) => alumno.email);
  
      return emails;
    } catch (error) {
      console.error('Error al obtener los emails por carrera:', error);
      throw error;
    }
  };

const eliminarAlumno= (id, username)=>{
    return  new Promise((resolver, rechazar)=>{
        
        // const alumnoDetalle= alumnoRepositorio.detalle(id)
        // const usuario = usuarioRepositorio.buscarUsername(username)
        // if(alumnoDetalle.usuarioEntity.idUsuario != usuario.idUsuario){
        //     rechazar("No se puede realizar esta accion")
        // }
        resolver(alumnoRepositorio.eliminar(id))
})
}
export default {crearAlumno, leerAlumno, detalleAlumno, actualizarAlumno, eliminarAlumno, obtenerEmailsPorCarrera}