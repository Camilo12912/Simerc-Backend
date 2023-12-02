
import { UsuarioDatosResModel } from "./usuarioModel.js"

function AlumnoCrearReqModel(alumno){
    this.tipoDocumento= alumno.tipoDocumento
    this.documento= alumno.documento
    this.nombre = alumno.nombre
    this.apellido = alumno.apellido
    this.email= alumno.email
    this.colegio= alumno.colegio
    this.direccion= alumno.direccion
    this.carrera= alumno.carrera
    this.telefono= alumno.telefono
    this.nacionalidad= alumno.nacionalidad
    this.modalidad= alumno.modalidad
    this.observaciones= alumno.observaciones
}

function AlumnoDatosResModel(alumno){
    this.idAlumno= alumno.idAlumno
    this.tipoDocumento= alumno.tipoDocumento
    this.documento= alumno.documento
    this.nombre = alumno.nombre
    this.apellido = alumno.apellido
    this.email= alumno.email
    this.colegio= alumno.colegio
    this.direccion= alumno.direccion
    this.carrera= alumno.carrera
    this.telefono= alumno.telefono
    this.nacionalidad= alumno.nacionalidad
    this.modalidad= alumno.modalidad
    this.observaciones= alumno.observaciones
    this.usuarioEntity= new UsuarioDatosResModel(alumno.usuarioEntity)
}

function AlumnoLeerDatosResModel(alumno){
    this.idAlumno= alumno.idAlumno
    this.tipoDocumento= alumno.tipoDocumento
    this.documento= alumno.documento
    this.nombre = alumno.nombre
    this.apellido = alumno.apellido
    this.email= alumno.email
    this.colegio= alumno.colegio
    this.direccion= alumno.direccion
    this.carrera= alumno.carrera
    this.telefono= alumno.telefono
    this.nacionalidad= alumno.nacionalidad
    this.modalidad= alumno.modalidad
    this.observaciones= alumno.observaciones
}
 
function AlumnoActualizarReqModel(alumno){
    this.nombre = alumno.nombre
    this.apellido = alumno.apellido
    this.tipoDocumento = alumno.tipoDocumento
    this.documento = alumno.documento
}


export {AlumnoActualizarReqModel, AlumnoCrearReqModel, AlumnoDatosResModel, AlumnoLeerDatosResModel}