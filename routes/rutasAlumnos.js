import passport from "passport"
import alumnoControlador from "../controllers/alumnoControlador.js"
import { Router } from "express"


const routerAlumno= Router()

    routerAlumno.post("/",
    passport.authenticate("jwt", {session: false}),
    alumnoControlador.postAlumno)

    routerAlumno.get("/",
    passport.authenticate("jwt", {session: false}),
    alumnoControlador.getAlumno)

    routerAlumno.get("/:id",
    passport.authenticate("jwt", {session: false}),
    alumnoControlador.getdetalleAlumno)

    routerAlumno.put("/:id",
    passport.authenticate("jwt", {session: false}),
    alumnoControlador.putAlumno)

    routerAlumno.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    alumnoControlador.deleteAlumno)

export default routerAlumno