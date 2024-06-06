import { Schema, model } from 'mongoose';
import { GradoHipoacusia, Parentesco, EstadoAlumno } from '../enums/index.js';

const AlumnoSchema = Schema({
    nombreCompleto: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    edad: {
        type: Number,
        required: [true, 'La edad es obligatoria'],
    },
    gradoHipoacusia: {
        type: String,
        required: [true, 'El grado de hipoacusia es obligatorio'],
        default: GradoHipoacusia.LEVE,
        enum: [GradoHipoacusia.LEVE, GradoHipoacusia.MODERADA, GradoHipoacusia.SEVERA, GradoHipoacusia.PROFUNDA]
    },
    escuela: {
        type: String,
        required: [true, 'La escuela es obligatoria'],
    },
    nombreTutor: {
        type: String,
        required: [true, 'El Tutor es obligatorio'],
    },
    parentesco: {
        type: String,
        required: [true, 'El Parentesco es obligatorio'],
        default: Parentesco.TUTOR,
        enum: [Parentesco.PADRE, Parentesco.MADRE, Parentesco.TUTOR]
    },
    correoTutor: {
        type: String,
        required: [true, 'El Correo del tutor es obligatorio'],
    },
    telefonoTutor: {
        type: String,
        required: [true, 'El Numero del Tutor es obligatorio'],
    },
    img: {
        type: String,
        required: false
    },
    docenteAsignado: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El Docente asignado es obligatorio'],
    },
    alumnoActivo: {
        type: Boolean,
        default: false
    },
    estado: {
        type: String,
        required: [true, 'El Parentesco es obligatorio'],
        default: EstadoAlumno.ACTIVO,
        enum: [EstadoAlumno.ACTIVO, EstadoAlumno.INACTIVO]
    },
});

AlumnoSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

// AlumnoSchema.methods.getName = function () {
//     const { nombreCompleto } = this.toObject();
//     return nombreCompleto;
// }

export const AlumnoModel = model('Alumno', AlumnoSchema);
export default model('Alumno', AlumnoSchema);
