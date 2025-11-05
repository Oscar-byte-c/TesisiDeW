import {Router} from 'express'
import {registro} from '../controllers/veterinario-controller.js'
import { confirmarMail } from '../controllers/veterinario-controller.js';
const router = Router()


console.log("✅ [veterinario-routes.js] Archivo cargado y definiendo rutas.");
// ---

router.post('/registro', registro);
router.get('/confirmar/:token',confirmarMail)
export default router;