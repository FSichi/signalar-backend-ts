export const getAggregateForTeoria = ({ teoriaId = '' }) => {

    const aggregate = [
        { $match: { _id: teoriaId } },
        {
            $unwind: "$contenidoTeorico" // Desenrolla el array contenidoTeorico
        },
        {
            $lookup: {
                from: "contenidoteoricos", // Nombre de la colección ContenidoTeorico
                localField: "contenidoTeorico",
                foreignField: "_id",
                as: "contenidoTeorico" // Nombre del campo en el resultado
            }
        },
        {
            $unwind: "$contenidoTeorico" // Desenrolla el resultado del $lookup
        },
        {
            $group: {
                _id: "$_id", // Agrupa nuevamente por el campo _id de Teoria
                contenidosTeoricos: { $push: "$contenidoTeorico" } // Agrupa los contenidos teóricos en un array
            }
        },
        {
            $project: {
                _id: 1, // Incluye el campo _id
                contenidosTeoricos: 1 // Incluye el campo contenidosTeoricos
            }
        }
    ];

    return aggregate;
};

export const getAggregateForPractica = ({ practicaId = '' }) => {

    const aggregate = [
        { $match: { _id: practicaId } },
        {
            $unwind: "$contenidoPractico" // Desenrolla el array contenidoTeorico
        },
        {
            $lookup: {
                from: "contenidopracticos", // Nombre de la colección ContenidoTeorico
                localField: "contenidoPractico",
                foreignField: "_id",
                as: "contenidoPractico" // Nombre del campo en el resultado
            }
        },
        {
            $unwind: "$contenidoPractico" // Desenrolla el resultado del $lookup
        },
        {
            $group: {
                _id: "$_id", // Agrupa nuevamente por el campo _id de Teoria
                contenidosPracticos: { $push: "$contenidoPractico" } // Agrupa los contenidos teóricos en un array
            }
        },
        {
            $project: {
                _id: 1, // Incluye el campo _id
                contenidosPracticos: 1 // Incluye el campo contenidosTeoricos
            }
        }
    ];

    return aggregate;
};

export default {
    getAggregateForTeoria,
    getAggregateForPractica
};