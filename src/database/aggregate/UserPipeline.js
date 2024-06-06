export const getAggregateForUser = ({ userId = '', type = 'ALL' }) => {

    const matchStage = (type === 'ONE')
        ? { $match: { _id: userId } }
        : { $match: {} }; // Si no se proporciona un sectionId, no aplicamos el filtro

    const aggregate = [
        matchStage,
        {
            $lookup: {
                from: 'fichaparticulars', // Nombre de la colección 'FichaParticular'
                localField: '_id', // Campo de 'Usuario' que se relaciona con 'FichaParticular'
                foreignField: 'usuario', // Campo de 'FichaParticular' que se relaciona con 'Usuario'
                as: 'fichaParticular' // Nombre del campo en el resultado
            }
        },
        {
            $lookup: {
                from: 'fichaprofesionals', // Nombre de la colección 'FichaProfesional'
                localField: '_id', // Campo de 'Usuario' que se relaciona con 'FichaProfesional'
                foreignField: 'usuario', // Campo de 'FichaProfesional' que se relaciona con 'Usuario'
                as: 'fichaProfesional' // Nombre del campo en el resultado
            }
        },
        {
            $addFields: {
                ficha: {
                    $cond: [
                        { $gt: [{ $size: '$fichaParticular' }, 0] },
                        { $arrayElemAt: ['$fichaParticular', 0] },
                        { $arrayElemAt: ['$fichaProfesional', 0] },
                    ],
                },
            },
        },
        {
            $project: {
                fichaParticular: 0,
                fichaProfesional: 0,
            },
        },
    ];

    return aggregate;
};

export default getAggregateForUser;