import passport from "passport"
import recordatorioControlador from "../controllers/recordatorioControlador.js"
import { Router } from "express"

const routerRecordatorio= Router()

routerRecordatorio.post("/",
    passport.authenticate("jwt", {session: false}),
    recordatorioControlador.postRecordatorio)

    routerRecordatorio.get("/",
    passport.authenticate("jwt", {session: false}),
    recordatorioControlador.getRecordatorio)

    routerRecordatorio.get("/:id",
    passport.authenticate("jwt", {session: false}),
    recordatorioControlador.getDetalleRecordatorio)

    routerRecordatorio.put("/:id",
    passport.authenticate("jwt", {session: false}),
    recordatorioControlador.putRecordatorio)

    routerRecordatorio.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    recordatorioControlador.deleteRecordatorio)

export default routerRecordatorio