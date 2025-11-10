import {Router} from 'express'
import { confirmarMail,recuperarPassword,comprobarTokenPassword,crearNuevoPassword,registro } from '../controllers/veterinario-controller.js';

const router = Router()


console.log("✅ [veterinario-routes.js] Archivo cargado y definiendo rutas.");

router.post('/registro', registro);

router.get('/confirmar/:token',confirmarMail)

router.post('/recuperarPassword',recuperarPassword)

router.get('/recuperarPassword/:token',comprobarTokenPassword)

router.post('/crearNuevoPassword/:token',crearNuevoPassword)


export default router;