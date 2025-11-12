import {Schema, model, version} from 'mongoose'
import bcrypt from 'bcryptjs'

const veterinarioSchema = new Schema({

    nombre:{
    type:String,
    required:true,
    trim:true
    },

    apellido:{
    type:String,
    required:true,
    trim:true
    },

    direccion:{
    type:String,
    trim:true,
    default:null
    },

    celular:{
    type:String,
    required:true,
    trim:true,
    unique:true
    },

    email:{
    type:String,
    required:true,
    trim:true,
    unique:true
    },

    password:{
    type:String,
    required:true,
    trim:true,
    unique:true
    },

    status:{
    type:Boolean,
    default:true
    },

    token:{
    type:String,
    default:null
    },

    confirmMail:{
    type:Boolean,
    default:false
    },

    rol:{
    type:String,
    default:'veterinario'
    }

},

{

    timestamps: true

}
);


// Método para cifrar una contraseña

veterinarioSchema.methods.encryptPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    const passwordEncryp = await bcrypt.hash(password, salt)
    return passwordEncryp
}


// Metodo para verificar si el password es el mismo de la BDD
veterinarioSchema.methods.matchPassword = async function(password) {
    const response = await bcrypt.compare(password, this.password);
    return response;
}

// Metodo para crear el token
veterinarioSchema.methods.createToken = function() {
    const tokenGenerado = Math.random().toString(36).slice(2);
    this.token = tokenGenerado;
    return tokenGenerado;
}

export default model('veterinario', veterinarioSchema)