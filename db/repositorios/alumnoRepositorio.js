import { db } from "../conexionDB.js"



const crear= (alumno)=>{
    db.query('INSERT INTO alumnos SET ?',{idAlumno:alumno.idAlumno, tipoDocumento:alumno.tipoDocumento, documento:alumno.documento, nombre:alumno.nombre, apellido:alumno.apellido,   email:alumno.email, colegio:alumno.colegio, direccion:alumno.direccion, carrera:alumno.carrera, telefono:alumno.telefono,  nacionalidad:alumno.nacionalidad, observaciones:alumno.observaciones}, (err, results) => {
        if (err) {
        console.error('Error al crear el alumnos:', err)
        } else {
        console.log('alumnos creado con éxito')
        }
    })
}


const leer= ()=>{
    return new Promise((resolve, reject) => {
        db.query('SELECT alumnos.* FROM alumnos', (err, results) => {
            if (err) {
                console.error('Error al obtener los alumnos', err)
                reject(err) // Rechaza la promesa en caso de error
            } else {
                // console.log('alumnos leidos con éxito')
                resolve(results) // Resuelve la promesa con los resultados
            }
        })
    })
}
const detalle= (id)=>{

    return new Promise((resolve, reject) => {

        db.query('SELECT alumnos.* FROM alumnos WHERE idAlumno = ?', [id], (err, results) => {
            if (err) {
                console.error('Error al obtenerl el alumno', err)
                reject(err)
            }    
            if(results.length === 0){
            console.error('No se encontro ningun alumno', err)
                reject(err)
            } else {
                console.log('alumno obtenido con éxito')
                resolve(results)
            }
        })
    })
}

const actualizar = (alumnoDetalle) => {

    return new Promise((resolve, reject) => {
        
        if (Array.isArray(alumnoDetalle) && alumnoDetalle.length > 0) {
            const primerElemento = alumnoDetalle[0] // Obtenemos el primer elemento (el objeto RowDataPacket)
            const idAlumno = primerElemento.idAlumno
            
            if (idAlumno) {
                
                db.query('UPDATE alumnos SET nombre = ?, apellido = ?, tipoDocumento = ?, documento = ? WHERE idAlumno = ?', [alumnoDetalle.nombre, alumnoDetalle.apellido, alumnoDetalle.tipoDocumento, alumnoDetalle.documento, idAlumno], (err, results) => {
                    if (err) {
                        console.error('Error al actualizar el alumno', err)
                        reject(err)
                    }
                    if (results.length === 0) {
                        console.error('No se encontró ningun alumno para actualizar', err)
                        reject(err)
                    } else {
                        db.query('SELECT alumnos.*  FROM alumnos WHERE idAlumno = ?', [idAlumno], (err, results) => {
                            
                            if (err) {
                                console.error('Error al obtener el alumno', err)
                                reject(err)
                                
                            } else {
                                console.log('alumno obtenida con éxito')
                                resolve(results) 
                            }
                        })
                    }
                })
                } else {
                    console.log("idAlumno no está definida en el objeto RowDataPacket.")
                }
            } else {
                console.log("alumnoDetalle no es un array válido o está vacío.")
            }
    })
}


const eliminar = (id) => {
    return new Promise((resolve, reject) => {

        db.query('DELETE FROM alumnos WHERE idAlumno = ?', [id], (err, results) => {
            if (err) {
                console.error('Error al eliminar el alumno', err)
                reject(err)
            }    
            if(results.length === 0){
            console.error('No se encontro ningun alumno', err)
                reject(err)
            } else {
                console.log('alumno eliminado con éxito')
                resolve(results)
            }
        })
    })
}

const detallePorDocumento = (documento) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM alumnos WHERE documento = ?', [documento], (err, results) => {
        if (err) {
            console.error('Error al obtener el alumno por documento', err);
            reject(err);
            }
            if (results.length === 0) {
            console.error('No se encontró ningún alumno con ese documento', err);
            resolve(null); // Puedes resolver con null si no se encuentra ningún alumno
            } else {
            console.log('Alumno obtenido por documento con éxito');
            resolve(results[0]); // Resuelve con el primer resultado (debería ser único por documento)
            }
        });
        });
    };
    
    const obtenerEmailPorDocumento = async (documento) => {
        try {
        const alumno = await detallePorDocumento(documento);
        return alumno ? alumno.email : null;
        } catch (error) {
        console.error('Error al obtener el email del alumno por documento:', error);
        throw error;
        }
    };

    const obtenerPorCarrera = (carrera) => {
        return new Promise((resolve, reject) => {
        db.query('SELECT * FROM alumnos WHERE carrera = ?', [carrera], (err, results) => {
            if (err) {
            console.error('Error al obtener alumnos por carrera', err);
            reject(err);
            } else {
            resolve(results);
            }
        });
        });
    };
    


export default {crear, leer, detalle, actualizar, eliminar, detallePorDocumento, obtenerEmailPorDocumento, obtenerPorCarrera}