export const getAggregateForSeccions = ({ seccionId = '', type = 'ALL' }) => {

    const matchStage = (type === 'ONE')
        ? { $match: { _id: seccionId } }
        : { $match: {} }; // Si no se proporciona un sectionId, no aplicamos el filtro

    const aggregate = [
        matchStage,
        {
            $lookup: {
                from: 'leccions', // Cambiar 'lecciones' por el nombre real de tu colección de lecciones
                localField: '_id',
                foreignField: 'seccion', // Campo en las lecciones que hace referencia a la sección
                as: 'lecciones',
            },
        },
    ];

    return aggregate;
};

export const getAggregateForLeccions = ({ leccionId = '', type = 'ALL' }) => {

    const matchStage = (type === 'ONE')
        ? { $match: { _id: leccionId } }
        : { $match: {} }; // Si no se proporciona un sectionId, no aplicamos el filtro

    const aggregate = [
        matchStage,
        {
            $lookup: {
                from: "contenidoteoricos",
                localField: "contenidoLeccion.teoria",
                foreignField: "_id",
                as: "contenidosTeoricos"
            }
        },
        {
            $lookup: {
                from: "contenidopracticos",
                localField: "contenidoLeccion.practica",
                foreignField: "_id",
                as: "contenidosPracticos"
            }
        },
        {
            $project: {
                _id: 1,
                seccion: 1,
                nombre: 1,
                dificultad: 1,
                cantRecursos: 1,
                estado: 1,
                contenidosTeoricos: 1,
                contenidosPracticos: 1
            }
        }
    ];

    return aggregate;
};

export const getAggregateForEvaluativos = ({ evaluativoId = '', type = 'ALL' }) => {

    const matchStage = (type === 'ONE')
        ? { $match: { _id: evaluativoId } }
        : { $match: {} }; // Si no se proporciona un sectionId, no aplicamos el filtro

    const aggregate = [
        matchStage,
        {
            $lookup: {
                from: "contenidopracticos", // Nombre de la colección ContenidoTeorico
                localField: "contenidoEvaluacion",
                foreignField: "_id",
                as: "contenidoEvaluacion" // Nombre del campo en el resultado
            }
        },
        {
            $project: {
                _id: 1,
                leccion: 1,
                nombreSeccion: 1,
                area: 1,
                contenidoEvaluacion: 1
            }
        }
    ];

    return aggregate;
};

export default {
    getAggregateForSeccions,
    getAggregateForLeccions,
    getAggregateForEvaluativos
};