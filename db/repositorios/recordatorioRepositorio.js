import { db } from "../conexionDB.js"

const crear= (recordatorio)=>{
    db.query('INSERT INTO recordatorios SET ?',{idRecordatorio:recordatorio.idRecordatorio , titulo:recordatorio.titulo, descripcion:recordatorio.descripcion, fecha_final:recordatorio.fecha_final}, (err, results) => {
        if (err) {
        console.error('Error al crear el recordatorio:', err)
        } else {
        console.log('recordatorio creado con éxito')
        }
    })
}

const leer= ()=>{

    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM recordatorios', (err, results) => {
            if (err) {
                console.error('Error al obtener los recordatorios', err)
                reject(err) // Rechaza la promesa en caso de error
            } else {
                // console.log('recordatorios obtenidos con éxito')
                resolve(results) // Resuelve la promesa con los resultados
            }
        })
    })
}

const detalle= (idRecordatorio)=>{

    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM recordatorios WHERE idRecordatorio = ?', [idRecordatorio], (err, results) => {
            if (err) {
                console.error('Error al obtener el recordatorio', err)
                reject(err)
            }    
            if(results.length === 0){
            console.error('No se encontro ningun recordatorio', err)
                reject(err)
            } else {
                console.log('recordatorio obtenido con éxito')
                resolve(results)
            }
        })
    })
}

const actualizar = (recordatorioDetalle) => {

    return new Promise((resolve, reject) => {
        
        if (Array.isArray(recordatorioDetalle) && recordatorioDetalle.length > 0) {
            const primerElemento = recordatorioDetalle[0] // Obtenemos el primer elemento (el objeto RowDataPacket)
            const idRecordatorio = primerElemento.idRecordatorio
            
            if (idRecordatorio) {
                
                db.query('UPDATE recordatorios SET titulo = ?, SET descripcion= ? WHERE idRecordatorio = ?', [recordatorioDetalle.titulo, recordatorioDetalle.descripcion, idRecordatorio], (err, results) => {
                    if (err) {
                        console.error('Error al actualizar el recordatorio', err)
                        reject(err)
                    }
                    if (results.length === 0) {
                        console.error('No se encontró ningun recordatorio para actualizar', err)
                        reject(err)
                    } else {
                        db.query('SELECT * FROM recordatorios WHERE idRecordatorio = ?', [idRecordatorio], (err, results) => {
                            
                            if (err) {
                                console.error('Error al obtener el recordatorio', err)
                                reject(err)
                                
                            } else {
                                console.log('recordatorio obtenido con éxito')
                                resolve(results) 
                            }
                        })
                    }
                }) 
                } else {
                    console.log("idRecordatorio no está definida en el objeto RowDataPacket.")
                }
            } else {
                console.log("recordatorioDetalle no es un array válido o está vacío.")
            }
    })
}







const eliminar = (id) => {
    return new Promise((resolve, reject) => {

        db.query('DELETE FROM recordatorios WHERE idRecordatorio = ?', [id], (err, results) => {
            if (err) {
                console.error('Error al eliminar el recordatorio', err)
                reject(err)
            }    
            if(results.length === 0){
            console.error('No se encontro ningun recordatorio', err)
                reject(err)
            } else {
                console.log('recordatorio eliminado con éxito')
                resolve(results)
            }
        })
    })
}


export default {crear, leer, detalle, actualizar, eliminar}
