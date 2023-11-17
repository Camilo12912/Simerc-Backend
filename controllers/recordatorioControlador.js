import respuestasHttp from "../utils/respuestasHttp.js"
import recordatorioServicio from "../services/recordatorioServicio.js"
import { RecordatorioActualizarReqModel, RecordatorioCrearReqModel, RecordatorioDatosResModel, RecordatorioLeerDatosResModel } from "../models/recordatorioModel.js"


const postRecordatorio= (req, res)=>{

    recordatorioServicio.crearRecordatorio(new RecordatorioCrearReqModel(req.body), req.user.sub)
    .then(recordatorio =>{
        respuestasHttp.exito(req, res, new RecordatorioDatosResModel(recordatorio), 201)
        console.log(recordatorio)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al crear el recordatorio", 400)
    })
}

const getRecordatorio= (req, res)=>{

    recordatorioServicio.leerRecordatorio()
    .then(array=> {
        console.log(array)
        let losrecordatorios=[]
        array.forEach(recordatorio => {
            losrecordatorios.push(new RecordatorioLeerDatosResModel(recordatorio))
        })
        respuestasHttp.exito(req, res, losrecordatorios, 200)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer los recordatorios", 500)
        console.log(err)
    })
}

const getDetalleRecordatorio= (req, res)=>{

    recordatorioServicio.detalleRecordatorio(req.params.id)
    .then(array=> {
        let losrecordatorios=[]
        array.forEach(recordatorio => {
            losrecordatorios.push(new RecordatorioLeerDatosResModel(recordatorio))
        })
        respuestasHttp.exito(req, res, losrecordatorios, 200)
    })
    .catch(err =>{
        respuestasHttp.error(req,res,err, "Error al leer el detalle del recordatorio", 500)
    })
}

const putRecordatorio= (req, res)=>{
    

    recordatorioServicio.actualizarRecordatorio( req.params.id , new RecordatorioActualizarReqModel(req.body ), req.user.sub)
    .then(recordatorio=> {
        const recordatorioJSON = recordatorio[0]
        respuestasHttp.exito(req, res, new RecordatorioLeerDatosResModel(recordatorioJSON), 200)
    })
    .catch(err=> {
        respuestasHttp.error(req, res, err, "Error al actualizar el recordatorio", 400)
        console.log(err)
    })
}

const deleteRecordatorio= (req, res)=>{


    recordatorioServicio.eliminarRecordatorio(req.params.id, req.user.sub)
    .then(()=>{
        respuestasHttp.exito(req, res, "recordatorio eliminado con exito", 200)
    })
    .catch( err=>{
        respuestasHttp.error(req, res,err, "No se pudo eliminar el recordatorio",  400)
    })

}



export default {postRecordatorio, getRecordatorio, getDetalleRecordatorio, putRecordatorio, deleteRecordatorio}