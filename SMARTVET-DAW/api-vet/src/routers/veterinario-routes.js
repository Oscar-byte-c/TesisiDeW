import {Router} from 'express'
import { confirmarMail,recuperarPassword,comprobarTokenPassword,crearNuevoPassword,registro, login,perfil,actualizarPassword,actualizarPerfil,getDesktop,createItem  } from '../controllers/estudiante-controller.js';
import { verificarTokenJWT } from '../middlewares/JWT.js';

const router = Router()


console.log("✅ [estudiante-routes.js] Archivo cargado y definiendo rutas.");

router.post('/registro', registro);

router.get('/confirmar/:token',confirmarMail)

router.post('/recuperarPassword',recuperarPassword)

router.get('/recuperarPassword/:token',comprobarTokenPassword)

router.post('/nuevoPassword/:token',crearNuevoPassword)




router.post('/estudiante/login',login)

router.get('/estudiante/perfil',verificarTokenJWT,perfil)

router.put('/estudiante/perfil/:id',verificarTokenJWT,actualizarPerfil)

router.put('/actualizarPassword/:id',verificarTokenJWT,actualizarPassword)

// SB-B002 – Obtener ítems del escritorio
router.get("/desktop", verificarTokenJWT, getDesktop);

// SB-B003 – Crear un nuevo ítem
router.post("/items", verificarTokenJWT, createItem);

export default router;
