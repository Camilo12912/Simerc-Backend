import recordatorioRepositorio from "../db/repositorios/recordatorioRepositorio.js"
import crypto from "crypto"

const crearRecordatorio = (recordatorio)=>{

    return new Promise( async(resolver, rechazar)=>{
        if( !recordatorio.titulo||!recordatorio.descripcion || !recordatorio.fecha_final  ){
            rechazar("Datos Incorrectos")
        }

        recordatorio.idRecordatorio= crypto.randomUUID()


        await recordatorioRepositorio.crear(recordatorio)
        resolver(recordatorio)
    })
}


const leerRecordatorio = ()=>{

    return new Promise ((resolver ,rechazar)=>{
        resolver(recordatorioRepositorio.leer())
    })

}

const detalleRecordatorio= (id)=>{
    return new Promise ((resolver ,rechazar)=>{
        resolver(recordatorioRepositorio.detalle(id))
})
}

const actualizarRecordatorio=(id, recordatorio)=>{
    return new Promise (async(resolver ,rechazar)=>{
        if (!recordatorio.titulo ||!recordatorio.descripcion) {
            rechazar("Datos incorrectos")
        }

        const recordatorioDetalle = await recordatorioRepositorio.detalle(id)

        recordatorioDetalle.titulo = recordatorio.titulo
        recordatorioDetalle.descripcion = recordatorio.descripcion

        const recordatorioActualizado= await recordatorioRepositorio.actualizar(recordatorioDetalle)

        resolver(recordatorioActualizado)
    })
}

const eliminarRecordatorio= (id, username)=>{
    return new Promise((resolver, rechazar)=>{
        
        // const articuloDetalle= articuloRepositorio.detalle(id)
        // const usuario = usuarioRepositorio.buscarUsername(username)
        // if(articuloDetalle.usuarioEntity.idUsuario != usuario.idUsuario){
        //     rechazar("No se puede realizar esta accion")
        // }
        resolver(recordatorioRepositorio.eliminar(id))
})
}


export default {crearRecordatorio, leerRecordatorio, detalleRecordatorio, actualizarRecordatorio, eliminarRecordatorio}