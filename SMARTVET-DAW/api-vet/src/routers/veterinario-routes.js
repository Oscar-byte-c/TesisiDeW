import {Router} from 'express'
import { confirmarMail,recuperarPassword,comprobarTokenPassword,crearNuevoPassword,registro, login, perfil,actualizarPassword,actualizarPerfil} from '../controllers/veterinario-controller.js';
import { verificarTokenJWT } from '../middlewares/JWT.js';



const router = Router()


console.log("✅ [veterinario-routes.js] Archivo cargado y definiendo rutas.");
//Publicas
router.post('/registro', registro);

router.get('/confirmar/:token',confirmarMail)

router.post('/recuperarPassword',recuperarPassword)

router.get('/recuperarPassword/:token',comprobarTokenPassword)

router.post('/nuevoPassword/:token',crearNuevoPassword)


//Privadas

router.post('/veterinario/login',login)


router.get('/veterinario/perfil',verificarTokenJWT,perfil)

router.put('/veterinario/perfil/:id',verificarTokenJWT,actualizarPerfil)

router.put('/actualizarPassword/:id',verificarTokenJWT,actualizarPassword)



export default router;