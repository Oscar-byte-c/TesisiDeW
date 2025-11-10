
import { sendMailToRegister,sendMailToRecoveryPassword } from "../helpers/sendMail.js"
import Veterinario from "../models/veterinario.js"


const registro = async (req,res)=>{

    try {
        //Paso 1
        const {email,password} = req.body
        //Paso 2
        if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
        const verificarEmailBDD = await Veterinario.findOne({email})
        if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
        //Paso 3
        const nuevoVeterinario = new Veterinario(req.body)
        nuevoVeterinario.password = await nuevoVeterinario.encryptPassword(password)
        const token = nuevoVeterinario.createToken()
        await sendMailToRegister(email,token)
        await nuevoVeterinario.save()
        //Paso 4
        res.status(200).json({msg:"Revisa tu correo electrónico para confirmar tu cuenta"})

    } catch (error) {
        res.status(500).json({ msg: `❌ Error en el servidor - ${error}` })
    }

}

const confirmarMail = async (req, res) => {
    //res.send("Cuenta Verificada")
 
        //Paso 1 verificar el token
        const { token } = req.params
        //Paso 2 verificar los datos
        const veterinarioBDD = await Veterinario.findOne({ token })
        if (!veterinarioBDD) return res.status(404).json({ msg: "Token inválido o cuenta ya confirmada" })
        //Paso 3
        veterinarioBDD.token = null
        veterinarioBDD.confirmMail = true
        await veterinarioBDD.save()
        //Paso 4
        res.status(200).json({ msg: "Cuenta confirmada, ya puedes iniciar sesión" })

   
    }

    const recuperarPassword = async (req, res) => {

    try{
        //Paso 1
        const{email} = req.body
        //Paso2
        if (!email) return res.status(400).json({ msg: "Debes ingresar un correo electrónico" })
        const veterinarioBDD = await Veterinario.findOne({ email })
        if (!veterinarioBDD) return res.status(404).json({ msg: "El usuario no se encuentra registrado" })
        //Paso3
        const token = veterinarioBDD.createToken()//ABC123
        veterinarioBDD.token = token
        await veterinarioBDD.save()
        //Correo 
        //Paso 4
        await sendMailToRecoveryPassword(email,token)
        res.status(200).json({msg: 'Revisa tu correo electrónico para restablecer tu cuenta'})
        
    }catch(error){


        res.status(500).json({ msg: `❌ Error en el servidor - ${error}` })
    }
}


    const comprobarTokenPassword = async (req, res) => {
        try{
            //Paso 1
            const{token} = req.params
            //Paso2
            const veterinarioBDD = await Veterinario.findOne({token})
            if(veterinarioBDD?.token !== token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
            //Paso3
            //veterinarioBDD?.token = token
            //Paso4
            res.status(200).json({msg:"Token confirmado, ya puedes crear tu nuevo password"}) 
            
        }catch(error){
        res.status(500).json({ msg: `❌ Error en el servidor - ${error}` })
    }
}

    const crearNuevoPassword = async (req, res) => {

        try{
            //Paso 1
            const{token}=req.params
            const{password,confirmpassword}=req.body

            //Paso 2
            if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Debes llenar todos los campos"})
            if(password !== confirmpassword) return res.status(404).json({msg:"Los passwords no coinciden"})
            const veterinarioBDD = await Veterinario.findOne({token})
            if(!veterinarioBDD) return res.status(404).json({msg:"No se puede validar la cuenta"})
            
            //Paso 3
            veterinarioBDD.password = await veterinarioBDD.encryptPassword(password)
            veterinarioBDD.token = null
            await veterinarioBDD.save()

            //Paso 4
            res.status(200).json({msg:"Felicitaciones, ya puedes iniciar sesión con tu nuevo password"}) 

        }catch(error){
        res.status(500).json({ msg: `❌ Error en el servidor - ${error}` })
    }
}






export {
    registro,
    confirmarMail,
    recuperarPassword,
    comprobarTokenPassword,
    crearNuevoPassword
    
}