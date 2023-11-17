
function RecordatorioCrearReqModel(recordatorio){
    this.titulo = recordatorio.titulo
    this.descripcion= recordatorio.descripcion
    this.fecha_final= recordatorio.fecha_final
}

function RecordatorioDatosResModel(recordatorio){
    this.idRecordatorio = recordatorio.idRecordatorio
    this.titulo = recordatorio.titulo
    this.descripcion= recordatorio.descripcion
    this.fecha_final= recordatorio.fecha_final

}

function RecordatorioLeerDatosResModel(recordatorio){
    this.idRecordatorio = recordatorio.idRecordatorio
    this.titulo = recordatorio.titulo
    this.descripcion= recordatorio.descripcion
    this.fecha_final= recordatorio.fecha_final
}

function RecordatorioActualizarReqModel(recordatorio){
    this.titulo = recordatorio.titulo
    this.descripcion= recordatorio.descripcion
}

export {RecordatorioActualizarReqModel, RecordatorioCrearReqModel, RecordatorioDatosResModel , RecordatorioLeerDatosResModel}